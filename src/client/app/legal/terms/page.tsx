'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            <span className="font-bold text-xl">SemaAI</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/legal/privacy" className="text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Terms of Service</h1>
            <p className="text-muted-foreground">Last Updated: March 21, 2025</p>
          </div>

          <Card>
            <CardContent className="p-6 prose prose-neutral dark:prose-invert max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>By using SemaAI, you confirm that:</p>
              <ul>
                <li>You are at least 13 years old (or the minimum age of digital consent in your jurisdiction)</li>
                <li>You have the legal capacity to enter into a binding agreement</li>
                <li>You agree to comply with these Terms and all applicable laws and regulations</li>
              </ul>

              <h2>2. Description of Service</h2>
              <p>SemaAI provides a platform for:</p>
              <ul>
                <li><strong>Content Creation and Engagement:</strong> Enabling users to create, share, and engage with content</li>
                <li><strong>Token-Based Economy:</strong> Facilitating the earning, staking, and use of $sema tokens for visibility, rewards, and community engagement</li>
                <li><strong>Analytics and Insights:</strong> Offering tools to track engagement, monitor performance, and gain insights into content and audience behavior</li>
              </ul>

              <h2>3. User Accounts</h2>
              <h3>3.1 Account Creation</h3>
              <p>To access certain features of the Service, you must create an account. You agree to:</p>
              <ul>
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and update your account information to keep it accurate and current</li>
              </ul>

              <h3>3.2 Account Security</h3>
              <p>You are responsible for:</p>
              <ul>
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying SemaAI immediately of any unauthorized use or security breach</li>
              </ul>

              <h2>4. User Responsibilities</h2>
              <h3>4.1 Prohibited Activities</h3>
              <p>You agree not to:</p>
              <ul>
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Violate any laws, regulations, or third-party rights</li>
                <li>Engage in fraudulent, abusive, or harmful behavior</li>
                <li>Attempt to disrupt or interfere with the Service's functionality</li>
                <li>Exploit vulnerabilities or misuse the token system</li>
              </ul>

              <h2>5. $sema Tokens</h2>
              <h3>5.1 Earning and Use</h3>
              <ul>
                <li>$sema tokens are earned through engagement and can be used for staking, rewards, and visibility</li>
                <li>Tokens have no monetary value and cannot be exchanged for fiat currency or other cryptocurrencies</li>
              </ul>

              <h2>6. Intellectual Property</h2>
              <p>SemaAI retains all rights, title, and interest in the Service, including software, trademarks, and content. Users retain ownership of the content they create and share but grant SemaAI a license to use, display, and distribute it.</p>

              <h2>7. Privacy</h2>
              <p>Your use of the Service is subject to our <Link href="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link>, which explains how we collect, use, and protect your information.</p>

              <h2>8. Changes to Terms</h2>
              <p>SemaAI reserves the right to modify these Terms at any time. We will notify users of significant changes via email or through the Service.</p>

              <h2>9. Contact Us</h2>
              <p>If you have questions about these Terms, please contact us:</p>
              <ul>
                <li>Email: support@semaai.com</li>
                <li>Discord: <a href="https://discord.gg/semaai" className="text-primary hover:underline">Join Support Server</a></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}