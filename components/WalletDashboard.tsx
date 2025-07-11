import React, { useState } from 'react';
import { Wallet, Transaction } from '../types';
import WalletInfoCard from './WalletInfoCard';
import WalletTransactionHistory from './WalletTransactionHistory';
import SendModal from './SendModal';

type Page = 'home' | 'network' | 'wallet' | 'staking' | 'cli';

interface WalletDashboardProps {
    wallet: Wallet;
    transactions: Transaction[];
    setPage: (page: Page) => void;
    onSend: (recipient: string, amount: number) => { success: boolean; message: string };
}

const WalletDashboard: React.FC<WalletDashboardProps> = ({ wallet, transactions, setPage, onSend }) => {
    const [isSendModalOpen, setSendModalOpen] = useState(false);

    // Filter transactions for this wallet from the confirmed transaction list
    const walletTransactions = transactions.filter(tx => tx.from === wallet.publicKey || tx.to === wallet.publicKey);

    return (
        <div className="animate-fade-in">
             <h2 className="text-4xl font-bold text-white mb-8">My Wallet</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <WalletInfoCard 
                        wallet={wallet} 
                        onSend={() => setSendModalOpen(true)}
                        onNavigateToStaking={() => setPage('staking')}
                    />
                </div>
                <div className="lg:col-span-2">
                    <WalletTransactionHistory transactions={walletTransactions} walletAddress={wallet.publicKey} />
                </div>
            </div>
            <SendModal 
                isOpen={isSendModalOpen}
                onClose={() => setSendModalOpen(false)}
                walletBalance={wallet.balance}
                onSend={onSend}
            />
             <style>{`
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default WalletDashboard;