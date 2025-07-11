import React, { useState } from 'react';

interface SendModalProps {
    isOpen: boolean;
    onClose: () => void;
    walletBalance: number;
    onSend: (recipient: string, amount: number) => { success: boolean; message: string };
}

const SendModal: React.FC<SendModalProps> = ({ isOpen, onClose, walletBalance, onSend }) => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleConfirmSend = () => {
        setError('');
        const numAmount = parseFloat(amount);
        const result = onSend(recipient, numAmount);
        
        if (result.success) {
            alert(result.message);
            onClose();
        } else {
            setError(result.message);
        }
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="send-modal-title"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-md flex flex-col shadow-2xl shadow-cyan-500/10"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-6 border-b border-slate-700/50">
                    <h2 id="send-modal-title" className="text-2xl font-bold text-white">Send AN Tokens</h2>
                    <button onClick={onClose} aria-label="Close modal" className="text-slate-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </header>
                <main className="p-6 space-y-4">
                    <div>
                        <label htmlFor="recipient" className="block text-sm font-medium text-slate-300 mb-1">Recipient Address</label>
                        <input
                            type="text"
                            id="recipient"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500"
                            placeholder="0x..."
                        />
                    </div>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-slate-300 mb-1">Amount</label>
                        <div className="relative">
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500"
                                placeholder="0.0"
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center text-slate-400">AN</span>
                        </div>
                         <p className="text-xs text-slate-400 mt-1">Balance: {walletBalance.toLocaleString()} AN</p>
                    </div>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                </main>
                <footer className="p-6 border-t border-slate-700/50">
                    <button
                        onClick={handleConfirmSend}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!recipient || !amount}
                    >
                        Confirm & Send
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default SendModal;