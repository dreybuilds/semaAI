'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import Link from 'next/link';

export default function Privacy() {
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
            <Link href="/legal/terms" className="text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground">Last Updated: March 21, 2025</p>
          </div>

          <Card>
            <CardContent className="p-6 prose prose-neutral dark:prose-invert max-w-none">
              <h2>1. Information We Collect</h2>
              
              <h3>1.1 Personal Information</h3>
              <ul>
                <li><strong>Account Information:</strong> Name, email address, username, and password</li>
                <li><strong>Profile Information:</strong> Profile picture, bio, and social media links</li>
                <li><strong>Payment Information:</strong> Billing address and payment details (if applicable)</li>
              </ul>

              <h3>1.2 Usage Data</h3>
              <ul>
                <li><strong>Engagement Data:</strong> Content you create, share, or interact with</li>
                <li><strong>Analytics Data:</strong> IP address, device information, browser type, and usage patterns</li>
              </ul>

              <h3>1.3 Cookies and Tracking Technologies</h3>
              <p>We use cookies, web beacons, and similar technologies to track activity on the Service and improve user experience.</p>

              <h2>2. How We Use Your Information</h2>
              <p>We use your information for:</p>
              <ul>
                <li>Providing, maintaining, and improving the Service</li>
                <li>Personalizing your experience and delivering relevant content</li>
                <li>Processing transactions and sending notifications</li>
                <li>Communicating with you about updates and support</li>
                <li>Monitoring and analyzing usage trends</li>
                <li>Enforcing our Terms of Service and protecting security</li>
              </ul>

              <h2>3. How We Share Your Information</h2>
              <p>We may share your information in these circumstances:</p>
              <ul>
                <li><strong>With Your Consent:</strong> When you give us permission</li>
                <li><strong>With Service Providers:</strong> Third-party vendors who assist us</li>
                <li><strong>For Legal Reasons:</strong> To comply with legal obligations</li>
                <li><strong>During Business Transfers:</strong> In connection with mergers or acquisitions</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>We implement industry-standard security measures:</p>
              <ul>
                <li>Encryption of sensitive information</li>
                <li>Regular security audits and monitoring</li>
                <li>Access controls to limit internal access</li>
              </ul>

              <h2>5. Your Rights and Choices</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal data</li>
                <li>Request corrections to inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Request data portability</li>
              </ul>

              <h2>6. Children's Privacy</h2>
              <p>The Service is not intended for users under 13. We do not knowingly collect personal information from children.</p>

              <h2>7. Changes to Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through the Service.</p>

              <h2>8. Contact Us</h2>
              <p>For privacy-related questions, contact us:</p>
              <ul>
                <li>Email: privacy@semaai.com</li>
                <li>Discord: <a href="https://discord.gg/semaai" className="text-primary hover:underline">Join Support Server</a></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}