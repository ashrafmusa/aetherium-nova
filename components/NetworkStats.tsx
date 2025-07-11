import React from 'react';
import { NetworkStatsData } from '../types';
import { BlockIcon } from './icons/BlockIcon';
import { RocketIcon } from './icons/RocketIcon';
import { NetworkIcon } from './icons/NetworkIcon';
import { DollarIcon } from './icons/DollarIcon';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 flex flex-col items-center text-center">
    <div className="flex-shrink-0 w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center text-cyan-400 mb-4">
      {icon}
    </div>
    <p className="text-sm text-slate-400 uppercase tracking-wider">{label}</p>
    <p className="text-3xl font-bold text-white mt-1">{value}</p>
  </div>
);

interface NetworkStatsProps {
  stats: NetworkStatsData;
}

const NetworkStats: React.FC<NetworkStatsProps> = ({ stats }) => {
  return (
    <section id="network" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Live Network Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard 
            icon={<BlockIcon />} 
            label="Current Block" 
            value={stats.blockHeight.toLocaleString()} 
          />
          <StatCard 
            icon={<RocketIcon />} 
            label="Transactions / sec" 
            value={stats.tps.toLocaleString()} 
          />
          <StatCard 
            icon={<NetworkIcon />} 
            label="Active Nodes" 
            value={stats.activeNodes.toLocaleString()} 
          />
          <StatCard 
            icon={<DollarIcon />} 
            label="Market Cap" 
            value={`$${(stats.marketCap / 1_000_000_000).toFixed(2)}B`} 
          />
        </div>
      </div>
    </section>
  );
};

export default NetworkStats;
