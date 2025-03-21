'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for demonstration
const discordData = [
  { name: 'SemaAI Official', points: 850, members: 1200 },
  { name: 'Web3 Builders', points: 450, members: 800 },
  { name: 'DeFi Alliance', points: 350, members: 600 },
  { name: 'NFT Creators', points: 250, members: 400 },
];

const telegramData = [
  { name: 'SemaAI Community', points: 400, members: 2000 },
  { name: 'Crypto News', points: 300, members: 1500 },
  { name: 'DeFi Updates', points: 250, members: 1200 },
];

const twitterData = [
  { name: 'Engagement Posts', points: 600 },
  { name: 'Retweets', points: 400 },
  { name: 'Replies', points: 300 },
];

export function EngagementStats() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Platform Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="discord" className="space-y-4">
          <TabsList>
            <TabsTrigger value="discord">Discord</TabsTrigger>
            <TabsTrigger value="telegram">Telegram</TabsTrigger>
            <TabsTrigger value="twitter">Twitter</TabsTrigger>
          </TabsList>

          <TabsContent value="discord">
            <div className="space-y-4">
              <div className="grid gap-4">
                {discordData.map((server) => (
                  <Card key={server.name}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{server.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {server.members} members
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{server.points}</p>
                          <p className="text-sm text-muted-foreground">points</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="telegram">
            <div className="space-y-4">
              <div className="grid gap-4">
                {telegramData.map((group) => (
                  <Card key={group.name}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{group.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {group.members} members
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{group.points}</p>
                          <p className="text-sm text-muted-foreground">points</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="twitter">
            <div className="space-y-4">
              <div className="grid gap-4">
                {twitterData.map((activity) => (
                  <Card key={activity.name}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{activity.name}</h3>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{activity.points}</p>
                          <p className="text-sm text-muted-foreground">points</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}