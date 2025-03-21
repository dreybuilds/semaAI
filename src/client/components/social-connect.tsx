'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Twitter, MessageCircle, Send } from 'lucide-react';

export function SocialConnect() {
  const handleConnect = (platform: string) => {
    // TODO: Implement OAuth connection
    console.log(`Connecting to ${platform}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect Social Accounts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleConnect('twitter')}
        >
          <Twitter className="mr-2 h-4 w-4" />
          Connect Twitter
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleConnect('discord')}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Connect Discord
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleConnect('telegram')}
        >
          <Send className="mr-2 h-4 w-4" />
          Connect Telegram
        </Button>
      </CardContent>
    </Card>
  );
}