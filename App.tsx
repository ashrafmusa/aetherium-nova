import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ConceptCard from './components/ConceptCard';
import NetworkStats from './components/NetworkStats';
import WhitepaperModal from './components/WhitepaperModal';
import NetworkExplorer from './components/NetworkExplorer';
import WalletPage from './components/WalletPage';
import StakingPage from './components/StakingPage';
import CliPage from './components/CliPage';
import { Concept, NetworkStatsData, Transaction, Block, Wallet, Validator, CliOutput } from './types';

import { generateKeyPair, getTransactionHash, sign, getBlockHash, calculateMerkleRoot, verify } from './cryptoUtils';

import { LockIcon } from './components/icons/LockIcon';
import { CubeIcon } from './components/icons/CubeIcon';
import { CpuIcon } from './components/icons/CpuIcon';
import { NetworkIcon } from './components/icons/NetworkIcon';
import { ShieldIcon } from './components/icons/ShieldIcon';
import { RocketIcon } from './components/icons/RocketIcon';
import { ServerIcon } from './components/icons/ServerIcon';

// Generate validators with persistent keypairs
const MOCK_VALIDATORS: Omit<Validator, 'publicKey' | 'secretKey'>[] = [
    { name: "Quantum Leap Validator", totalStake: 12_500_000, apr: 5.5, icon: <ServerIcon /> },
    { name: "Cosmic Node Solutions", totalStake: 10_200_000, apr: 5.8, icon: <ServerIcon /> },
    { name: "Cypher-State Digital", totalStake: 8_900_000, apr: 6.1, icon: <ServerIcon /> },
    { name: "Nova Syndicate", totalStake: 15_100_000, apr: 5.2, icon: <ServerIcon /> },
    { name: "Pioneer Staking", totalStake: 7_500_000, apr: 6.5, icon: <ServerIcon /> },
    { name: "Aether Stake Pool", totalStake: 11_300_000, apr: 5.7, icon: <ServerIcon /> },
];

const INITIAL_VALIDATORS = MOCK_VALIDATORS.map(v => ({...v, ...generateKeyPair()}));


const GENESIS_BLOCK: Block = {
    index: 0,
    timestamp: 1672531200000, // Jan 1 2023
    transactions: [],
    validator: '0'.repeat(64),
    previousHash: '0'.repeat(64),
    merkleRoot: '0'.repeat(64),
    hash: '0'.repeat(64),
    validatorSignature: '0'.repeat(128),
};
GENESIS_BLOCK.merkleRoot = calculateMerkleRoot(GENESIS_BLOCK.transactions);
GENESIS_BLOCK.hash = getBlockHash(GENESIS_BLOCK);


