import React from 'react';
import { Wallet, Transaction } from '../types';
import { PlusCircleIcon } from './icons/PlusCircleIcon';
import WalletDashboard from './WalletDashboard';
import Footer from './Footer';

type Page = 'home' | 'network' | 'wallet' | 'staking' | 'cli';

interface WalletPageProps {
  wallet: Wallet | null;
  createWallet: () => void;
  transactions: Transaction[];
  setPage: (page: Page) => void;
  onSend: (recipient: string, amount: number) => { success: boolean; message: string };
}

const WalletPage: React.FC<WalletPageProps> = ({ wallet, createWallet, transactions, setPage, onSend }) => {
  
  const renderCreateWallet = () => (
    <div className="text-center flex flex-col items-center justify-center min-h-[calc(100vh-15rem)]">
        <h2 className="text-4xl font-bold text-white mb-4">Your Secure Wallet Awaits</h2>
        <p className="max-w-xl mx-auto text-lg text-slate-400 mb-8">
            Create a new Aetherium Nova wallet to securely store, send, and receive digital assets on the network.
        </p>
        <button
            onClick={createWallet}
            className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/20 text-lg"
        >
            <PlusCircleIcon />
            Create My Wallet
        </button>
    </div>
  );

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wallet ? <WalletDashboard wallet={wallet} transactions={transactions} setPage={setPage} onSend={onSend} /> : renderCreateWallet()}
      </main>
      <Footer />
    </>
  );
};

export default WalletPage;