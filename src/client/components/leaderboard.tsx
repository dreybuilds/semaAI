'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data
const leaderboardData = [
  { id: 1, name: 'Crypto Warriors', type: 'discord', points: 15000, members: 1200 },
  { id: 2, name: 'NFT Creators', type: 'discord', points: 12000, members: 800 },
  { id: 3, name: 'DeFi News', type: 'telegram', points: 10000, members: 2000 },
  { id: 4, name: 'Web3 Updates', type: 'twitter', points: 8000, followers: 5000 },
];

const userLeaderboardData = [
  { 
    id: 1, 
    username: 'cryptowhale', 
    wallet: '0x1234...5678',
    points: 25000,
    rank: 1,
    badges: ['Early Adopter', 'Top Contributor']
  },
  { 
    id: 2, 
    username: 'defi_master', 
    wallet: '0x8765...4321',
    points: 18000,
    rank: 2,
    badges: ['DeFi Expert']
  },
  { 
    id: 3, 
    username: 'nft_collector', 
    wallet: '0x9876...2345',
    points: 15000,
    rank: 3,
    badges: ['NFT Pioneer']
  },
  { 
    id: 4, 
    username: 'web3_builder', 
    wallet: '0x3456...7890',
    points: 12000,
    rank: 4,
    badges: ['Developer']
  },
];

// Mock user's communities data
const userCommunitiesData = [
  {
    id: 1,
    name: 'SemaAI Official',
    type: 'discord',
    role: 'moderator',
    members: 1500,
    points: 2500,
    rank: 3
  },
  {
    id: 2,
    name: 'DeFi Traders',
    type: 'telegram',
    role: 'member',
    members: 3000,
    points: 1800,
    rank: 5
  },
  {
    id: 3,
    name: 'NFT Collectors',
    type: 'discord',
    role: 'admin',
    members: 800,
    points: 3200,
    rank: 1
  },
  {
    id: 4,
    name: 'Crypto News',
    type: 'twitter',
    role: 'contributor',
    followers: 12000,
    points: 2100,
    rank: 4
  }
];

export function Leaderboard() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [communitySearchTerm, setCommunitySearchTerm] = useState('');

  const filteredData = leaderboardData
    .filter(item => filter === 'all' || item.type === filter)
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filteredUsers = userLeaderboardData
    .filter(user => 
      user.username.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.wallet.toLowerCase().includes(userSearchTerm.toLowerCase())
    );

  const filteredCommunities = userCommunitiesData
    .filter(community =>
      community.name.toLowerCase().includes(communitySearchTerm.toLowerCase())
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="communities" className="space-y-4">
          <TabsList>
            <TabsTrigger value="communities">Global Communities</TabsTrigger>
            <TabsTrigger value="my-communities">My Communities</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="communities">
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Search communities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="discord">Discord</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredData.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{item.points.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">points</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-communities">
            <div className="mb-6">
              <Input
                placeholder="Search your communities..."
                value={communitySearchTerm}
                onChange={(e) => setCommunitySearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {filteredCommunities.map((community) => (
                <Card key={community.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">#{community.rank}</span>
                          <h3 className="font-semibold">{community.name}</h3>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-sm text-muted-foreground capitalize">
                            {community.type}
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary capitalize">
                            {community.role}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {community.members ? `${community.members.toLocaleString()} members` : 
                           `${community.followers?.toLocaleString()} followers`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{community.points.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">points</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="mb-6">
              <Input
                placeholder="Search by username or wallet address..."
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">#{user.rank}</span>
                          <h3 className="font-semibold">{user.username}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">
                          {user.wallet}
                        </p>
                        <div className="flex gap-2">
                          {user.badges.map((badge, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{user.points.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">points</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}