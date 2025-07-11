import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[calc(100vh-4rem)] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900/50"></div>
      <div className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite] bg-[radial-gradient(ellipse_at_center,_rgba(132,204,22,0.1)_0%,transparent_80%)]"></div>
       <div className="absolute inset-0 w-full h-full animate-[spin_30s_linear_infinite_reverse] bg-[radial-gradient(ellipse_at_top_left,_rgba(34,211,238,0.1)_0%,transparent_70%)]"></div>
       <div className="absolute inset-0 w-full h-full animate-[spin_25s_linear_infinite] bg-[radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.1)_0%,transparent_70%)]"></div>

      <div className="relative z-10 px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
          Aetherium <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">Nova</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-400">
          A Decentralized, Quantum-Resistant Protocol for Digital Assets and Secure Computation.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="#features" className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/20">
            Discover Features
          </a>
          <a href="#" className="bg-slate-700/50 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300">
            Join Community
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
