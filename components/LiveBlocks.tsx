import React from 'react';
import { Block } from '../types';
import { CubeIcon } from './icons/CubeIcon';

const truncateHash = (hash: string, start = 6, end = 4) => {
    if (!hash) return '';
    return `${hash.substring(0, start)}...${hash.substring(hash.length - end)}`;
};

const LiveBlocks: React.FC<{ blocks: Block[] }> = ({ blocks }) => {
    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 h-full">
            <h3 className="text-2xl font-bold text-white mb-4">Live Blocks</h3>
            <div className="overflow-hidden relative h-[220px]">
                <div className="space-y-3 pr-2 overflow-y-auto h-full">
                    {blocks.map(block => (
                        <div key={block.hash} className="bg-slate-800 p-3 rounded-lg animate-fade-in-down">
                           <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-slate-700/50 text-cyan-400">
                                    <CubeIcon />
                                </div>
                                <div className='flex-grow'>
                                    <div className="flex justify-between items-baseline">
                                         <p className="font-bold text-white">Block #{block.index.toLocaleString()}</p>
                                         <p className="text-xs text-slate-400">{block.transactions.length} Txs</p>
                                    </div>
                                    <p className="text-xs text-slate-500 font-mono" title={block.hash}>
                                        Hash: {truncateHash(block.hash, 10, 8)}
                                    </p>
                                    <p className="text-xs text-slate-500 font-mono" title={block.merkleRoot}>
                                        Merkle: {truncateHash(block.merkleRoot, 10, 8)}
                                    </p>
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

export default LiveBlocks;