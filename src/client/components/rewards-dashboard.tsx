'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const rewardsData = [
  { id: 1, name: 'Crypto Warriors', type: 'discord', members: 1200, activeUsers: 500 },
  { id: 2, name: 'NFT Creators', type: 'discord', members: 800, activeUsers: 300 },
  { id: 3, name: 'DeFi News', type: 'telegram', members: 2000, activeUsers: 800 },
];

const usersData = [
  { id: 1, username: 'cryptowhale', points: 2500, wallet: '0x1234...5678' },
  { id: 2, username: 'defi_master', points: 1800, wallet: '0x8765...4321' },
  { id: 3, username: 'nft_collector', points: 1500, wallet: '0x9876...2345' },
  { id: 4, username: 'web3_builder', points: 1200, wallet: '0x3456...7890' },
  { id: 5, username: 'blockchain_dev', points: 1000, wallet: '0x7890...1234' },
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 6,
    username: `user_${i + 6}`,
    points: Math.floor(Math.random() * 1000) + 500,
    wallet: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`
  }))
].sort((a, b) => b.points - a.points);

// Mock groups/channels data
const groupsData = [
  { id: 1, name: 'Trading Discussion', type: 'channel', platform: 'discord', members: 500, points: 1500 },
  { id: 2, name: 'NFT Showcase', type: 'channel', platform: 'discord', members: 300, points: 1200 },
  { id: 3, name: 'DeFi Group', type: 'group', platform: 'telegram', members: 1000, points: 2000 },
  { id: 4, name: 'Crypto News', type: 'channel', platform: 'telegram', members: 800, points: 1800 },
];

// Mock posts data
const postsData = [
  { 
    id: 1, 
    content: 'Latest update on DeFi protocols...', 
    author: 'defi_master',
    platform: 'discord',
    channel: 'Trading Discussion',
    engagement: 250,
    points: 500
  },
  { 
    id: 2, 
    content: 'New NFT collection launch...', 
    author: 'nft_collector',
    platform: 'telegram',
    channel: 'NFT Showcase',
    engagement: 180,
    points: 360
  },
];

export function RewardsDashboard() {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [distributionType, setDistributionType] = useState('equal');
  const [amount, setAmount] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pointsFilter, setPointsFilter] = useState('top10');
  const [customTopN, setCustomTopN] = useState('10');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [contentType, setContentType] = useState('all');

  const handleDistribute = () => {
    toast.success('Rewards distribution initiated!');
  };

  const filterByPlatform = (items: any[]) => {
    if (platformFilter === 'all') return items;
    return items.filter(item => item.platform === platformFilter);
  };

  const filterByContentType = (items: any[]) => {
    if (contentType === 'all') return items;
    return items.filter(item => item.type === contentType);
  };

  const getFilteredUsersByPoints = () => {
    let filteredUsers = [...usersData];
    
    if (searchTerm) {
      filteredUsers = filteredUsers.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.wallet.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (distributionType === 'points') {
      const n = pointsFilter === 'custom' ? parseInt(customTopN) : parseInt(pointsFilter.replace('top', ''));
      filteredUsers = filteredUsers.slice(0, n);
    }

    return filteredUsers;
  };

  const toggleUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rewards Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="distribution" className="space-y-4">
          <TabsList>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="groups">Groups & Channels</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="distribution" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Group/Server</label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a group" />
                </SelectTrigger>
                <SelectContent>
                  {rewardsData.map((group) => (
                    <SelectItem key={group.id} value={group.id.toString()}>
                      {group.name} ({group.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Distribution Type</label>
              <Select value={distributionType} onValueChange={setDistributionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose distribution type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equal">Equal Distribution</SelectItem>
                  <SelectItem value="points">Points Based</SelectItem>
                  <SelectItem value="select">Select Users</SelectItem>
                  <SelectItem value="random">Random Distribution</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {distributionType === 'points' && (
              <div className="space-y-4 border rounded-lg p-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Points Filter</label>
                  <RadioGroup value={pointsFilter} onValueChange={setPointsFilter} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="top10" id="top10" />
                      <Label htmlFor="top10">Top 10 Users</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="top20" id="top20" />
                      <Label htmlFor="top20">Top 20 Users</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="top100" id="top100" />
                      <Label htmlFor="top100">Top 100 Users</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom">Custom Top N Users</Label>
                    </div>
                  </RadioGroup>
                  {pointsFilter === 'custom' && (
                    <Input
                      type="number"
                      placeholder="Enter number of users"
                      value={customTopN}
                      onChange={(e) => setCustomTopN(e.target.value)}
                      className="mt-2 max-w-[200px]"
                      min="1"
                    />
                  )}
                </div>
              </div>
            )}

            {(distributionType === 'select' || distributionType === 'points') && (
              <div className="space-y-4 border rounded-lg p-4">
                <Input
                  placeholder="Search users by username or wallet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    {getFilteredUsersByPoints().map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          {distributionType === 'select' && (
                            <Checkbox
                              checked={selectedUsers.includes(user.id.toString())}
                              onCheckedChange={() => toggleUser(user.id.toString())}
                            />
                          )}
                          <div>
                            <p className="font-medium">{user.username}</p>
                            <p className="text-sm text-muted-foreground">{user.wallet}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{user.points.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                {distributionType === 'select' && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedUsers.length} users
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Amount ($SEMA)</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <Button 
              className="w-full" 
              onClick={handleDistribute}
              disabled={!selectedGroup || !distributionType || !amount || 
                (distributionType === 'select' && selectedUsers.length === 0)}
            >
              Distribute Rewards
            </Button>
          </TabsContent>

          <TabsContent value="groups" className="space-y-4">
            <div className="flex gap-4">
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="discord">Discord</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                </SelectContent>
              </Select>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="channel">Channels</SelectItem>
                  <SelectItem value="group">Groups</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {filterByContentType(filterByPlatform(groupsData)).map((group) => (
                  <Card key={group.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{group.name}</h3>
                          <div className="flex gap-2 text-sm text-muted-foreground">
                            <span className="capitalize">{group.platform}</span>
                            <span>•</span>
                            <span className="capitalize">{group.type}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {group.members.toLocaleString()} members
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{group.points.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">points</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="posts" className="space-y-4">
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="discord">Discord</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
              </SelectContent>
            </Select>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {filterByPlatform(postsData).map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{post.author}</p>
                            <p className="text-sm text-muted-foreground">
                              {post.platform} • {post.channel}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{post.points.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">points</p>
                          </div>
                        </div>
                        <p className="text-sm">{post.content}</p>
                        <p className="text-sm text-muted-foreground">
                          {post.engagement.toLocaleString()} engagements
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}