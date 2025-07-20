# NusaQuest : Beaches aren't gonna clean themselves. 🚀

## ✨ Overview

🌏 NusaQuest is an impact-to-earn platform powered by AI 🤖 and DAO 🧠, built on the Lisk Sepolia network 🛰️, that turns real-world environmental actions into meaningful digital rewards. Through beach cleanups across Indonesia 🇮🇩, anyone can earn NUSA tokens 💰 and redeem them for NFT concert tickets 🎫. With KYC verification via OCR of KTP 🪪🔍, NusaQuest ensures trusted participation while bridging Web3 🌐 with real-world impact 🌱. It makes caring for the environment fun and rewarding — while empowering communities through transparent, decentralized systems and meaningful incentives.

## 💡 Features

- 🪪 Verify Identity (KYC with OCR of KTP) : Verify your identity easily using KTP-based KYC with OCR — secure and effortless! 🔐
- 🗳️ Delegate Voting Power : Delegate your vote to yourself to join quest voting — and get a chance to earn 10 NUSA tokens! 🎉
- 🧭 Propose a Quest : Suggest a beach cleanup location in Indonesia — if your quest is approved, you’ll earn 10 NUSA tokens! 📍
- 🤖 AI Proposal Checker : Our AI checks if your proposed location is a valid beach in Indonesia and ensures the description is relevant and clear! 🧠
- ✅ Vote on Quests : Help decide which cleanup quests matter most by voting with the community! 🗳️
- 📸 Submit Proof of Action : Upload a video of your beach cleanup to earn 40 NUSA tokens as proof of real impact! 🎥
- 🔁 Swap NUSA Tokens : Redeem your NUSA tokens for exclusive NFT concert tickets available on the platform! 🎫

## 🚀 Insights

- 💻 Frontend : [View Code](https://github.com/NusaQuest/frontend.git)
- 📜 Smart Contract : [View Code](https://github.com/NusaQuest/smart-contract.git)
- 🧬 NFT Metadata : [View Metadata](https://github.com/NusaQuest/nft-metadata.git)
- 🔗 Live Smart Contract Deployment : [View Blockscout]()
- 🔧 Backend : [View Code](https://github.com/NusaQuest/backend.git)
- 📊 Pitch Deck : [View File]()
- 📖 Usage Guidebook : [View Guide]()
- 🎥 Demo Video : [Watch Video]()

## ⚙️ Tech Stack

- 🖥️ Frontend : ReactJS (JavaScript)
- 📜 Smart Contract : Foundry (Solidity)
- 🛰️ Network : Lisk Sepolia
- 🔧 Backend : GoFiber (Golang)
- 📚 Library : Wagmi
- 🔐 Authentication : Xellar Wallet
- 🪪 Identity Verification : Tesseract OCR (Optical Character Recognition)
- 🌐 IPFS Provider : Pinata
- 🎨 Styling : TailwindCSS

## 🧩 Architecture

### 🖥️ Frontend

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

### 📜 Smart Contract

    ```
    ├── smart-contract/
    │   ├── lib/              # External dependencies or libraries (via forge install)
    │   ├── scripts/          # Deployment and automation scripts using Forge
    │   ├── src/              # Main smart contract source files
    │   │   └── lib/          # Contains reusable code like custom errors and event declarations
    │   ├── test/             # Smart contract test files (e.g., unit tests)
    │   ├── .env              # Environment variables (e.g., RPC URL, private key)
    │   ├── .gitignore        # Git ignore rules
    │   ├── .gitmodules       # Tracks git submodules (e.g., external contracts/libs)
    │   ├── Makefile          # Automation commands for building, testing, and deploying
    │   └── foundry.toml      # Foundry configuration file (e.g., compiler version, optimizer)  
    ```

### 🔧 Backend

    ```
    ├── backend/
    │   ├── config/         # Configuration files (e.g., database configuration)
    │   ├── constants/      # Project-wide constant values (e.g., custom errors, custom success, etc)
    │   ├── controllers/    # Business logic handlers for each route
    │   │   └── helper/     # Helper functions used within controllers
    │   ├── handlers/       # Core functions handling incoming HTTP requests
    │   ├── middlewares/    # Middleware functions (e.g., database connection handling)
    │   ├── models/         # Database models or data schemas
    │   ├── output/         # JSON response structure for success or error results
    │   ├── router/         # Route definitions and API endpoints
    │   ├── utils/          # Utility functions (e.g., validator)
    │   ├── views/          # HTML templates
    │   ├── .env            # Environment variables
    │   ├── .gitignore      # Files and folders ignored by Git
    │   ├── Makefile        # Automation commands for building and running
    │   ├── go.mod          # Go module definitions (dependencies)
    │   ├── go.sum          # Hashes of module dependencies for reproducibility
    │   └── main.go         # Entry point of the backend application
    ```

## 🔨 How to Run

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
