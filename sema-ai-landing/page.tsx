import { ArrowRight, Bot, Coins, Share2, Shield, Wallet } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Monetize Your Social Engagement with{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    SemaAI
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Transform your social media presence into real value. Create, engage, and earn with AI-powered
                  blockchain technology.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-3xl blur-3xl" />
                <img
                  alt="Dashboard Preview"
                  className="relative rounded-2xl border bg-background shadow-2xl"
                  src="/placeholder.svg?height=600&width=800"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Simple steps to start earning from your social media presence
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Easy Authentication"
            description="Connect with your favorite social platforms - Gmail, X, Discord, Telegram, or phone number."
          />
          <FeatureCard
            icon={<Share2 className="h-8 w-8" />}
            title="Create & Share"
            description="Use #semaAI in your posts to automatically generate a blockchain wallet for your content."
          />
          <FeatureCard
            icon={<Bot className="h-8 w-8" />}
            title="AI-Powered Analysis"
            description="Our AI tracks engagement and assigns value to interactions with your content."
          />
          <FeatureCard
            icon={<Wallet className="h-8 w-8" />}
            title="Smart Wallets"
            description="Each engagement creates a child wallet, tracking the value of interactions."
          />
          <FeatureCard
            icon={<Coins className="h-8 w-8" />}
            title="Token Rewards"
            description="Earn $SEMA tokens based on engagement levels and convert to various cryptocurrencies."
          />
          <FeatureCard
            icon={<Share2 className="h-8 w-8" />}
            title="Creator Rewards"
            description="Content creators can distribute rewards to engaged users through smart contracts."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-background p-8 text-center md:p-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Start Earning?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Join thousands of content creators and engaged users already benefiting from the SemaAI ecosystem.
          </p>
          <Button size="lg" className="mt-8">
            Create Your Account
          </Button>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

