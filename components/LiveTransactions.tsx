import React from 'react';
import { Transaction, TransactionType } from '../types';
import { TransactionIcon } from './icons/TransactionIcon';
import { ContractIcon } from './icons/ContractIcon';
import { ShieldIcon } from './icons/ShieldIcon';

const truncateHash = (hash: string, start = 6, end = 4) => {
    return `${hash.substring(0, start)}...${hash.substring(hash.length - end)}`;
};

const TypeBadge: React.FC<{ type: TransactionType }> = ({ type }) => {
    const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full';
    let specificClasses = '';
    let icon = null;

    switch (type) {
        case 'TRANSFER':
            specificClasses = 'bg-cyan-500/10 text-cyan-400';
            icon = <TransactionIcon />;
            break;
        case 'CONTRACT_CALL':
            specificClasses = 'bg-violet-500/10 text-violet-400';
            icon = <ContractIcon />;
            break;
        case 'STAKE':
            specificClasses = 'bg-emerald-500/10 text-emerald-400';
            icon = <ShieldIcon />;
            break;
    }

    return (
        <div className='flex items-center gap-4'>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${specificClasses}`}>
                {icon}
            </div>
            <div>
                 <span className={`${baseClasses} ${specificClasses}`}>{type.replace('_', ' ')}</span>
            </div>
        </div>
    );
}


const LiveTransactions: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 h-full">
            <h3 className="text-2xl font-bold text-white mb-4">Live Transactions</h3>
            <div className="overflow-hidden relative h-[500px]">
                <div className="space-y-3">
                    {transactions.map(tx => (
                        <div key={tx.hash} className="bg-slate-800 p-3 rounded-lg animate-fade-in-down">
                           <div className="flex justify-between items-center">
                                <TypeBadge type={tx.type} />
                                <div className="text-right">
                                    <p className="font-mono text-sm text-white">{tx.amount.toLocaleString()} AN</p>
                                    <p className="text-xs text-slate-400 font-mono">{truncateHash(tx.hash)}</p>
                                </div>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
             <style>{`
                @keyframes fade-in-down {
                    0% {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default LiveTransactions;