import { ReactNode } from 'react';

export interface Concept {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface NetworkStatsData {
  blockHeight: number;
  tps: number;
  activeNodes: number;
  marketCap: number;
}

export type TransactionType = 'TRANSFER' | 'CONTRACT_CALL' | 'STAKE';

export interface Transaction {
  hash: string;
  from: string; // public key
  to: string; // public key or address
  amount: number;
  timestamp: number;
  type: TransactionType;
  signature: string; // signature of the transaction hash
}

export interface Block {
  index: number;
  timestamp: number;
  transactions: Transaction[];
  validator: string; // public key of validator
  previousHash: string;
  merkleRoot: string;
  hash: string; // hash of the block header
  validatorSignature: string; // signature of the block hash
}

export interface Validator {
  publicKey: string;
  secretKey: string; // For simulation only
  name: string;
  totalStake: number;
  apr: number;
  icon: ReactNode;
}

export interface UserStake {
  validatorAddress: string;
  amount: number;
  rewards: number;
}

export interface Wallet {
  publicKey: string;
  secretKey: string; // For demonstration only, never expose in a real app
  balance: number;
  stakes: UserStake[];
}

export interface CliOutput {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'info';
}
