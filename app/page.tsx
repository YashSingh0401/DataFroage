"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Database,
  Sparkles,
  ArrowRight,
  BarChart3,
  Upload,
  MessageSquare,
  Search,
  Zap,
  Shield,
  Globe,
  ChevronRight,
} from "lucide-react"

const features = [
  {
    icon: Upload,
    title: "Easy Upload",
    description: "Drag and drop your datasets in CSV, JSON, or Excel formats",
  },
  {
    icon: BarChart3,
    title: "Smart Analysis",
    description: "Get instant insights with AI-powered data analysis",
  },
  {
    icon: MessageSquare,
    title: "AI Chatbot",
    description: "Ask questions about your data in natural language",
  },
  {
    icon: Search,
    title: "Kaggle Integration",
    description: "Search and import datasets directly from Kaggle",
  },
]

const stats = [
  { value: "10M+", label: "Datasets Analyzed" },
  { value: "50K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "< 1s", label: "Analysis Time" },
]

const trustedBy = [
  "TechCorp", "DataFlow", "Analytics Pro", "CloudBase", "InsightAI"
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
                <Database className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">DataForge</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="#docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/25">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4" />
              AI-Powered Dataset Intelligence
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              Transform data into{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                actionable insights
              </span>
            </h1>

            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Upload, analyze, and visualize your datasets with cutting-edge AI. 
              Get intelligent recommendations and uncover hidden patterns in seconds.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-xl shadow-primary/25 h-12 px-8 text-base">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/chatbot">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                  Try AI Chatbot
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="relative rounded-2xl border border-border/50 bg-card shadow-2xl shadow-primary/10 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-chart-4/60" />
                  <div className="w-3 h-3 rounded-full bg-chart-3/60" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted-foreground">dataforge.ai/dashboard</span>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-muted/20 to-muted/40">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Datasets Analyzed", value: "1,234", change: "+12.5%" },
                    { label: "AI Queries", value: "8,567", change: "+23.1%" },
                    { label: "Reports Generated", value: "456", change: "+8.3%" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="rounded-xl bg-card p-6 border border-border/50 shadow-sm"
                    >
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                      <p className="text-sm text-chart-3 mt-1">{stat.change}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 rounded-xl bg-card p-6 border border-border/50 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Analysis Trends</h3>
                    <span className="text-sm text-muted-foreground">Last 7 days</span>
                  </div>
                  <div className="h-32 flex items-end gap-2">
                    {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 1 + i * 0.05, duration: 0.4 }}
                        className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-accent"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">Everything you need for data analysis</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful features to help you understand your data better
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-balance">
                Built for data scientists, by data scientists
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We understand the challenges of working with large datasets. 
                That&apos;s why we built DataForge with performance and ease of use in mind.
              </p>

              <div className="mt-8 space-y-6">
                {[
                  { icon: Zap, title: "Lightning Fast", description: "Analyze millions of rows in seconds" },
                  { icon: Shield, title: "Enterprise Security", description: "Your data is encrypted and secure" },
                  { icon: Globe, title: "Cloud Native", description: "Access your data from anywhere" },
                ].map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl opacity-50" />
              <div className="relative rounded-2xl bg-card border border-border/50 p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
                    <div className="flex-1">
                      <div className="h-2 w-24 bg-foreground/20 rounded" />
                      <div className="h-2 w-16 bg-foreground/10 rounded mt-1" />
                    </div>
                    <span className="text-xs text-chart-3 font-medium">+24%</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-chart-3" />
                    <div className="flex-1">
                      <div className="h-2 w-32 bg-foreground/20 rounded" />
                      <div className="h-2 w-20 bg-foreground/10 rounded mt-1" />
                    </div>
                    <span className="text-xs text-chart-3 font-medium">+18%</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-chart-3 to-primary" />
                    <div className="flex-1">
                      <div className="h-2 w-28 bg-foreground/20 rounded" />
                      <div className="h-2 w-14 bg-foreground/10 rounded mt-1" />
                    </div>
                    <span className="text-xs text-chart-3 font-medium">+31%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-8">
            Trusted by leading companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {trustedBy.map((company) => (
              <span key={company} className="text-xl font-bold text-muted-foreground">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl bg-gradient-to-br from-primary to-accent p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
                Ready to transform your data?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80 max-w-xl mx-auto">
                Join thousands of data scientists who are already using DataForge to unlock insights from their data.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/dashboard">
                  <Button size="lg" variant="secondary" className="h-12 px-8 text-base shadow-xl">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/chatbot">
                  <Button size="lg" variant="ghost" className="h-12 px-8 text-base text-primary-foreground hover:bg-primary-foreground/10">
                    Talk to AI
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Database className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">DataForge</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 DataForge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
