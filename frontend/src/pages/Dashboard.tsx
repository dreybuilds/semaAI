import React, { useState } from 'react';
import { StatsCard } from '../components/StatsCard';
import { MessageSquare, Repeat, Heart, Coins } from 'lucide-react';
import { DistributionModal } from '../components/DistributionModal';

export function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTweet, setSelectedTweet] = useState('');

  const handleDistribute = (tweetContent: string) => {
    setSelectedTweet(tweetContent);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">👋 Welcome, @user</h1>
        <p className="text-gray-400">Track your engagement and manage SEMA tokens</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Posts"
          value={42}
          icon={MessageSquare}
          trend={12}
        />
        <StatsCard
          title="Total Retweets"
          value={128}
          icon={Repeat}
          trend={8}
        />
        <StatsCard
          title="Total Likes"
          value={356}
          icon={Heart}
          trend={15}
        />
        <StatsCard
          title="SEMA Balance"
          value="1,234"
          icon={Coins}
        />
      </div>

      <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold mb-4">Recent Engagement</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-800">
                <th className="pb-3">Tweet</th>
                <th className="pb-3">Engagement</th>
                <th className="pb-3">Tokens</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800/50">
                <td className="py-4">
                  <p className="text-sm">Just launched our new Web3 dashboard! 🚀 #BuildingInPublic</p>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-sm"><Heart className="w-4 h-4 mr-1" /> 24</span>
                    <span className="flex items-center text-sm"><Repeat className="w-4 h-4 mr-1" /> 12</span>
                    <span className="flex items-center text-sm"><MessageSquare className="w-4 h-4 mr-1" /> 8</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-[#2AFF6B]">+50 SEMA</span>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => handleDistribute("Just launched our new Web3 dashboard! 🚀 #BuildingInPublic")}
                    className="px-4 py-2 bg-gradient-to-r from-[#0072FF] to-[#00E5FF] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Distribute
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <DistributionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tweetContent={selectedTweet}
      />
    </div>
  );
}