import React from 'react';
import { Validator } from '../types';
import { TrendingUpIcon } from './icons/TrendingUpIcon';

interface ValidatorCardProps {
    validator: Validator;
    onStake: () => void;
}

const ValidatorCard: React.FC<ValidatorCardProps> = ({ validator, onStake }) => {
    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 transition-all duration-300 hover:border-violet-400/50 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1 flex flex-col">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center text-violet-400">
                    {validator.icon}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">{validator.name}</h3>
                    <p className="text-xs text-slate-500 font-mono break-all">{validator.publicKey}</p>
                </div>
            </div>
            <div className="my-6 grid grid-cols-2 gap-4 text-center">
                <div>
                    <p className="text-sm text-slate-400 uppercase tracking-wider">Total Stake</p>
                    <p className="text-lg font-bold text-white mt-1">{(validator.totalStake / 1_000_000).toFixed(2)}M AN</p>
                </div>
                <div>
                    <p className="text-sm text-slate-400 uppercase tracking-wider">Est. APR</p>
                    <p className="text-lg font-bold text-emerald-400 mt-1 flex items-center justify-center gap-1">
                        <TrendingUpIcon />
                        {validator.apr.toFixed(2)}%
                    </p>
                </div>
            </div>
             <div className="mt-auto">
                 <button 
                    onClick={onStake}
                    className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300">
                    Stake
                </button>
            </div>
        </div>
    );
};

export default ValidatorCard;