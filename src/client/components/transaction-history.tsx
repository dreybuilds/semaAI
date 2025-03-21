'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

// Mock transaction data
const transactions = [
  {
    id: '0x1234...5678',
    type: 'stake',
    amount: '1000 SEMA',
    status: 'completed',
    date: '2025-03-21 14:30',
    chain: 'solana'
  },
  {
    id: '0x8765...4321',
    type: 'reward',
    amount: '500 SEMA',
    status: 'completed',
    date: '2025-03-21 13:15',
    chain: 'solana'
  },
  {
    id: '0x9876...2345',
    type: 'exchange',
    amount: '200 SEMA → 10 SOL',
    status: 'completed',
    date: '2025-03-21 12:00',
    chain: 'solana'
  }
];

export function TransactionHistory() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getExplorerUrl = (txId: string, chain: string) => {
    return chain === 'solana'
      ? `https://solscan.io/tx/${txId}`
      : `https://etherscan.io/tx/${txId}`;
  };

  const filteredTransactions = transactions.filter(tx => {
    if (filter !== 'all' && tx.type !== filter) return false;
    if (searchTerm && !tx.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search by transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="stake">Staking</SelectItem>
              <SelectItem value="reward">Rewards</SelectItem>
              <SelectItem value="exchange">Exchange</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 rounded-lg border"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{tx.id}</span>
                  <a
                    href={getExplorerUrl(tx.id, tx.chain)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">{tx.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{tx.amount}</p>
                <p className="text-sm capitalize text-muted-foreground">{tx.type}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}