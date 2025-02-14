# 🚀 IBC-5 Certification Project

<p style="align: center;">
	<img src="https://img.shields.io/badge/Foundry-Tooling-5E2D88?style=for-the-badge&logo=foundry"/>
	<img src="https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white"/>
	<img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react"/>
	<img src="https://img.shields.io/badge/Avalanche-Subnet_Local-E84142?style=for-the-badge&logo=avalanche"/>
	<img src="https://img.shields.io/badge/Wagmi-React_Adapters-FFD700?style=for-the-badge&logo=wagmi"/>
	<img src="https://img.shields.io/badge/IPFS-Distributed_Storage-65C2CB?style=for-the-badge&logo=ipfs"/>
</p>


## 📖 Table of Contents
1. [Project Structure](#-project-structure)
2. [Prerequisites](#⚙️-prerequisites)
3. [Installation & Setup](#🔧-installation--setup)
   - [1. Clone the Project](#1️⃣-clone-the-project)
   - [2. Install Foundry](#2️⃣-install-foundry)
   - [3. Initialize Foundry](#3️⃣-initialize-foundry)
   - [4. Initialize the Frontend](#4️⃣-initialize-the-frontend)
4. [Usage](#🌐-usage)
   - [A. Build & Test Contracts](#🛠️-build--test-contracts)
   - [B. Deployment Scripts](#📜-deployment-scripts)
   - [C. Launch the Frontend](#🎨-launch-the-frontend)
5. [Project Tree](#📂-project-tree)
6. [Key Files](#✨-key-files)
7. [Resources & Documentation](#📚-resources--documentation)

---

## 📂 Project Structure
- **avalanche/**: Configuration and management of the **Avalanche Subnet**.
- **foundry.toml**: **Foundry** configuration file.
- **script/**: Foundry scripts for **deployment & interactions**.
- **src/**: Solidity smart contracts (**MyProgramNFT, MyYearNFT, etc.**).
- **test/**: Foundry tests to **validate contract logic**.
- **frontend/**: React application for **admin panel & verification portal**.

---

## ⚙️ Prerequisites
- **Node.js** (14+ recommended)
- **npm** or **yarn**
- **Foundry** ([Documentation](https://book.getfoundry.sh/))
- **Git**
- **Avalanche CLI** (optional) or **`avalanchego` client**

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Project
```sh
git clone https://github.com/Nairod36/ibc5-certification-project
cd ibc5-certification-project
```

### 2️⃣ Install Foundry
```sh
curl -L https://foundry.paradigm.xyz | bash
foundryup
forge --version
```

### 3️⃣ Initialize Foundry
```sh
forge init .
forge install OpenZeppelin/openzeppelin-contracts
```

### 4️⃣ Initialize the Frontend
```sh
npx create-react-app frontend
cd frontend
npm install
```

---

## 🌐 Usage

### 🛠️ Build & Test Contracts
```sh
forge build
forge test
forge test --match-test testCreationNFT
```

### 📜 Deployment Scripts
```sh
forge script script/Deploy.s.sol \
  --rpc-url http://127.0.0.1:9650/ext/bc/<SUBNET_ID>/rpc \
  --private-key <YOUR_PRIVATE_KEY> \
  --broadcast
```

### 🎨 Launch the Frontend
```sh
cd frontend
npm start
```

The application will be available at **http://localhost:3000**.

---

## 📂 Project Tree
```
ibc5-certification-project/
├── avalanche/
│   ├── README.md
├── foundry.toml
├── script/
│   ├── Deploy.s.sol
│   ├── UpdateNFT.s.sol
│   ├── RevokeNFT.s.sol
├── src/
│   ├── ESGICertificate.sol
│   ├── ESGIYearlyPerformanceNFT.sol
│   ├── IESGINFT.sol
│   ├── NFTFactory.sol
├── test/
│   ├── ESGICertificate.t.sol
│   ├── ESGIYearlyPerformanceNFT.t.sol
│   ├── NFTFactory.t.sol
├── frontend/
│   ├── .env
├── README.md
├── .env
```

---

## ✨ Key Files
- `.env.example`: Example environment configuration (`RPC_URL`, `PRIVATE_KEY`).
- `avalanche/README.md`: **Avalanche Subnet** documentation.
- `foundry.toml`: **Foundry** configuration settings.
- `README.md`: **Main project guide**.

---

## 📚 Resources & Documentation
- **[Foundry Book](https://book.getfoundry.sh/)**
- **[Avalanche CLI](https://github.com/ava-labs/avalanche-cli)**
- **[React](https://reactjs.org/docs/getting-started.html)**
- **[OpenZeppelin](https://docs.openzeppelin.com/contracts/)**

📩 **For any questions, open an issue or submit a PR!** 🚀

<p style="align: center">
    <a href="https://discord.com/users/243000753881481216">
    <img src="https://img.shields.io/badge/-Nairod-gray?style=for-the-badge&logo=discord&logoColor=white&labelColor=5865F2">
    </a>
    <a href="https://discord.com/users/360420244088422400">
    <img src="https://img.shields.io/badge/-MattLvsr-gray?style=for-the-badge&logo=discord&logoColor=white&labelColor=5865F2">
    </a>
</p>