const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState<'home' | 'network' | 'wallet' | 'staking' | 'cli'>('home');
  const [stats, setStats] =useState<NetworkStatsData>({
    blockHeight: 0,
    tps: 0,
    activeNodes: INITIAL_VALIDATORS.length,
    marketCap: 420_123_456_789,
  });
  const [mempool, setMempool] = useState<Transaction[]>([]);
  const [confirmedTransactions, setConfirmedTransactions] = useState<Transaction[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([GENESIS_BLOCK]);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [validators, setValidators] = useState<Validator[]>(INITIAL_VALIDATORS);
  const [cliHistory, setCliHistory] = useState<CliOutput[]>([{ text: "Aetherium Nova CLI. Type 'help' to see available commands.", type: 'info' }]);

  // Load wallet from localStorage on startup
  useEffect(() => {
    try {
      const savedWallet = localStorage.getItem('aetherium-nova-wallet');
      if (savedWallet) {
        setWallet(JSON.parse(savedWallet));
      }
    } catch (error) {
      console.error("Failed to load wallet from localStorage:", error);
      localStorage.removeItem('aetherium-nova-wallet');
    }
  }, []);

  // Save wallet to localStorage whenever it changes
  useEffect(() => {
    if (wallet) {
      localStorage.setItem('aetherium-nova-wallet', JSON.stringify(wallet));
    } else {
      localStorage.removeItem('aetherium-nova-wallet');
    }
  }, [wallet]);

  // Core simulation loops
  useEffect(() => {
    // Block creation interval
    const blockInterval = setInterval(() => {
      if (mempool.length === 0) return;

      const validMempool = mempool.filter(tx => {
          const { signature, ...txData } = tx;
          // Verify using the stored hash, as that's what was signed.
          return verify(tx.hash, signature, tx.from);
      });
      
      const transactionsForBlock = validMempool.slice(0, 20); // Max 20 transactions per block for this simulation
      if (transactionsForBlock.length === 0) return;

      const validator = validators[Math.floor(Math.random() * validators.length)];
      const previousBlock = blocks[0];
      
      const newBlockData: Omit<Block, 'hash' | 'validatorSignature'> = {
          index: previousBlock.index + 1,
          timestamp: Date.now(),
          transactions: transactionsForBlock,
          validator: validator.publicKey,
          previousHash: previousBlock.hash,
          merkleRoot: calculateMerkleRoot(transactionsForBlock),
      };

      const blockHash = getBlockHash(newBlockData);
      const validatorSignature = sign(blockHash, validator.secretKey);

      const finalBlock: Block = {
          ...newBlockData,
          hash: blockHash,
          validatorSignature: validatorSignature,
      };

      // --- Update State ---
      setBlocks(prev => [finalBlock, ...prev.slice(0, 9)]);
      setMempool(prev => prev.slice(transactionsForBlock.length));
      setConfirmedTransactions(prev => [...transactionsForBlock, ...prev.slice(0, 50)]);
      setStats(prev => ({
          ...prev,
          blockHeight: finalBlock.index,
          tps: transactionsForBlock.length / 3, // Assuming 3s block time
          marketCap: prev.marketCap + (Math.random() - 0.45) * 1000000,
      }));
      
      // Update wallet state for transactions in the new block
      setWallet(w => {
        if (!w) return null;
        let newBalance = w.balance;
        for (const tx of transactionsForBlock) {
          if (tx.type === 'TRANSFER' && tx.from === w.publicKey) {
            newBalance -= tx.amount;
          }
          if (tx.type === 'TRANSFER' && tx.to === w.publicKey) {
            newBalance += tx.amount;
          }
          if (tx.type === 'STAKE' && tx.from === w.publicKey) {
              newBalance -= tx.amount;
          }
        }
        return { ...w, balance: newBalance };
      });

    }, 3000);

    // Staking rewards accumulation
    const rewardsInterval = setInterval(() => {
        if (wallet && wallet.stakes.length > 0) {
            setWallet(w => {
                if (!w) return null;
                const newStakes = w.stakes.map(stake => {
                    const validator = validators.find(v => v.publicKey === stake.validatorAddress);
                    if (!validator) return stake;
                    const rewardPerSecond = (stake.amount * (validator.apr / 100)) / (365 * 24 * 60 * 60);
                    return { ...stake, rewards: stake.rewards + rewardPerSecond * 3 };
                });
                return { ...w, stakes: newStakes };
            });
        }
    }, 3000);

    return () => {
      clearInterval(blockInterval);
      clearInterval(rewardsInterval);
    };
  }, [mempool, blocks, wallet, validators]);

  const generateNewWallet = () => {
    const { publicKey, secretKey } = generateKeyPair();
    const newWallet: Wallet = {
      publicKey,
      secretKey,
      balance: 1000,
      stakes: [],
    };
    setWallet(newWallet);
  };
  
  const handleAddToMempool = useCallback((txData: Omit<Transaction, 'hash' | 'signature'>) => {
      if(!wallet) return { success: false, message: 'No wallet available to sign transaction.'};

      const txHash = getTransactionHash(txData);
      const signature = sign(txHash, wallet.secretKey);

      const newTx: Transaction = {
          ...txData,
          hash: txHash,
          signature: signature
      };
      
      setMempool(prev => [newTx, ...prev]);
      return { success: true, message: 'Transaction submitted to mempool.' };
  }, [wallet]);

  const handleSend = (recipient: string, amount: number): { success: boolean; message: string } => {
    if (!wallet) return { success: false, message: 'Error: No active wallet.' };
    
    const pendingSentAmount = mempool
        .filter(tx => tx.from === wallet.publicKey && (tx.type === 'TRANSFER' || tx.type === 'STAKE'))
        .reduce((acc, tx) => acc + tx.amount, 0);

    if ((wallet.balance - pendingSentAmount) < amount) return { success: false, message: 'Error: Insufficient balance (including pending transactions).' };
    if (!recipient || recipient.length < 10) return { success: false, message: 'Error: Invalid recipient address.' };

    return handleAddToMempool({
        from: wallet.publicKey,
        to: recipient,
        amount,
        timestamp: Date.now(),
        type: 'TRANSFER',
    });
  };

  const handleStake = (validatorAddress: string, amount: number): { success: boolean; message: string } => {
    if (!wallet) return { success: false, message: 'Error: No active wallet.' };
    
    const pendingSentAmount = mempool
        .filter(tx => tx.from === wallet.publicKey && (tx.type === 'TRANSFER' || tx.type === 'STAKE'))
        .reduce((acc, tx) => acc + tx.amount, 0);

    if ((wallet.balance - pendingSentAmount) < amount) return { success: false, message: 'Error: Insufficient balance (including pending transactions).' };

    const validatorExists = validators.some(v => v.publicKey === validatorAddress);
    if (!validatorExists) return { success: false, message: 'Error: Validator not found.' };

    // Optimistically update UI for staking position
     setWallet(w => {
      if (!w) return null;
      const existingStakeIndex = w.stakes.findIndex(s => s.validatorAddress === validatorAddress);
      let newStakes = [...w.stakes];
      if (existingStakeIndex > -1) {
        newStakes[existingStakeIndex].amount += amount;
      } else {
        newStakes.push({ validatorAddress, amount, rewards: 0 });
      }
      return { ...w, stakes: newStakes };
    });
    setValidators(v => v.map(val => val.publicKey === validatorAddress ? { ...val, totalStake: val.totalStake + amount } : val));

    // Create and send staking transaction
    return handleAddToMempool({
        from: wallet.publicKey,
        to: validatorAddress, // Staking tx is 'sent' to the validator
        amount,
        timestamp: Date.now(),
        type: 'STAKE',
    });
  };

  const handleClaimRewards = () => {
    if (!wallet || wallet.stakes.length === 0) return;
    
    setWallet(w => {
      if (!w) return null;
      const totalRewards = w.stakes.reduce((acc, s) => acc + s.rewards, 0);
      if (totalRewards === 0) return w;
      const newStakes = w.stakes.map(s => ({ ...s, rewards: 0 }));
      return { ...w, balance: w.balance + totalRewards, stakes: newStakes };
    });
    alert("Rewards claimed successfully!");
  };

  const handleCliCommand = (command: string) => {
    const parts = command.trim().split(' ').filter(p => p);
    const cmd = parts[0];
    const args = parts.slice(1);
    const newHistory: CliOutput[] = [...cliHistory, { text: `> ${command}`, type: 'input' }];

    let output: CliOutput[] = [];

    switch (cmd) {
      case 'help':
        output.push({ type: 'info', text: 'Available Commands:' });
        output.push({ type: 'output', text: '  help                    - Show this help message' });
        output.push({ type: 'output', text: '  wallet.info             - Display wallet address and balance' });
        output.push({ type: 'output', text: '  wallet.send <addr> <amt> - Send AN tokens to an address' });
        output.push({ type: 'output', text: '  network.stats           - Show live network statistics' });
        output.push({ type: 'output', text: '  validators.list         - List all available validators' });
        output.push({ type: 'output', text: '  stake <addr> <amt>      - Stake AN tokens with a validator' });
        output.push({ type: 'output', text: '  clear                   - Clear the terminal' });
        break;
      
      case 'wallet.info':
        if (wallet) {
          const pendingSentAmount = mempool
            .filter(tx => tx.from === wallet.publicKey && (tx.type === 'TRANSFER' || tx.type === 'STAKE'))
            .reduce((acc, tx) => acc + tx.amount, 0);
          output.push({ type: 'output', text: `PublicKey: ${wallet.publicKey}` });
          output.push({ type: 'output', text: `Balance: ${wallet.balance.toFixed(4)} AN` });
          if(pendingSentAmount > 0) {
            output.push({ type: 'info', text: ` (Available: ${(wallet.balance - pendingSentAmount).toFixed(4)} AN considering mempool)`})
          }
        } else {
          output.push({ type: 'error', text: 'No wallet found. Go to the Wallet page to create one.' });
        }
        break;
      
      case 'wallet.send':
        if (args.length === 2) {
          const [addr, amtStr] = args;
          const amount = parseFloat(amtStr);
          const result = handleSend(addr, amount);
          output.push({ type: result.success ? 'success' : 'error', text: result.message });
        } else {
          output.push({ type: 'error', text: 'Usage: wallet.send <address> <amount>' });
        }
        break;

      case 'network.stats':
        output.push({ type: 'output', text: `Current Block: ${stats.blockHeight.toLocaleString()}` });
        output.push({ type: 'output', text: `TPS: ${stats.tps.toLocaleString()}` });
        output.push({ type: 'output', text: `Active Nodes: ${stats.activeNodes.toLocaleString()}` });
        output.push({ type: 'output', text: `Mempool: ${mempool.length} transactions` });
        break;
      
      case 'validators.list':
        output.push({ type: 'info', text: 'Available Validators:' });
        validators.forEach(v => {
          output.push({ type: 'output', text: `- ${v.name} (${v.publicKey}) | APR: ${v.apr}%`});
        });
        break;

      case 'stake':
        if (args.length === 2) {
          const [addr, amtStr] = args;
          const amount = parseFloat(amtStr);
          const result = handleStake(addr, amount);
          output.push({ type: result.success ? 'success' : 'error', text: result.message });
        } else {
          output.push({ type: 'error', text: 'Usage: stake <validator_publicKey> <amount>' });
        }
        break;

      case 'clear':
        setCliHistory([]);
        return;
      
      default:
        output.push({ type: 'error', text: `Command not found: ${cmd}` });
    }
    setCliHistory([...newHistory, ...output]);
  }

  const concepts: Concept[] = [
    { icon: <LockIcon />, title: 'Quantum Resistance', description: 'Built with Post-Quantum Cryptography (PQC) to safeguard against threats from future quantum computers, ensuring long-term security.' },
    { icon: <CubeIcon />, title: 'Hybrid Consensus (PoSU)', description: 'A novel Proof-of-Stake & Utility mechanism. It secures the network efficiently while rewarding nodes for contributing to valuable computational tasks.' },
    { icon: <CpuIcon />, title: 'Decentralized Computation', description: 'Beyond transactions, the network functions as a global supercomputer, allowing for complex, decentralized applications and services.' },
    { icon: <NetworkIcon />, title: 'Dynamic State Sharding', description: 'To ensure scalability and prevent blockchain bloat, the network dynamically partitions its state, keeping nodes lightweight and fast.' },
    { icon: <ShieldIcon />, title: 'Enhanced Privacy (ZKPs)', description: 'Leverages Zero-Knowledge Proofs to offer optional, fully private transactions, shielding user data without compromising network integrity.' },
    { icon: <RocketIcon />, title: 'Advanced Incentive Model', description: 'Rewards are distributed not just for block creation but also for providing utility, storage, and bandwidth, fostering a robust and versatile ecosystem.' },
  ];

  const renderHomePage = () => (
    <>
      <main>
        <Hero />
        <section id="introduction" className="py-20 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">The Next Leap in Digital Freedom</h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-400">
            Aetherium Nova re-imagines the principles of Bitcoin for the next generation. It's not just a peer-to-peer electronic cash system; it's a secure, decentralized platform for value and computation, engineered to be resilient, scalable, and intrinsically useful.
          </p>
        </section>
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Core Innovations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {concepts.map((concept, index) => (
                <ConceptCard key={index} icon={concept.icon} title={concept.title} description={concept.description} />
              ))}
            </div>
          </div>
        </section>
        <NetworkStats stats={stats} />
        <section id="conclusion" className="py-20 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Building a Smarter, More Secure Future</h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-400 mb-8">
            By combining post-quantum security with a utility-driven consensus, Aetherium Nova provides a foundation for a new wave of decentralized innovation. Join us in building a more resilient and equitable digital world.
          </p>
          <button onClick={() => setModalOpen(true)} className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/20">
            Read the Whitepaper
          </button>
        </section>
      </main>
      <Footer />
    </>
  );

  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-700/[0.05] [mask-image:linear-gradient(0deg,transparent,black)]"></div>
      <div className="relative z-10">
        <Header currentPage={page} setPage={setPage} />
        {page === 'home' && renderHomePage()}
        {page === 'network' && <NetworkExplorer stats={stats} transactions={confirmedTransactions.slice(0, 20)} mempool={mempool} blocks={blocks} />}
        {page === 'wallet' && <WalletPage wallet={wallet} createWallet={generateNewWallet} transactions={confirmedTransactions} setPage={setPage} onSend={handleSend} />}
        {page === 'staking' && <StakingPage wallet={wallet} validators={validators} onStake={(addr, amt) => handleStake(addr, amt)} onClaimRewards={handleClaimRewards} />}
        {page === 'cli' && <CliPage history={cliHistory} onCommand={handleCliCommand} />}
      </div>
      <WhitepaperModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default App;