'use client';

import { Button } from '@/components/ui/button';
import { AuthForm } from '@/components/auth-form';
import { Brain, Twitter, MessageCircle, Send, ChevronRight, Book } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            <span className="font-bold text-xl">SemaAI</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <a
                href="https://twitter.com/sema_score"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <Link href="/docs">
              <Button variant="outline" size="icon">
                <Book className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Earn Rewards for
              <span className="text-primary"> Real Engagement</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Connect your social accounts, engage authentically, and earn $SEMA tokens
              for your valuable contributions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/about">
                <Button variant="outline">
                  Learn More <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="secondary">
                  View Documentation <Book className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <AuthForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/legal/terms" className="hover:text-primary">Terms of Service</Link>
            <Link href="/legal/privacy" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}