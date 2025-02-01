import React from 'react';
import { ExternalLink } from 'lucide-react';

const transactions = [
  {
    id: '1',
    date: '2024-03-15',
    recipient: '@web3enthusiast',
    amount: 50,
    hash: '0x1234...5678',
    status: 'success'
  },
  {
    id: '2',
    date: '2024-03-14',
    recipient: '@cryptodev',
    amount: 25,
    hash: '0x8765...4321',
    status: 'success'
  }
];

export function Transactions() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="text-gray-400">View your token distribution history</p>
      </header>

      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-800">
                <th className="pb-3">Date</th>
                <th className="pb-3">Recipient</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Transaction Hash</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-800/50">
                  <td className="py-4">{tx.date}</td>
                  <td className="py-4">{tx.recipient}</td>
                  <td className="py-4">{tx.amount} SEMA</td>
                  <td className="py-4">
                    <a
                      href={`https://solscan.io/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-[#2AFF6B] hover:underline"
                    >
                      {tx.hash} <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}