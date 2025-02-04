import React, { useState } from 'react';
import { X } from 'lucide-react';

interface DistributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  tweetContent: string;
}

export function DistributionModal({ isOpen, onClose, tweetContent }: DistributionModalProps) {
  const [amount, setAmount] = useState('50');

  if (!isOpen) return null;

  const handleDistribute = () => {
    // Here you would integrate with your Web3 wallet to send tokens
    console.log(`Distributing ${amount} SEMA tokens for tweet: ${tweetContent}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#121826] rounded-xl p-6 max-w-md w-full border border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Distribute SEMA Tokens</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-2">Tweet</p>
          <p className="text-white bg-gray-900/50 p-3 rounded-lg">{tweetContent}</p>
        </div>

        <div className="mb-6">
          <label htmlFor="token-amount" className="block text-gray-400 text-sm mb-2">
            Amount of SEMA tokens
          </label>
          <input
            id="token-amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-[#2AFF6B] focus:outline-none"
          />
        </div>

        <button
          onClick={handleDistribute}
          className="w-full px-4 py-3 bg-gradient-to-r from-[#0072FF] to-[#00E5FF] rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Confirm Distribution
        </button>
      </div>
    </div>
  );
}