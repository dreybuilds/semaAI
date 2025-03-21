'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SocialConnect } from '@/components/social-connect';
import { EngagementStats } from '@/components/engagement-stats';
import { Leaderboard } from '@/components/leaderboard';
import { RewardsDashboard } from '@/components/rewards-dashboard';
import { StakingDashboard } from '@/components/staking-dashboard';
import { TokenExchange } from '@/components/token-exchange';
import { TransactionHistory } from '@/components/transaction-history';
import { Button } from '@/components/ui/button';
import { Brain, LogOut } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('engagement');
  const [user] = useState({ email: 'demo@example.com' });

  const handleSignOut = () => {
    router.push('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'engagement':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <EngagementStats />
            <SocialConnect />
          </div>
        );
      case 'leaderboard':
        return <Leaderboard />;
      case 'rewards':
        return <RewardsDashboard />;
      case 'staking':
        return <StakingDashboard />;
      case 'exchange':
        return (
          <div className="max-w-[480px] mx-auto">
            <TokenExchange />
          </div>
        );
      case 'transactions':
        return <TransactionHistory />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">SemaAI</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                className={`nav-item ${activeTab === 'engagement' ? 'active' : ''}`}
                onClick={() => setActiveTab('engagement')}
              >
                Engagement
              </button>
              <button
                className={`nav-item ${activeTab === 'leaderboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('leaderboard')}
              >
                Leaderboard
              </button>
              <button
                className={`nav-item ${activeTab === 'rewards' ? 'active' : ''}`}
                onClick={() => setActiveTab('rewards')}
              >
                Rewards
              </button>
              <button
                className={`nav-item ${activeTab === 'exchange' ? 'active' : ''}`}
                onClick={() => setActiveTab('exchange')}
              >
                Exchange
              </button>
              <button
                className={`nav-item ${activeTab === 'staking' ? 'active' : ''}`}
                onClick={() => setActiveTab('staking')}
              >
                Staking
              </button>
              <button
                className={`nav-item ${activeTab === 'transactions' ? 'active' : ''}`}
                onClick={() => setActiveTab('transactions')}
              >
                Transactions
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">{user?.email}</span>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
}