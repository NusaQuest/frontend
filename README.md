# NusaQuest : Turn River Cleanups into NFT Concert Tickets. 🚀

## ✨ Overview

🌏 NusaQuest is an impact-to-earn platform that powered by AI 🤖 and DAO 🧠 on Lisk Sepolia 🛰️ that rewards user for joining river cleanups across Indonesia 🇮🇩. Collect trash before it reaches the ocean 🌊, earn NUSA tokens 💰, and redeem them for NFT concert tickets 🎫. With KTP-based KYC 🪪🔍, NusaQuest bridges real-world action 🌱 with the power of Web3 🌐.

## 💡 Features

- 🪪 Identity Verification (KYC): Easily verify your KTP via OCR — only a Keccak256 hash is stored, not your actual data 🔐.
- 🧭 Propose a Quest : Suggest a river cleanup location in Indonesia — if your quest is approved, you’ll earn 10 NUSA tokens! 📍
- 🤖 AI Proposal Checker : Our AI checks if your proposed location is a valid river in Indonesia and ensures the description is relevant and clear! 🧠
- ✅ Vote on Quests : Help decide which cleanup quests matter most by voting with the community! 🗳️
- 📸 Submit Proof of Action : Upload a video of your river cleanup to earn 40 NUSA tokens as proof of real impact! 🎥
- 🔁 Swap NUSA Tokens : Redeem your NUSA tokens for exclusive NFT concert tickets available on the platform! 🎫

## 🚀 Insights

