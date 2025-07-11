import React, { useState } from 'react';
import { Validator } from '../types';

interface StakingModalProps {
    isOpen: boolean;
    onClose: () => void;
    validator: Validator;
    walletBalance: number;
    onConfirmStake: (validatorAddress: string, amount: number) => void;
}

const StakingModal: React.FC<StakingModalProps> = ({ isOpen, onClose, validator, walletBalance, onConfirmStake }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        setError('');
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }
        if (numAmount > walletBalance) {
            setError('Insufficient balance.');
            return;
        }
        onConfirmStake(validator.publicKey, numAmount);
    }

    const setMaxAmount = () => {
        setAmount(walletBalance.toString());
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="stake-modal-title"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-md flex flex-col shadow-2xl shadow-violet-500/10"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-6 border-b border-slate-700/50">
                    <div>
                        <h2 id="stake-modal-title" className="text-2xl font-bold text-white">Stake with</h2>
                        <p className="text-violet-400">{validator.name}</p>
                    </div>
                    <button onClick={onClose} aria-label="Close modal" className="text-slate-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </header>
                <main className="p-6 space-y-4">
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-slate-300 mb-1">Amount to Stake</label>
                        <div className="relative">
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-violet-500 focus:border-violet-500"
                                placeholder="0.0"
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center text-slate-400">AN</span>
                        </div>
                         <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-slate-400">Available: {walletBalance.toLocaleString()} AN</p>
                            <button onClick={setMaxAmount} className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold">MAX</button>
                         </div>
                    </div>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                </main>
                <footer className="p-6 border-t border-slate-700/50">
                    <button
                        onClick={handleConfirm}
                        className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!amount || parseFloat(amount) <= 0}
                    >
                        Confirm & Stake
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default StakingModal;