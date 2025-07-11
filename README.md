# 🌍 CrisisChain – Blockchain Powered Aid Distribution For Africa           
 
**CrisisChain** is a decentralized web application platform designed to bring **transparency, fairness, and security** to humanitarian aid distribution across Africa. Built on the privacy focused **Midnight blockchain**, it enables NGOs, donors, governments, and communities to collaborate in a **trustless, verifiable ecosystem** where aid flows directly to verified recipients with no corruption or mismanagement.

---

## ✨ Purpose

Too often, aid gets lost before reaching the people who need it most. CrisisChain solves this by using blockchain to:

- Securely verify identities
- Track every step of aid distribution
- Issue tamper-proof digital aid tokens
- Enable real-time dashboards for transparency

---

## 🚀 Features

- 🔗 **Blockchain-based aid tracking** using Midnight smart contracts
- 🎟️ **Token-based aid claiming** via verified digital identity
- 🧾 **Zero-knowledge verification** to protect user privacy
- 📊 **Admin dashboard** with real-time analytics
- 📍 **Map-based tracking** of aid distribution centers
- 👛 **Lace Wallet integration** for secure transactions
- 🛡️ **Tamper-proof, fraud-resistant system**

## 🏗️ Project Structure

This project is organized into three main directories for optimal development and deployment:

### 📁 `on-chain/` - Smart Contract Logic

Contains all Midnight smart contract code and blockchain infrastructure:

```
on-chain/
├── contracts/          # Midnight smart contracts
│   └── AidTokenContract.js
├── scripts/           # Deployment and interaction scripts
│   └── deploy.js
├── test/             # Smart contract unit tests
│   └── AidToken.test.js
├── hardhat.config.js # Hardhat configuration
└── package.json      # Node.js dependencies for contracts
```

### 📁 `off-chain/` - Frontend Application

React-based frontend application with modern UI/UX:

```
off-chain/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable React components
│   ├── pages/       # Route-based pages
│   │   └── GetStarted.jsx
│   ├── hooks/       # Custom React hooks
│   ├── utils/       # Helper functions
│   └── supabase/    # Supabase client setup
├── tailwind.config.js
└── package.json
```

### 📁 `backend-supabase/` - Backend Infrastructure

Supabase backend configuration and database management:

```
backend-supabase/
├── functions/        # Supabase Edge Functions (optional)
├── migrations/       # SQL migration scripts
├── types/           # Database-generated TypeScript types
│   └── database.types.ts
├── client.ts        # Supabase client configuration
└── .env.local.example # Environment variables template
```

---

## 🛠️ Tech Stack

| Layer           | Technology                         |
| --------------- | ---------------------------------- |
| Frontend        | React.js / typescript              |
| Backend         | Supabase (Database + Auth)         |
| Blockchain      | Midnight (Compact Smart Contracts) |
| Database        | PostgreSQL (via Supabase)          |
| Authentication  | Supabase Auth with JWT             |
| Wallet          | Lace Wallet                        |
| Map Integration | Leaflet.js / Mapbox                |

---

## 📦 Installation & Setup

### 2. Install Dependencies

Run the following command in your project folder:

```bash
npm install
clone: git clone https://github.com/Dibora12/CrisisChain-Blockchain-Powered-Aid-Distribution-for-Africa
cd CrisisChain-Blockchain-Powered-Aid-Distribution-for-Africa

```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start the Development Server

Run the development server with:

```bash
npm run dev
```

---

## 📍 Key Modules

### 🙍‍♂️🙍‍♀️ Authentication & Identity

- Email/password login
- Secure session management
- User profile with Lace wallet address

### 🎯 Aid Management Dashboard

- View and verify new aid requests
- Export recipient lists
- Monitor distributions and logistics

### 🧾 Verification & Distribution

- Connect local verifiers
- Assign and claim tokens
- Ensure fair delivery using smart contracts

---

## 🔐 Security Highlights

- Row-Level Security (RLS) policies via Supabase
- Biometric and session-based authentication
- Private wallet connections via Lace
- Zero-knowledge proof integration for identity and eligibility

---

## 📚 User Guide

### Getting Started

1. **Sign Up / Log In**

   - Create an account using your email and password.
   - Connect your Cardano wallet via the Lace Wallet integration for secure transactions.

2. **Profile Setup**
   - Complete your profile with necessary information and link your wallet address.

### Using the Dashboard

- **Apply for Aid**

  - Navigate to the Aid Application page.
  - Fill in the required details and submit your application.
  - Your application will be verified by local verifiers.

- **Verification Process**

  - Verifiers receive aid requests in their dashboard.
  - They confirm identity and eligibility without exposing sensitive data (using zero-knowledge proofs).

- **Aid Distribution**

  - Once verified, aid tokens are issued via smart contracts.
  - You can track the status of your aid delivery in real time on the dashboard map.

- **Export Reports**
  - Admins and authorized users can export recipient and distribution reports for transparency.

### Offline Access

- The mobile app supports offline mode to submit reports or applications when internet is unavailable.
- Data syncs automatically once connection is restored.

---

## 📬 Contact

### 👥 Team

**Project Lead:** Dibora Shibeshi  
📧 Email: diborashibeshi@gmail.com

**Team Members:**

- Leyuthega Abebaw
- Hana Tamiru
  CrisisChain Team

## 🤝 Contributing

We welcome community collaboration!  
If you have ideas, improvements, or bug fixes:

- Fork the repo
- Create a new branch
- Submit a pull request

Please refer to the `CONTRIBUTING.md` if available.
