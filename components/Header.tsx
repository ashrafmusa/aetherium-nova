import React from 'react';

type Page = 'home' | 'network' | 'wallet' | 'staking' | 'cli';

interface HeaderProps {
    currentPage: Page;
    setPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setPage }) => {
    
    const navLinkClasses = "text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer";
    const activeLinkClasses = "bg-slate-700 text-white";

  return (
    <header className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-slate-700/50">
          <div className="flex-shrink-0">
             <a onClick={() => setPage('home')} className="text-2xl font-bold text-white cursor-pointer">
              <span className="text-cyan-400">Aetherium</span> Nova
             </a>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a onClick={() => setPage('home')} className={`${navLinkClasses} ${currentPage === 'home' ? activeLinkClasses : ''}`}>Home</a>
              <a onClick={() => setPage('network')} className={`${navLinkClasses} ${currentPage === 'network' ? activeLinkClasses : ''}`}>Network</a>
              <a onClick={() => setPage('wallet')} className={`${navLinkClasses} ${currentPage === 'wallet' ? activeLinkClasses : ''}`}>Wallet</a>
              <a onClick={() => setPage('staking')} className={`${navLinkClasses} ${currentPage === 'staking' ? activeLinkClasses : ''}`}>Staking</a>
              <a onClick={() => setPage('cli')} className={`${navLinkClasses} ${currentPage === 'cli' ? activeLinkClasses : ''}`}>CLI</a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;