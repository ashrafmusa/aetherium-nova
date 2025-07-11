import React from 'react';
import { NetworkStatsData, Transaction, Block } from '../types';
import NetworkStats from './NetworkStats';
import LiveTransactions from './LiveTransactions';
import LiveBlocks from './LiveBlocks';
import MempoolVisualizer from '../MempoolVisualizer';
import Footer from './Footer';

interface NetworkExplorerProps {
    stats: NetworkStatsData;
    transactions: Transaction[];
    mempool: Transaction[];
    blocks: Block[];
}

const NetworkExplorer: React.FC<NetworkExplorerProps> = ({ stats, transactions, mempool, blocks }) => {
    return (
        <>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <NetworkStats stats={stats} />

                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <LiveTransactions transactions={transactions} />
                    </div>
                    <div className="flex flex-col gap-8">
                        <MempoolVisualizer transactions={mempool} />
                        <LiveBlocks blocks={blocks} />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default NetworkExplorer;