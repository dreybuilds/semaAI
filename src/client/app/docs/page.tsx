'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Brain, MessageCircle, Send, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Docs() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            <span className="font-bold text-xl">SemaAI</span>
          </Link>
        </div>
      </nav>

      {/* Documentation Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">SemaAI Bot Installation Manual</h1>
            <p className="text-xl text-muted-foreground">
              Step-by-step instructions for installing and configuring the SemaAI Bot on Telegram and Discord servers.
            </p>
          </div>

          {/* Table of Contents */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
              <div className="space-y-2">
                <a href="#telegram" className="block text-primary hover:underline">1. Installing SemaAI Bot on Telegram</a>
                <a href="#discord" className="block text-primary hover:underline">2. Installing SemaAI Bot on Discord</a>
                <a href="#sema-score" className="block text-primary hover:underline">3. Using @sema_score to Monitor Twitter Posts</a>
                <a href="#troubleshooting" className="block text-primary hover:underline">4. Troubleshooting and Support</a>
              </div>
            </CardContent>
          </Card>

          {/* Telegram Installation */}
          <section id="telegram" className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Send className="h-8 w-8" />
              Installing SemaAI Bot on Telegram
            </h2>
            
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 1: Add the SemaAI Bot to Your Telegram Group</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Open Telegram and search for the <span className="font-mono">@SemaAI_Bot</span></li>
                    <li>Click <strong>Start</strong> to initiate a chat with the bot</li>
                    <li>Type <span className="font-mono">/addgroup</span> and follow the instructions</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 2: Grant Admin Permissions</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Go to your group settings and select <strong>Administrators</strong></li>
                    <li>Add the SemaAI Bot as an administrator</li>
                    <li>Enable the following permissions:
                      <ul className="list-disc list-inside ml-6 mt-2">
                        <li>Post Messages</li>
                        <li>Edit Messages</li>
                        <li>Delete Messages (optional)</li>
                        <li>Invite Users</li>
                      </ul>
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 3: Configure the Bot</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Type <span className="font-mono">/setup</span> in the group chat</li>
                    <li>Follow the prompts to link your Twitter account</li>
                    <li>Enable <span className="font-mono">@sema_score</span> monitoring</li>
                    <li>Set up monitoring preferences</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Discord Installation */}
          <section id="discord" className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <MessageCircle className="h-8 w-8" />
              Installing SemaAI Bot on Discord
            </h2>
            
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 1: Invite the SemaAI Bot to Your Server</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Visit the <a href="https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot" className="text-primary hover:underline">SemaAI Bot Invite Link</a></li>
                    <li>Select your server from the dropdown menu</li>
                    <li>Click <strong>Authorize</strong> and complete verification</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 2: Grant Necessary Permissions</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Go to server settings and select <strong>Roles</strong></li>
                    <li>Assign the SemaAI Bot role with permissions:
                      <ul className="list-disc list-inside ml-6 mt-2">
                        <li>Read Messages</li>
                        <li>Send Messages</li>
                        <li>Embed Links</li>
                        <li>Manage Messages (optional)</li>
                      </ul>
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 3: Configure the Bot</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Type <span className="font-mono">/setup</span> in any text channel</li>
                    <li>Follow the configuration process</li>
                    <li>Link your Twitter account and enable monitoring</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Using @sema_score */}
          <section id="sema-score" className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Twitter className="h-8 w-8" />
              Using @sema_score to Monitor Twitter Posts
            </h2>
            
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 1: Enable @sema_score Monitoring</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Type <span className="font-mono">/monitor_twitter</span> in your group/server</li>
                    <li>Link your Twitter account and authorize access</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 2: Set Up Monitoring Preferences</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Specify monitoring targets:
                      <ul className="list-disc list-inside ml-6 mt-2">
                        <li><span className="font-mono">/monitor_hashtag #SemaAI</span></li>
                        <li><span className="font-mono">/monitor_account @SemaAI_Official</span></li>
                      </ul>
                    </li>
                    <li>Choose update frequency (real-time, hourly, daily)</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Step 3: View Analytics and Insights</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Automatic updates will be posted in your group/server</li>
                    <li>Use <span className="font-mono">@sema_score</span> command for detailed analysis:
                      <pre className="bg-secondary p-2 rounded-lg mt-2 overflow-x-auto">
                        @sema_score https://twitter.com/SemaAI_Official/status/123456789
                      </pre>
                    </li>
                    <li>View engagement metrics, sentiment analysis, and staking activity</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Troubleshooting */}
          <section id="troubleshooting" className="space-y-6">
            <h2 className="text-3xl font-bold">Troubleshooting and Support</h2>
            
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Common Issues</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Bot Not Responding</h4>
                      <ul className="list-disc list-inside text-muted-foreground ml-4">
                        <li>Verify bot permissions</li>
                        <li>Check bot status with <span className="font-mono">/status</span></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold">Twitter Authorization Failed</h4>
                      <ul className="list-disc list-inside text-muted-foreground ml-4">
                        <li>Reauthorize using <span className="font-mono">/setup</span></li>
                        <li>Ensure your Twitter account is public</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold">No Updates Received</h4>
                      <ul className="list-disc list-inside text-muted-foreground ml-4">
                        <li>Verify monitoring preferences</li>
                        <li>Check bot channel access</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Support Channels</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Email: <a href="mailto:support@semaai.com" className="text-primary">support@semaai.com</a></p>
                    <p>Telegram: <span className="font-mono">@SemaAI_Support</span></p>
                    <p>Discord: <a href="https://discord.gg/semaai" className="text-primary">Join Support Server</a></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Conclusion */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Conclusion</h2>
            <p className="text-muted-foreground">
              For more advanced features and customization options, visit the{' '}
              <a href="https://docs.semaai.com" className="text-primary hover:underline">
                SemaAI Documentation
              </a>
              .
            </p>
            <p className="text-xl font-semibold text-primary">Happy Monitoring with SemaAI! 🚀</p>
          </section>
        </div>
      </main>
    </div>
  );
}