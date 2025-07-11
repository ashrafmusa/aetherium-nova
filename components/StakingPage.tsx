import React, { useState } from 'react';
import { Wallet, Validator } from '../types';
import Footer from './Footer';
import UserStakingDashboard from './UserStakingDashboard';
import ValidatorList from './ValidatorList';
import StakingModal from './StakingModal';

interface StakingPageProps {
  wallet: Wallet | null;
  validators: Validator[];
  onStake: (validatorAddress: string, amount: number) => { success: boolean; message: string };
  onClaimRewards: () => void;
}

const StakingPage: React.FC<StakingPageProps> = ({ wallet, validators, onStake, onClaimRewards }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedValidator, setSelectedValidator] = useState<Validator | null>(null);

  const handleOpenStakeModal = (validator: Validator) => {
    setSelectedValidator(validator);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedValidator(null);
  };

  const handleConfirmStake = (validatorAddress: string, amount: number) => {
    const result = onStake(validatorAddress, amount);
    alert(result.message);
    if(result.success) {
      handleCloseModal();
    }
  };

  if (!wallet) {
    return (
      <div className="text-center flex flex-col items-center justify-center min-h-[calc(100vh-15rem)]">
        <h2 className="text-4xl font-bold text-white mb-4">Staking Requires a Wallet</h2>
        <p className="max-w-xl mx-auto text-lg text-slate-400">
          Please create or connect a wallet to participate in network staking.
        </p>
      </div>
    );
  }

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <h2 className="text-4xl font-bold text-white mb-2">Network Staking</h2>
        <p className="text-lg text-slate-400 mb-8">Secure the network and earn rewards by delegating your AN tokens to validators.</p>
        
        <UserStakingDashboard 
            wallet={wallet} 
            validators={validators} 
            onClaimRewards={onClaimRewards}
        />
        
        <div className="mt-12">
            <h3 className="text-3xl font-bold text-white mb-6">All Validators</h3>
            <ValidatorList validators={validators} onStake={handleOpenStakeModal} />
        </div>

      </main>
      <Footer />
      {selectedValidator && (
        <StakingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          validator={selectedValidator}
          walletBalance={wallet.balance}
          onConfirmStake={handleConfirmStake}
        />
      )}
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

export default StakingPage;