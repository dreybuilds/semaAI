'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowDownUp, Settings, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const tokens = [
  { symbol: 'SEMA', name: 'SemaAI Token', balance: '1,234.56' },
  { symbol: 'SOL', name: 'Solana', balance: '45.67' },
  { symbol: 'ETH', name: 'Ethereum', balance: '2.34' },
];

const networkFees = {
  solana: {
    slow: 0.000001,
    medium: 0.000005,
    fast: 0.00001
  },
  ethereum: {
    slow: 0.001,
    medium: 0.003,
    fast: 0.005
  }
};

export function TokenExchange() {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTokenList, setShowTokenList] = useState<'from' | 'to' | null>(null);
  const [selectedSpeed, setSelectedSpeed] = useState<'slow' | 'medium' | 'fast'>('medium');

  const handleExchange = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Exchange successful!');
      setAmount('');
    } catch (error) {
      toast.error('Exchange failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const getNetworkFee = () => {
    const network = toToken.symbol === 'SOL' ? 'solana' : 'ethereum';
    return networkFees[network][selectedSpeed];
  };

  const TokenSelect = ({ token, onClick }: { token: typeof tokens[0]; onClick: () => void }) => (
    <button
      className="token-select-button"
      onClick={onClick}
    >
      <span className="font-semibold">{token.symbol}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </button>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Swap</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Card className="bg-secondary border-0">
        <CardContent className="p-4 space-y-1">
          <div className="token-input-container">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="token-input"
            />
            <TokenSelect token={fromToken} onClick={() => setShowTokenList('from')} />
          </div>
          <div className="px-4 text-sm text-muted-foreground">
            Balance: {fromToken.balance} {fromToken.symbol}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center -my-2 relative z-10">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full h-8 w-8 shadow-lg"
          onClick={handleSwap}
        >
          <ArrowDownUp className="h-4 w-4" />
        </Button>
      </div>

      <Card className="bg-secondary border-0">
        <CardContent className="p-4 space-y-1">
          <div className="token-input-container">
            <Input
              type="number"
              value={amount ? (parseFloat(amount) * 0.95).toFixed(6) : ''}
              placeholder="0"
              disabled
              className="token-input"
            />
            <TokenSelect token={toToken} onClick={() => setShowTokenList('to')} />
          </div>
          <div className="px-4 text-sm text-muted-foreground">
            Balance: {toToken.balance} {toToken.symbol}
          </div>
        </CardContent>
      </Card>

      <div className="p-4 rounded-2xl bg-secondary space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Exchange Rate</span>
          <span>1 {fromToken.symbol} ≈ 0.95 {toToken.symbol}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Network Fee</span>
          <div className="flex gap-2">
            <button
              className={`px-2 py-1 rounded-full text-xs ${
                selectedSpeed === 'slow' ? 'bg-primary/20 text-primary' : 'hover:bg-muted'
              }`}
              onClick={() => setSelectedSpeed('slow')}
            >
              Slow
            </button>
            <button
              className={`px-2 py-1 rounded-full text-xs ${
                selectedSpeed === 'medium' ? 'bg-primary/20 text-primary' : 'hover:bg-muted'
              }`}
              onClick={() => setSelectedSpeed('medium')}
            >
              Medium
            </button>
            <button
              className={`px-2 py-1 rounded-full text-xs ${
                selectedSpeed === 'fast' ? 'bg-primary/20 text-primary' : 'hover:bg-muted'
              }`}
              onClick={() => setSelectedSpeed('fast')}
            >
              Fast
            </button>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Fee</span>
          <span>~ {getNetworkFee()} {toToken.symbol}</span>
        </div>
      </div>

      <Button
        className="w-full h-14 text-lg rounded-2xl"
        onClick={handleExchange}
        disabled={!amount || loading}
      >
        {loading ? 'Swapping...' : 'Swap'}
      </Button>

      <Dialog open={showTokenList !== null} onOpenChange={() => setShowTokenList(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a token</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {tokens.map((token) => (
              <button
                key={token.symbol}
                className="w-full p-4 rounded-lg hover:bg-secondary flex justify-between items-center"
                onClick={() => {
                  if (showTokenList === 'from') setFromToken(token);
                  else setToToken(token);
                  setShowTokenList(null);
                }}
              >
                <div>
                  <div className="font-medium">{token.symbol}</div>
                  <div className="text-sm text-muted-foreground">{token.name}</div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  Balance: {token.balance}
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}