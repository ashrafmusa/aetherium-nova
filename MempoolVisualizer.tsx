import React from 'react';
import { Transaction } from '../types';

const truncateHash = (hash: string, start = 6, end = 4) => {
    return `${hash.substring(0, start)}...${hash.substring(hash.length - end)}`;
};

const MempoolVisualizer: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 h-full">
            <h3 className="text-2xl font-bold text-white mb-4">Mempool <span className="text-base text-yellow-400 font-normal">({transactions.length} pending)</span></h3>
            <div className="overflow-hidden relative h-[220px]">
                 {transactions.length > 0 ? (
                    <div className="space-y-2 pr-2 overflow-y-auto h-full">
                        {transactions.map(tx => (
                            <div key={tx.hash} className="bg-slate-800 p-2 rounded-lg animate-fade-in-down">
                               <div className="flex justify-between items-center text-xs font-mono">
                                    <span className="text-slate-400">hash: <span className="text-slate-300">{truncateHash(tx.hash, 8, 6)}</span></span>
                                    <span className="text-cyan-400">{tx.amount.toFixed(2)} AN</span>
                               </div>
                            </div>
                        ))}
                    </div>
                 ) : (
                    <div className="flex items-center justify-center h-full">
                         <p className="text-slate-500">Mempool is empty.</p>
                    </div>
                 )}
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

export default MempoolVisualizer;
