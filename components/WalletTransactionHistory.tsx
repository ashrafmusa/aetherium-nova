import React from 'react';
import { Transaction } from '../types';
import { verify, getTransactionHash } from '../cryptoUtils';
import { TransactionIcon } from './icons/TransactionIcon';
import { ContractIcon } from './icons/ContractIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const truncateHash = (hash: string, start = 6, end = 4) => {
    return `${hash.substring(0, start)}...${hash.substring(hash.length - end)}`;
};

interface WalletTransactionHistoryProps {
    transactions: Transaction[];
    walletAddress: string;
}

const WalletTransactionHistory: React.FC<WalletTransactionHistoryProps> = ({ transactions, walletAddress }) => {

    const isVerified = (tx: Transaction) => {
        const { signature, ...txData } = tx;
        const txHash = getTransactionHash(txData);
        return verify(txHash, signature, tx.from);
    };

    return (
         <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 h-full">
            <h3 className="text-2xl font-bold text-white mb-4">Transaction History</h3>
            <div className="space-y-3 pr-2 overflow-y-auto max-h-[350px]">
                {transactions.length > 0 ? transactions.map(tx => {
                    const isSent = tx.from === walletAddress;
                    const icon = isSent ? <TransactionIcon /> : <ContractIcon />;
                    const colorClass = isSent ? 'text-red-400' : 'text-green-400';
                    const sign = isSent ? '-' : '+';
                    
                    return (
                        <div key={tx.hash} className="bg-slate-800 p-3 rounded-lg flex items-center justify-between gap-4">
                           <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-slate-700/50 ${colorClass}`}>
                                    {icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-mono text-sm text-white">{isSent ? `To: ${truncateHash(tx.to)}` : `From: ${truncateHash(tx.from)}`}</p>
                                        {isVerified(tx) && <CheckCircleIcon />}
                                    </div>
                                    <p className="text-xs text-slate-500">{new Date(tx.timestamp).toLocaleString()}</p>
                                </div>
                           </div>
                           <div className={`font-mono text-lg font-bold ${colorClass}`}>
                               {sign}{tx.amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 4})} AN
                           </div>
                        </div>
                    );
                }) : (
                    <p className="text-slate-400 text-center py-10">No transactions yet.</p>
                )}
            </div>
        </div>
    );
};

export default WalletTransactionHistory;