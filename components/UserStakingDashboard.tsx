import React from 'react';
import { Wallet, Validator } from '../types';
import { ShieldIcon } from './icons/ShieldIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';

interface UserStakingDashboardProps {
    wallet: Wallet;
    validators: Validator[];
    onClaimRewards: () => void;
}

const UserStakingDashboard: React.FC<UserStakingDashboardProps> = ({ wallet, validators, onClaimRewards }) => {
    const totalStaked = wallet.stakes.reduce((acc, s) => acc + s.amount, 0);
    const totalRewards = wallet.stakes.reduce((acc, s) => acc + s.rewards, 0);

    const getValidatorName = (publicKey: string) => {
        return validators.find(v => v.publicKey === publicKey)?.name || 'Unknown Validator';
    }

    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-sm uppercase text-slate-400 tracking-wider">Total Staked</h4>
                        <p className="text-3xl font-bold text-white mt-1">
                            {totalStaked.toLocaleString('en-US', {maximumFractionDigits: 2})} <span className="text-xl text-violet-400">AN</span>
                        </p>
                    </div>
                     <div>
                        <h4 className="text-sm uppercase text-slate-400 tracking-wider">Claimable Rewards</h4>
                        <p className="text-3xl font-bold text-white mt-1">
                            {totalRewards.toLocaleString('en-US', {maximumFractionDigits: 6})} <span className="text-xl text-emerald-400">AN</span>
                        </p>
                    </div>
                </div>
                <div className="md:col-span-1">
                     <button
                        onClick={onClaimRewards}
                        disabled={totalRewards === 0}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        Claim All Rewards
                    </button>
                </div>
            </div>
            
            {wallet.stakes.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                    <h4 className="text-lg font-bold text-white mb-3">My Delegations</h4>
                    <div className="space-y-3">
                        {wallet.stakes.map(stake => (
                            <div key={stake.validatorAddress} className="bg-slate-800 p-3 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-white">{getValidatorName(stake.validatorAddress)}</p>
                                    <p className="text-sm text-slate-400">Staked: <span className="font-mono">{stake.amount.toLocaleString()} AN</span></p>
                                </div>
                                <div className="text-right">
                                     <p className="font-semibold text-emerald-400">+{stake.rewards.toFixed(6)} AN</p>
                                     <p className="text-xs text-slate-500">Rewards</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserStakingDashboard;