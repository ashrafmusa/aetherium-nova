import React, { useState } from 'react';
import { Wallet } from '../types';
import { WalletIcon } from './icons/WalletIcon';
import { SendIcon } from './icons/SendIcon';
import { CopyIcon } from './icons/CopyIcon';
import { ShieldIcon } from './icons/ShieldIcon';

interface WalletInfoCardProps {
    wallet: Wallet;
    onSend: () => void;
    onNavigateToStaking: () => void;
}

const WalletInfoCard: React.FC<WalletInfoCardProps> = ({ wallet, onSend, onNavigateToStaking }) => {
    const [copied, setCopied] = useState(false);

    const totalStaked = wallet.stakes.reduce((acc, stake) => acc + stake.amount, 0);

    const handleCopy = () => {
        navigator.clipboard.writeText(wallet.publicKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 flex flex-col gap-6 h-full">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <WalletIcon />
                    <h3 className="text-xl font-bold text-white">Wallet Address (PublicKey)</h3>
                </div>
                <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg">
                    <p className="text-sm text-slate-400 font-mono break-all flex-grow">{wallet.publicKey}</p>
                    <button onClick={handleCopy} className="p-2 rounded-md hover:bg-slate-700 transition-colors flex-shrink-0" aria-label="Copy address">
                        <CopyIcon />
                    </button>
                </div>
                 {copied && <p className="text-xs text-cyan-400 mt-2 text-right">Copied!</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="text-sm uppercase text-slate-400 tracking-wider">Available Balance</h3>
                    <p className="text-3xl font-bold text-white mt-1">{wallet.balance.toLocaleString(undefined, {maximumFractionDigits: 2})} <span className="text-xl text-cyan-400">AN</span></p>
                </div>
                 <div>
                    <h3 className="text-sm uppercase text-slate-400 tracking-wider">Total Staked</h3>
                    <p className="text-3xl font-bold text-white mt-1">{totalStaked.toLocaleString(undefined, {maximumFractionDigits: 2})} <span className="text-xl text-violet-400">AN</span></p>
                </div>
            </div>

            <div className="mt-auto pt-4 flex flex-col gap-3">
                 <button 
                    onClick={onSend}
                    className="w-full flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/20">
                    <SendIcon />
                    Send
                </button>
                 <button 
                    onClick={onNavigateToStaking}
                    className="w-full flex items-center justify-center bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg shadow-violet-500/20">
                    <ShieldIcon />
                    Manage Stakes
                </button>
            </div>
        </div>
    );
};

export default WalletInfoCard;