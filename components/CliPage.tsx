import React, { useState, useRef, useEffect } from 'react';
import { CliOutput } from '../types';
import { TerminalIcon } from './icons/TerminalIcon';
import Footer from './Footer';

interface CliPageProps {
    history: CliOutput[];
    onCommand: (command: string) => void;
}

const CliPage: React.FC<CliPageProps> = ({ history, onCommand }) => {
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const endOfHistoryRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (input.trim()) {
                onCommand(input);
                setCommandHistory(prev => [input, ...prev]);
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex >= 0) {
                const newIndex = Math.max(historyIndex - 1, -1);
                setHistoryIndex(newIndex);
                setInput(newIndex === -1 ? '' : commandHistory[newIndex]);
            }
        }
    };
    
    const getLineClass = (type: CliOutput['type']) => {
        switch (type) {
            case 'input': return 'text-cyan-400';
            case 'output': return 'text-slate-300';
            case 'error': return 'text-red-400';
            case 'success': return 'text-emerald-400';
            case 'info': return 'text-yellow-400';
            default: return 'text-slate-300';
        }
    }

    return (
      <>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
             <div className="flex items-center gap-4 mb-8">
                <TerminalIcon />
                <h2 className="text-4xl font-bold text-white">Command Line Interface</h2>
            </div>

            <div 
                className="bg-black/80 font-mono text-sm rounded-xl border border-slate-700/50 h-[60vh] p-4 overflow-y-auto"
                onClick={() => inputRef.current?.focus()}
            >
                {history.map((line, index) => (
                    <p key={index} className={getLineClass(line.type)} style={{whiteSpace: 'pre-wrap'}}>
                        {line.text}
                    </p>
                ))}
                <div className="flex gap-2">
                    <span className="text-cyan-400">&gt;</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none text-slate-300 w-full focus:outline-none"
                        autoComplete="off"
                    />
                </div>
                <div ref={endOfHistoryRef} />
            </div>
        </main>
        <Footer />
        <style>{`
          @keyframes fade-in {
              0% { opacity: 0; transform: translateY(10px); }
              100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
      </>
    );
};

export default CliPage;
