'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Share2, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock data
const stakingProjects = [
  { id: 1, name: 'DeFi Protocol Launch', type: 'project', staked: 5000, supporters: 120 },
  { id: 2, name: 'NFT Marketplace', type: 'project', staked: 3000, supporters: 80 },
  { id: 3, name: 'Crypto Warriors Server', type: 'discord', staked: 2000, supporters: 50 },
];

export function StakingDashboard() {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleStake = async (projectId: number) => {
    try {
      // Implement staking logic here using web3 libraries
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Staking successful!');
      setSelectedAmount('');
    } catch (error) {
      toast.error('Staking failed');
    }
  };

  const handleShare = (projectId: number) => {
    setSelectedProject(projectId);
    setShareDialogOpen(true);
  };

  const generateShareLink = (projectId: number) => {
    const link = `https://semai.io/stake/${projectId}`;
    navigator.clipboard.writeText(link);
    toast.success('Share link copied to clipboard!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staking Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stakingProjects.map((project) => (
            <Card key={project.id}>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.supporters} supporters
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{project.staked.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">$SEMA staked</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Amount to stake"
                      value={selectedAmount}
                      onChange={(e) => setSelectedAmount(e.target.value)}
                    />
                    <Button onClick={() => handleStake(project.id)}>
                      Stake
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleShare(project.id)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Staking Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={`https://semai.io/stake/${selectedProject}`}
                />
                <Button
                  variant="outline"
                  onClick={() => selectedProject && generateShareLink(selectedProject)}
                >
                  Copy
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    if (selectedProject) {
                      window.open(`https://twitter.com/intent/tweet?text=Support this project on SemaAI&url=https://semai.io/stake/${selectedProject}`, '_blank');
                    }
                  }}
                >
                  Share on Twitter
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    if (selectedProject) {
                      window.open(`https://t.me/share/url?url=https://semai.io/stake/${selectedProject}&text=Support this project on SemaAI`, '_blank');
                    }
                  }}
                >
                  Share on Telegram
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}