import React from 'react';
import { Wallet as WalletIcon, ArrowRightLeft, ExternalLink } from 'lucide-react';

export function Wallet() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Wallet</h1>
        <p className="text-gray-400">Manage your SEMA tokens and Solana wallet</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Balance</h2>
            <WalletIcon className="w-6 h-6 text-[#2AFF6B]" />
          </div>
          <div className="mb-4">
            <p className="text-gray-400 text-sm">Available SEMA</p>
            <p className="text-3xl font-bold">1,234</p>
          </div>
          <div className="mb-6">
            <p className="text-gray-400 text-sm">Wallet Address</p>
            <div className="flex items-center space-x-2">
              <code className="text-sm bg-gray-800/50 px-3 py-1 rounded">
                0x1234...5678
              </code>
              <button className="text-[#2AFF6B] hover:text-[#1EFF5B]">
                Copy
              </button>
            </div>
          </div>
          <button className="w-full px-4 py-3 bg-gradient-to-r from-[#0072FF] to-[#00E5FF] rounded-lg font-medium hover:opacity-90 transition-opacity">
            Connect Wallet
          </button>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Swap Tokens</h2>
            <ArrowRightLeft className="w-6 h-6 text-[#2AFF6B]" />
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">You Pay</label>
              <input
                type="number"
                placeholder="0.0"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 focus:border-[#2AFF6B] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">You Receive</label>
              <input
                type="number"
                placeholder="0.0"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 focus:border-[#2AFF6B] focus:outline-none"
              />
            </div>
            <button className="w-full px-4 py-3 bg-gradient-to-r from-[#0072FF] to-[#00E5FF] rounded-lg font-medium hover:opacity-90 transition-opacity">
              Swap Tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}