import React from 'react';

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhitepaperModal: React.FC<WhitepaperModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="whitepaper-title"
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl shadow-cyan-500/10"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-6 border-b border-slate-700/50 flex-shrink-0">
          <h2 id="whitepaper-title" className="text-2xl font-bold text-white">
            <span className="text-cyan-400">Aetherium Nova</span> Whitepaper
          </h2>
          <button
            onClick={onClose}
            aria-label="Close whitepaper"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <main className="p-8 text-slate-300 overflow-y-auto">
          <h3 className="text-xl font-semibold text-white mb-2">Abstract</h3>
          <p className="mb-6">
            Aetherium Nova is a next-generation decentralized protocol designed to address the fundamental limitations of existing blockchain technologies. By integrating post-quantum cryptography, a novel Proof-of-Stake & Utility (PoSU) consensus mechanism, and a scalable sharded architecture, it provides a secure, efficient, and versatile foundation for digital assets and decentralized computation.
          </p>

          <h3 className="text-xl font-semibold text-white mb-2">1. Introduction</h3>
          <p className="mb-4">
            Since the inception of Bitcoin, blockchain technology has promised to revolutionize digital interaction. However, first-generation protocols face significant challenges in scalability, security against future threats, and energy efficiency. Aetherium Nova is engineered from the ground up to overcome these hurdles, creating a platform that is not only a store of value but also a global, decentralized computational utility.
          </p>

          <h3 className="text-xl font-semibold text-white mb-2">2. Core Components</h3>
          <ul className="space-y-4 list-disc list-inside mb-6">
            <li>
              <strong className="text-slate-100">Post-Quantum Cryptography (PQC):</strong> The rise of quantum computing poses an existential threat to current cryptographic standards. Aetherium Nova employs CRYSTALS-Dilithium for digital signatures and CRYSTALS-Kyber for key encapsulation, ensuring the ledger remains secure against attacks from both classical and quantum computers.
            </li>
            <li>
              <strong className="text-slate-100">Proof-of-Stake & Utility (PoSU):</strong> Our hybrid consensus model separates network security from computational work. Validators stake AN-Coins to secure the network and validate transactions, earning rewards in a highly energy-efficient manner. Concurrently, Utility Providers (UPs) are rewarded for furnishing verifiable computational resources to the network's dApp ecosystem, creating a market for decentralized compute.
            </li>
            <li>
              <strong className="text-slate-100">Dynamic State Sharding:</strong> To achieve massive scalability, the network utilizes dynamic state sharding. The global state is partitioned into multiple shards, allowing for parallel processing of transactions and smart contracts. A cross-shard communication protocol ensures atomicity and consistency across the network, enabling high throughput without sacrificing decentralization.
            </li>
            <li>
               <strong className="text-slate-100">Zero-Knowledge Privacy (Optional):</strong> Leveraging zk-SNARKs, Aetherium Nova provides users with the ability to conduct optionally private transactions. This allows for the shielding of transaction amounts and participant addresses, offering robust financial privacy without compromising the audibility of the overall supply.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-white mb-2">3. Conclusion</h3>
          <p>
            Aetherium Nova represents a significant leap forward in the evolution of blockchain technology. By solving for security, scalability, and utility in a single cohesive protocol, it provides the ideal foundation for a new era of decentralized applications, financial instruments, and a truly sovereign digital future.
          </p>
        </main>
      </div>
    </div>
  );
};

export default WhitepaperModal;
