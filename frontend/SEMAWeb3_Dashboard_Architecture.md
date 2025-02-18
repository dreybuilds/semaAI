# **SEMA Web3 Dashboard Architecture**

## **Frontend (Current Implementation)**
### **Core Technologies**
- **React + TypeScript**
- **React Router**
- **Tailwind CSS**
- **Lucide Icons**


### **Project Structure**
```
src/
├── components/        # Reusable UI components
├── pages/            # Route components
├── types/            # TypeScript interfaces
├── web3/            # Web3 integration
└── api/             # API client
```

---

## **Backend Integration**
### **1️⃣ Database Schema (Supabase)**
#### **Users Table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  twitter_handle TEXT UNIQUE NOT NULL,
  wallet_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### **Tweets Table**
```sql
CREATE TABLE tweets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  tweet_id TEXT UNIQUE NOT NULL,
  likes INT DEFAULT 0,
  retweets INT DEFAULT 0,
  comments INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### **Token Distributions Table**
```sql
CREATE TABLE token_distributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tweet_id UUID REFERENCES tweets(id),
  recipient_id UUID REFERENCES users(id),
  amount DECIMAL NOT NULL,
  transaction_hash TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

### **2️⃣ API Endpoints**
#### **Authentication**
```http
POST /auth/twitter          # Twitter OAuth
POST /auth/wallet           # Connect wallet
GET  /auth/me               # Get current user
```

#### **Tweets**
```http
GET    /tweets              # List user's tweets
POST   /tweets              # Create new tweet
GET    /tweets/:id          # Get tweet details
GET    /tweets/:id/metrics  # Get engagement metrics
```

#### **Tokens**
```http
POST   /tokens/distribute   # Distribute tokens
GET    /tokens/balance      # Get token balance
GET    /tokens/transactions # Get transaction history
```

#### **Leaderboard**
```http
GET    /leaderboard         # Get top contributors
GET    /leaderboard/weekly  # Get weekly rankings
```

---

### **3️⃣ TypeScript Interfaces**
#### **User Interface**
```typescript
interface User {
  id: string;
  twitterHandle: string;
  walletAddress: string;
  createdAt: Date;
}
```

#### **Tweet Interface**
```typescript
interface Tweet {
  id: string;
  userId: string;
  content: string;
  tweetId: string;
  likes: number;
  retweets: number;
  comments: number;
  createdAt: Date;
}
```

#### **Token Distribution Interface**
```typescript
interface TokenDistribution {
  id: string;
  tweetId: string;
  recipientId: string;
  amount: number;
  transactionHash: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}
```

---

### **4️⃣ Web3 Integration**
```typescript
class Web3Service {
  // Connect wallet
  async connectWallet(): Promise<string>;

  // Get token balance
  async getBalance(address: string): Promise<number>;

  // Distribute tokens
  async distributeTokens(
    recipient: string,
    amount: number
  ): Promise<string>;

  // Swap tokens
  async swapTokens(
    amount: number,
    fromToken: string,
    toToken: string
  ): Promise<string>;
}
```

---

### **5️⃣ Environment Variables**
```ini
# API Configuration
VITE_API_URL=http://localhost:3000

# Solana Configuration
VITE_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# Twitter OAuth
VITE_TWITTER_CLIENT_ID=your_twitter_client_id

# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

---

## **🔗 Integration Steps**
### **API Client Setup**
```typescript
// src/api/client.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

---

### **Authentication Flow**
```typescript
// src/api/auth.ts
export const auth = {
  twitterLogin: async () => {
    return supabase.auth.signInWithOAuth({
      provider: 'twitter'
    });
  },

  connectWallet: async (walletAddress: string) => {
    return supabase
      .from('users')
      .update({ wallet_address: walletAddress })
      .eq('id', supabase.auth.user()?.id);
  }
};
```

---

### **Token Distribution**
```typescript
// src/api/tokens.ts
export const tokens = {
  distribute: async (tweetId: string, amount: number) => {
    // 1. Create distribution record
    const { data: distribution } = await supabase
      .from('token_distributions')
      .insert({
        tweet_id: tweetId,
        amount: amount,
        status: 'pending'
      });

    // 2. Execute Web3 transaction
    const hash = await web3.distributeTokens(
      distribution.recipient_id,
      amount
    );

    // 3. Update record with transaction hash
    return supabase
      .from('token_distributions')
      .update({ 
        transaction_hash: hash,
        status: 'completed'
      })
      .eq('id', distribution.id);
  }
};
```

---

### **Real-time Updates**
```typescript
// src/hooks/useRealtime.ts
export function useRealtime(table: string) {
  useEffect(() => {
    const subscription = supabase
      .from(table)
      .on('*', payload => {
        // Handle real-time updates
      })
      .subscribe();
      
    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [table]);
}
```
