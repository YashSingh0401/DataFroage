"use client"

import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Upload,
  MessageSquare,
  TrendingUp,
  Database,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react"
import Link from "next/link"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const areaData: { name: string; datasets: number; queries: number }[] = []

const barData: { name: string; count: number }[] = []

const pieData: { name: string; value: number; color: string }[] = []

const stats = [
  {
    title: "Total Datasets",
    value: "0",
    change: "--",
    trend: "up" as const,
    icon: Database,
  },
  {
    title: "AI Queries",
    value: "0",
    change: "--",
    trend: "up" as const,
    icon: MessageSquare,
  },
  {
    title: "Reports Generated",
    value: "0",
    change: "--",
    trend: "up" as const,
    icon: FileText,
  },
  {
    title: "Analysis Complete",
    value: "0%",
    change: "--",
    trend: "up" as const,
    icon: BarChart3,
  },
]

const recentDatasets: { name: string; size: string; rows: string; status: string }[] = []

const quickActions = [
  { title: "Upload Dataset", icon: Upload, href: "/upload", color: "from-primary to-accent" },
  { title: "Start Analysis", icon: BarChart3, href: "/analysis", color: "from-accent to-chart-3" },
  { title: "Ask AI", icon: MessageSquare, href: "/chatbot", color: "from-chart-3 to-primary" },
]

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard" description="Welcome back! Here&apos;s your data overview.">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                      <div className={`flex items-center gap-1 mt-2 text-sm ${stat.trend === "up" ? "text-chart-3" : "text-destructive"}`}>
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        <span>{stat.change}</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <Link href={action.href}>
                <Card className="group cursor-pointer hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}>
                      <action.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold group-hover:text-primary transition-colors">{action.title}</p>
                      <p className="text-sm text-muted-foreground">Click to get started</p>
                    </div>
                    <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Activity Overview</CardTitle>
                <Button variant="outline" size="sm">
                  This Week
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={areaData}>
                      <defs>
                        <linearGradient id="colorDatasets" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="datasets"
                        stroke="hsl(var(--chart-1))"
                        fillOpacity={1}
                        fill="url(#colorDatasets)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="queries"
                        stroke="hsl(var(--chart-2))"
                        fillOpacity={1}
                        fill="url(#colorQueries)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Analysis Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Dataset Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Datasets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Recent Datasets</CardTitle>
                <Link href="/upload">
                  <Button variant="ghost" size="sm" className="text-primary">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {recentDatasets.length > 0 ? (
                  <div className="space-y-4">
                    {recentDatasets.map((dataset, i) => (
                      <motion.div
                        key={dataset.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                            <Database className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{dataset.name}</p>
                            <p className="text-xs text-muted-foreground">{dataset.size} • {dataset.rows} rows</p>
                          </div>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          dataset.status === "Analyzed" 
                            ? "bg-chart-3/10 text-chart-3" 
                            : dataset.status === "Processing"
                            ? "bg-chart-1/10 text-chart-1"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {dataset.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3">
                      <Database className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">No datasets uploaded yet</p>
                    <Link href="/upload">
                      <Button variant="link" size="sm" className="mt-2">
                        Upload your first dataset
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
