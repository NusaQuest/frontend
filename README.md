# NusaQuest : Turn River Cleanups into Concert Ticket NFTs. 🚀

## ✨ Overview

🌏 NusaQuest is an AI 🤖 and DAO 🧠-powered impact-to-earn platform on Lisk Sepolia 🛰️ that rewards you for joining river cleanups across Indonesia 🇮🇩. Collect trash before it reaches the ocean 🌊, earn NUSA tokens 💰, and redeem them for NFT concert tickets 🎫. With KTP-based KYC 🪪🔍, NusaQuest bridges real-world action 🌱 with the power of Web3 🌐.

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
- 🔗 Live Smart Contract Deployment : [View Blockscout]()
- 🔧 Backend : [View Code](https://github.com/NusaQuest/backend.git)
- 📊 Pitch Deck : [View File]()
- 🎥 Demo Video : [Watch Video]()

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

## 🤝 Contributors

- 🧑 Yobel Nathaniel Filipus :
  - 🐙 Github : [View Profile](https://github.com/yebology)
  - 💼 Linkedin : [View Profile](https://linkedin.com/in/yobelnathanielfilipus)
  - 📧 Email : [yobelnathaniel12@gmail.com](mailto:yobelnathaniel12@gmail.com)
