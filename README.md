# semaAI
An ecosystem that ensures gives visibility and ensures worth is assigned to those who earn it.

## Problem Statement
Every second there is a churn on posts on social media(Twitter ,Telegram, Discord) from tech content creators and tech communities. The communities struggle on tracking , incentivizing and rewarding engagements in a transparent and decentralized manner.

## Solution
semaAI  is a decentralized application that integrates with social media platforms to track engagements, assign wallets, and reward users with tokens. 

## Objectives

- Enable seamless tracking of social media posts and engagements.
- Automatically assign wallets to posts and engagements.
- Reward users with tokens for their engagement (likes, reposts, shares).
- Provide a dashboard for users to manage wallets and convert tokens.
- Allow content creators to reward users with cryptocurrencies.
- Track the impact of engagements and enable creators to invest in user-generated projects.


## Key Features
- ### **User Onboarding**:
    - Create accounts using Gmail, X, Discord, Telegram, or phone number.
    - Request access to social media platforms for engagement tracking.
    - KYC to ensure once the accounts are signed they can only be changed when verification is done.
- ### **Post Tracking**:
    - Detect posts with the `#semaAI` hashtag.
    - Can also have an option for default detection on posts
    - Assign wallets (Ethereum, Solana, Celo, Base) to posts.
- ### **Engagement Tracking**:
    - Track likes, reposts, and shares.
    - Assign child wallets to each engagement.
- ### **Token Rewards**:
    - Award tokens to child wallets based on engagement type.
- ### **Dashboard**:
    - View wallet allocations and token balances.
    - Convert $sema tokens to Sol, Eth, or other cryptocurrencies.
- ### **Creator Rewards**:
    - Allow creators to transfer Sol/Eth into the semaAI wallet.
    - Distribute rewards to users based on tokens earned.
- ### Engagement Impact Tracking
    - semaAI monitors user accounts for projects or products inspired by the original content.
    - Flags the source (content creator/community) and provides an option to invest in the idea (own a stake).
## Technology
- **Blockchain**: Ethereum, Solana, Celo, Base.
- **Smart Contracts**: Solidity (Ethereum), Rust (Solana).
- **Frontend**: React.js
- **Backend**: Node.js
- **Database**: MongoDB, PostgreSQL.
- **AI/ML**: NLP models for keyword extraction, sentiment analysis, and project inspiration detection.(Eliza)
- **APIs**: X API, Discord API, Telegram Bot API



## Implementation Plan

- ### **Phase 1: Planning and Design**
    - Define scope, requirements, and architecture.
    - Design user interface and workflows.
- ### **Phase 2: Smart Contract Development**
    - Develop WalletFactory, TokenReward, EngagementTracker, and RewardDistribution contracts.
- ### **Phase 3: Frontend Development**
    - Build user onboarding, dashboard, and token management features.
- ### **Phase 4: Backend Development**
    - Develop API for interacting with smart contracts.
    - Integrate with social media platforms.
- ### **Phase 5: AI/ML Integration**
    - Implement NLP models for keyword extraction and sentiment analysis.
    - Develop algorithms for detecting inspired projects.
- ### **Phase 6: Testing**
    - Conduct unit, integration, and user testing.
- ### **Phase 7: Deployment**
    - Deploy smart contracts to Ethereum, Solana, Celo, and Base.
    - Host frontend and backend on cloud platforms.


### **Conclusion**

- semaAI DApp bridges the gap between social media engagement and decentralized rewards.
- It empowers users to earn tokens for their engagement and provides creators with tools to build stronger communities.
- The project leverages cutting-edge technologies to create a seamless and transparent reward system.
- The **Engagement Impact Tracking** feature enables creators to identify and invest in user-generated projects, fostering innovation and collaboration
