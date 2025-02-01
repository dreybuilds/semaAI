import React from 'react';
import { Trophy, Medal } from 'lucide-react';

const leaderboardData = [
  { rank: 1, handle: '@web3enthusiast', score: 1250, tokens: 500 },
  { rank: 2, handle: '@cryptodev', score: 980, tokens: 400 },
  { rank: 3, handle: '@blockchain_guru', score: 850, tokens: 300 },
];

export function Leaderboard() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <p className="text-gray-400">Top contributors and token earners</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {leaderboardData.slice(0, 3).map((user) => (
          <div
            key={user.handle}
            className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20">
              {user.rank === 1 && (
                <div className="absolute transform rotate-45 bg-yellow-500 text-yellow-900 text-xs font-bold py-1 right-[-35px] top-[32px] w-[170px] text-center">
                  TOP CONTRIBUTOR
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0072FF] to-[#00E5FF] flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg">{user.handle}</p>
                <p className="text-gray-400">Engagement Score: {user.score}</p>
                <p className="text-[#2AFF6B]">{user.tokens} SEMA earned</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold mb-4">All Contributors</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-800">
                <th className="pb-3">Rank</th>
                <th className="pb-3">Handle</th>
                <th className="pb-3">Engagement Score</th>
                <th className="pb-3">Tokens Earned</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user) => (
                <tr key={user.handle} className="border-b border-gray-800/50">
                  <td className="py-4">#{user.rank}</td>
                  <td className="py-4">{user.handle}</td>
                  <td className="py-4">{user.score}</td>
                  <td className="py-4">{user.tokens} SEMA</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}