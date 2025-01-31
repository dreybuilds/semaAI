export interface Tweet {
  id: string;
  content: string;
  likes: number;
  retweets: number;
  comments: number;
  tokensDistributed: number;
}

export interface User {
  handle: string;
  avatar: string;
  engagementScore: number;
  tokensEarned: number;
}

export interface Transaction {
  id: string;
  timestamp: Date;
  recipient: string;
  amount: number;
  hash: string;
  status: 'success' | 'pending' | 'failed';
}