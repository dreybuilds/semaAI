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
    <div className="p-4 md:p-8 w-full bg-[#121826]">
      <header className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-white">👋 Welcome, @user</h1>
        <p className="text-gray-400 text-sm md:text-base">Track your engagement and manage SEMA tokens</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
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

      <section className="bg-gray-900/50 rounded-xl border border-gray-800 backdrop-blur-sm">
        <h2 className="text-lg md:text-xl font-bold p-4 md:p-6 pb-0 text-white">Recent Engagement</h2>
        <div className="table-scroll-container">
          <div>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-800">
                  <th className="p-4 md:p-6 pb-3 text-sm md:text-base font-medium">Tweet</th>
                  <th className="p-4 md:p-6 pb-3 text-sm md:text-base font-medium">Engagement</th>
                  <th className="p-4 md:p-6 pb-3 text-sm md:text-base font-medium">Tokens</th>
                  <th className="p-4 md:p-6 pb-3 text-sm md:text-base font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800/50">
                  <td className="p-4 md:p-6">
                    <p className="text-sm text-white">Just launched our new Web3 dashboard! 🚀 #BuildingInPublic</p>
                  </td>
                  <td className="p-4 md:p-6">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center text-sm text-gray-300">
                        <Heart className="w-4 h-4 mr-1 text-[#2AFF6B]" /> 24
                      </span>
                      <span className="flex items-center text-sm text-gray-300">
                        <Repeat className="w-4 h-4 mr-1 text-[#2AFF6B]" /> 12
                      </span>
                      <span className="flex items-center text-sm text-gray-300">
                        <MessageSquare className="w-4 h-4 mr-1 text-[#2AFF6B]" /> 8
                      </span>
                    </div>
                  </td>
                  <td className="p-4 md:p-6">
                    <span className="text-[#2AFF6B] text-sm">+50 SEMA</span>
                  </td>
                  <td className="p-4 md:p-6">
                    <button
                      onClick={() => handleDistribute("Just launched our new Web3 dashboard! 🚀 #BuildingInPublic")}
                      className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-[#0072FF] to-[#00E5FF] rounded-lg text-xs md:text-sm font-medium hover:opacity-90 transition-opacity text-white whitespace-nowrap"
                    >
                      Distribute
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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