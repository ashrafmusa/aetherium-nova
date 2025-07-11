# 🌌 Aetherium Nova

Aetherium Nova is a next-generation blockchain simulation engine and educational playground built in **React + TypeScript**. It simulates a post-quantum-resistant blockchain that combines Proof-of-Stake with utility-based rewards, decentralized computation, and advanced cryptographic security.

---

## 🚀 Features

### 🔐 Cryptography
- Post-Quantum inspired keypairs
- Digital signatures & Merkle root calculations
- Signature verification and block hash validation

### ⚙️ Blockchain Core
- Genesis block initialization
- Live block generation every 3 seconds
- Mempool management and transaction inclusion
- Validator-based consensus simulation
- Block explorer with live TPS, height, mempool, and market cap

### 💰 Wallet & Staking
- Wallet creation with persistent localStorage
- AN token transfer between users
- Stake with validator nodes and earn APR-based rewards
- Claim staking rewards

### 🧠 Validators
- Mock validator list with persistent keypairs
- Dynamic stake growth and APR display
- Visual identity via icons and stake stats

### 📟 Built-in CLI
- Interactive terminal with commands:
  - `wallet.info`, `wallet.send <addr> <amt>`
  - `stake <addr> <amt>`
  - `network.stats`
  - `validators.list`
  - `clear`, `help`

### 🌐 Modular Pages
- Home: Project overview, features, and whitepaper modal
- Network Explorer: Real-time stats, mempool, block list
- Wallet: Wallet state, transfers, staking
- Staking: Validator list, staking actions, rewards
- CLI: Developer terminal for interaction and debugging

---

## 🧪 Tech Stack

| Layer       | Tech Used                  |
|-------------|----------------------------|
| Frontend    | React, TypeScript, Tailwind |
| State Mgmt  | useState / useEffect       |
| Crypto Core | Custom `cryptoUtils.ts`    |
| UI Icons    | Heroicons & Custom SVG     |
| Persistence | `localStorage` (wallet)    |

---

## 🧾 How to Run

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/aetherium-nova.git
cd aetherium-nova

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