- 💻 Frontend : [View Code](https://github.com/NusaQuest/frontend.git)
- 📜 Smart Contract : [View Code](https://github.com/NusaQuest/smart-contract.git)
- 🧬 NFT Metadata : [View Metadata](https://github.com/NusaQuest/nft-metadata.git)
- 🔗 Live Smart Contract Deployment (NusaQuest) : [View Blockscout](http://sepolia-blockscout.lisk.com/address/0x7c17956bDc30c297f17059ddd302e4DD43a700fA)
- 🔗 Live Smart Contract Deployment (NusaToken) : [View Blockscout](http://sepolia-blockscout.lisk.com/address/0xbCFde6e263E10224f1E959D51dD2456bC09c16d1)
- 🔗 Live Smart Contract Deployment (NusaReward) : [View Blockscout](http://sepolia-blockscout.lisk.com/address/0xa7C5b30E1246417e2FA9ddae4917E37a11A48761)
- 🔗 Live Smart Contract Deployment (NusaTimelock) : [View Blockscout](http://sepolia-blockscout.lisk.com/address/0xb5565A254A5dD7Fd8E94b6c91714F2A17bC64f57)
- 🔧 Backend : [View Code](https://github.com/NusaQuest/backend.git)
- 📊 Pitch Deck : [View File](https://drive.google.com/file/d/1Qv5JGUpgw_R_K-bwBnjKdgQX4-jIDYsp/view?usp=drive_link)
- 🎥 Presentation & Demo Video : [Watch Video](https://youtu.be/e6i-IX0POfE?si=Ka7M2SMiSqDeiAWV)

## ⚙️ Tech Stack

- 🖥️ Frontend : ReactJS (JavaScript)
- 📜 Smart Contract : Foundry (Solidity)
- 🛰️ Network : Lisk Sepolia
- 🔧 Backend : GoFiber (Golang)
- 🗄️ Database : MongoDB
- 🔐 Authentication : Xellar Wallet
- 📚 Library : Wagmi
- 🪪 Identity Verification : Tesseract OCR (Optical Character Recognition)
- 🌐 IPFS Provider : Pinata
- 🎨 Styling : TailwindCSS

## 🧩 Architecture

    ```
    ├── frontend/                        # Root of the client-side React application
    │   ├── public/                      # Static public files
    │   ├── src/                         # Static public files
    │   │   ├── assets/                  # Visual assets
    │   │   ├── build/                   # Contains compiled smart contract ABI
    │   │   ├── components/              # Reusable UI components
    │   │   │   ├── buttons/             # Custom button components
    │   │   │   ├── cards/               # Information card components
    │   │   │   ├── fixed/               # Fixed-position components (e.g. navbar and footer)
    │   │   │   ├── inputs/              # Input components (e.g text fields, file uploads)
    │   │   │   ├── modals/              # Popup/modal components
    │   │   │   ├── row/                 # Data row components (used in lists or tables)
    │   │   │   ├── sections/            # Page sections (e.g. hero)
    │   │   │   └── table/               # Table-related components
    │   │   ├── pages/                   # Main page views (e.g. Home, QuestDetail, etc.)
    │   │   ├── server/                  # API handlers for backend communication
    │   │   ├── services/                # Logic for Web3/smart contract interactions
    │   │   ├── utils/                   # Utility and helper functions
    │   │   ├── App.jsx                  # Root component of the app
    │   │   ├── Content.jsx              # Layout/content wrapper component
    │   │   ├── index.css                # Global styles
    │   │   └── main.jsx                 # Entry point for React rendering
    │   ├── .env                         # Environment variables file (API keys, config)
    │   ├── .gitignore                   # Files/folders ignored by Git
    │   ├── eslint.config.js             # ESLint configuration for code linting
    │   ├── index.html                   # HTML template for Vite
    │   ├── Makefile                     # Script runner for tasks (optional)
    │   ├── package-lock.json            # Dependency lock file (auto-generated)
    │   ├── package.json                 # Project metadata and dependencies
    │   ├── README.md                    # Project documentation
    │   └── vite.config.js               # Vite bundler configuration
    ```

## 🧭 How to Run

This project uses [React](https://react.dev/) and [Vite](https://vite.dev/guide/) and a custom `Makefile` for a smoother development experience.  
Just run `make <task>` without remembering long commands!

### 📦 1. Install Node.js

#### 📥 Download & Install

Install Node.js (comes with npm) from the official site:
🔗 https://nodejs.org/

#### ✅ Verify Installation

After installation, run the following command to confirm:

```bash
node -v
npm -v
```

### 📁 2. Clone Repository

```bash
> git clone https://github.com/NusaQuest/frontend
> cd frontend
```

### 📚 3. Install Dependencies

```bash
> make install
```

### 🧪 4. Run the Server Locally

```bash
> make run
```

## 🔐 .env Configuration

Before running deploy or verification commands, make sure your `.env` file is properly set up in the root directory.

```env
# 🧠 Reown Project ID for identity verification
VITE_REOWN_PROJECT_ID=23...

# 🔐 Xellar Wallet App ID for authentication
VITE_XELLAR_APP_ID=8dd...

# 📦 Pinata JWT token for IPFS uploads
VITE_PINATA_JWT=ey...

# 🌐 Pinata gateway URL for retrieving IPFS files
VITE_PINATA_GATEWAY=blue...

# 🛰️ Backend API base URL
VITE_BACKEND_API_URL=https://your-backend-url.com
```

## 🖼️ Assets Reference

- 📢 [Xellar Wallet Logo on Connect Button](https://play.google.com/store/apps/details?id=com.xellar.wallets&pli=1)
- 📢 [NFT Images](https://sora.chatgpt.com/explore)
- 📢 [Gift Illustration — Representative Asset for Impact & Rewards](https://www.flaticon.com/premium-sticker/gift-box_5784099?k=1751555820535&log-in=google)
- 📢 [Brain Illustration — Representative Asset for AI-Powered Relevance Detection](https://www.flaticon.com/free-sticker/brain_6639851?term=brain&page=1&position=4&origin=search&related_id=6639851)
- 📢 [People Illustration — Representative Asset for DAO-Powered Governance](https://www.flaticon.com/free-sticker/team_6639779?term=group&page=1&position=1&origin=search&related_id=6639779)
- 📢 [ID Card Illustration — Representative Asset for KTP-based Registration](https://www.flaticon.com/free-sticker/id-card_8140376?term=identity&page=1&position=11&origin=search&related_id=8140376)
- 📢 [Ciliwung River Image (1) - For demo video purposes](https://cdn.antaranews.com/cache/1200x800/2020/01/03/Bersihkan-Sampah-Akibat-Banjir-03012020-fzn-2.jpg)
- 📢 [Ciliwung River Image (2) — for demo video purposes](https://img.okezone.com/content/2017/04/25/338/1675865/wow-sudah-15-939-karung-sampah-diangkut-dari-sungai-ciliwung-lE0mPSTfvv.jpg)
- 📢 [Ciliwung River Cleanups Video — For demo video purposes](https://youtu.be/x_DLGx0N93w?si=p8RE9qlhZjfJEUIY)
- 📢 [Thames River Image — For demo video purposes](https://cdn-imgix.headout.com/media/images/f41bdd0b95a2fc1fa8aff71725ffe5e3-2963-london-evening-cruise-on-river-thames-04.JPG)

## 🤝 Contributors

- 🧑 Yobel Nathaniel Filipus :
  - 🐙 Github : [View Profile](https://github.com/yebology)
  - 💼 Linkedin : [View Profile](https://linkedin.com/in/yobelnathanielfilipus)
  - 📧 Email : [yobelnathaniel12@gmail.com](mailto:yobelnathaniel12@gmail.com)
