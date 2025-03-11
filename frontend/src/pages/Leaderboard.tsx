import React from 'react';
import { Trophy, Medal } from 'lucide-react';

const leaderboardData = [
  { rank: 1, handle: '@web3enthusiast', score: 1250, tokens: 500 },
  { rank: 2, handle: '@cryptodev', score: 980, tokens: 400 },
  { rank: 3, handle: '@blockchain_guru', score: 850, tokens: 300 },
];

export function Leaderboard() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold">Leaderboard</h1>
        <p className="text-gray-400 text-sm md:text-base">Top contributors and token earners</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {leaderboardData.slice(0, 3).map((user) => (
          <div
            key={user.handle}
            className="bg-gray-900/50 rounded-xl p-4 md:p-6 border border-gray-800 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20">
              {user.rank === 1 && (
                <div className="absolute transform rotate-45 bg-yellow-500 text-yellow-900 text-xs font-bold py-1 right-[-35px] top-[32px] w-[170px] text-center">
                  TOP CONTRIBUTOR
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-[#0072FF] to-[#00E5FF] flex items-center justify-center flex-shrink-0">
                <Trophy className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-bold text-base md:text-lg truncate">{user.handle}</p>
                <p className="text-gray-400 text-sm">Score: {user.score}</p>
                <p className="text-[#2AFF6B] text-sm">{user.tokens} SEMA</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900/50 rounded-xl border border-gray-800">
        <h2 className="text-lg md:text-xl font-bold p-4 md:p-6 pb-0">All Contributors</h2>
        <div className="table-scroll-container">
          <div>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-800">
                  <th className="p-4 md:p-6 pb-3 text-sm md:text-base font-medium">Rank</th>
                  <th className="p-4 md:p-6 pb-3 text-sm md:text-base font-medium">Handle</th>
                  <th className="p-4 md:p-6 pb-3 text-sm md:text-base font-medium">Score</th>
                  <th className="p-4 md:p-6 pb-3 text-sm md:text-base font-medium">Tokens</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user) => (
                  <tr key={user.handle} className="border-b border-gray-800/50">
                    <td className="p-4 md:p-6 text-sm">#{user.rank}</td>
                    <td className="p-4 md:p-6 text-sm truncate max-w-[120px] md:max-w-none">
                      {user.handle}
                    </td>
                    <td className="p-4 md:p-6 text-sm">{user.score}</td>
                    <td className="p-4 md:p-6 text-sm">{user.tokens} SEMA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}