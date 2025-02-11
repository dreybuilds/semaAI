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
    <div className="p-4 md:p-8">
      <header className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold">Transactions</h1>
        <p className="text-gray-400 text-sm md:text-base">View your token distribution history</p>
      </header>

      <div className="bg-gray-900/50 rounded-xl border border-gray-800">
        <div className="table-scroll-container">
          <div>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-800">
                  <th className="p-4 md:p-6 pb-3 text-sm md:text-base font-medium">Date</th>
                  <th className="p-4 md:p-6 pb-3 text-sm md:text-base font-medium">Recipient</th>
                  <th className="p-4 md:p-6 pb-3 text-sm md:text-base font-medium">Amount</th>
                  <th className="p-4 md:p-6 pb-3 text-sm md:text-base font-medium">Transaction Hash</th>
                  <th className="p-4 md:p-6 pb-3 text-sm md:text-base font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-800/50">
                    <td className="p-4 md:p-6 text-sm whitespace-nowrap">{tx.date}</td>
                    <td className="p-4 md:p-6 text-sm whitespace-nowrap">{tx.recipient}</td>
                    <td className="p-4 md:p-6 text-sm whitespace-nowrap">{tx.amount} SEMA</td>
                    <td className="p-4 md:p-6 text-sm">
                      <a
                        href={`https://solscan.io/tx/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#2AFF6B] hover:underline"
                      >
                        <span className="truncate max-w-[100px] md:max-w-none">{tx.hash}</span>
                        <ExternalLink className="w-4 h-4 ml-1 flex-shrink-0" />
                      </a>
                    </td>
                    <td className="p-4 md:p-6">
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs md:text-sm whitespace-nowrap">
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
    </div>
  );
}