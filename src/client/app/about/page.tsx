'use client';

import { Button } from '@/components/ui/button';
import { Brain, Twitter, MessageCircle, Send, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            <span className="font-bold text-xl">SemaAI</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
            <Link href="/">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Problem Statement */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">The Problem: Web2 Engagement Paradox</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-6 bg-card rounded-lg">
                <h3 className="text-xl font-semibold mb-2">$2.3B/year</h3>
                <p className="text-muted-foreground">
                  Engagement value captured by platforms, with 0% going to users
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg">
                <h3 className="text-xl font-semibold mb-2">38% Fake</h3>
                <p className="text-muted-foreground">
                  Of social media engagements are inauthentic (MIT 2023)
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg">
                <h3 className="text-xl font-semibold mb-2">No Infrastructure</h3>
                <p className="text-muted-foreground">
                  For community co-investment in creators' projects
                </p>
              </div>
            </div>
          </section>

          {/* Solution */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">The Solution</h2>
            <p className="text-xl text-muted-foreground">
              SemaAI uses blockchain + AI to revolutionize social media engagement
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-6 bg-card rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Track & Validate</h3>
                <p className="text-muted-foreground">
                  Proof-of-Engagement NFTs + Content DNA hashing
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Reward Users</h3>
                <p className="text-muted-foreground">
                  Mint $SEMA tokens for genuine interactions
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Empower Communities</h3>
                <p className="text-muted-foreground">
                  DAO treasury for co-investment via Quadratic Funding
                </p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Key Features</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 bg-card rounded-lg">
                <h3 className="text-xl font-semibold mb-2">AI-Powered Tracking</h3>
                <p className="text-muted-foreground">
                  Advanced algorithms detect fake engagements using NLP and ML
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Content DNA</h3>
                <p className="text-muted-foreground">
                  Unique fingerprints for content using SHA-3
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg">
                <h3 className="text-xl font-semibold mb-2">NFT Rewards</h3>
                <p className="text-muted-foreground">
                  Non-transferable NFTs for verified interactions
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Community Investment</h3>
                <p className="text-muted-foreground">
                  Quadratic Funding for creator projects
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <Link href="/">
              <Button size="lg" className="gap-2">
                Get Started <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}