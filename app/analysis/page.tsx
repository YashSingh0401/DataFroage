"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  PieChart as PieIcon,
  TrendingUp,
  Table,
  Download,
  Share2,
  Sparkles,
  Info,
  AlertTriangle,
  CheckCircle2,
  Database,
} from "lucide-react"
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
  ScatterChart,
  Scatter,
  LineChart,
  Line,
} from "recharts"

const datasets: { id: string; name: string; rows: number; columns: number }[] = []

const columnStats: { name: string; type: string; nulls: number; unique: number; mean: number | null }[] = []

const distributionData: { range: string; count: number }[] = []

const trendData: { month: string; value: number }[] = []

const correlationData: { x: number; y: number }[] = []

const categoryData: { name: string; value: number; color: string }[] = []

const insights: { type: string; message: string }[] = []

export default function AnalysisPage() {
  const [selectedDataset, setSelectedDataset] = useState("")

  if (datasets.length === 0) {
    return (
      <DashboardLayout title="Dataset Analysis" description="AI-powered insights and visualizations">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
            <Database className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No datasets to analyze</h2>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            Upload a dataset first to unlock AI-powered analysis, visualizations, and insights.
          </p>
          <Button asChild className="bg-gradient-to-r from-primary to-accent">
            <a href="/upload">
              <Sparkles className="h-4 w-4 mr-2" />
              Upload Dataset
            </a>
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Dataset Analysis" description="AI-powered insights and visualizations">
      <div className="space-y-6">
        {/* Dataset Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue placeholder="Select dataset" />
                    </SelectTrigger>
                    <SelectContent>
                      {datasets.map((ds) => (
                        <SelectItem key={ds.id} value={ds.id}>
                          {ds.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI Insights
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Rows", value: "15,234" },
            { label: "Columns", value: "12" },
            { label: "Missing Values", value: "17" },
            { label: "Data Quality", value: "98.9%" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI-Generated Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {insights.map((insight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      insight.type === "success"
                        ? "bg-chart-3/10"
                        : insight.type === "warning"
                        ? "bg-chart-5/10"
                        : "bg-primary/10"
                    }`}
                  >
                    {insight.type === "success" && <CheckCircle2 className="h-5 w-5 text-chart-3 shrink-0 mt-0.5" />}
                    {insight.type === "warning" && <AlertTriangle className="h-5 w-5 text-chart-5 shrink-0 mt-0.5" />}
                    {insight.type === "info" && <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />}
                    <p className="text-sm">{insight.message}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Visualizations */}
        <Tabs defaultValue="distribution" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="distribution" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Distribution
            </TabsTrigger>
            <TabsTrigger value="trends" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="correlation" className="gap-2">
              <PieIcon className="h-4 w-4" />
              Correlation
            </TabsTrigger>
            <TabsTrigger value="schema" className="gap-2">
              <Table className="h-4 w-4" />
              Schema
            </TabsTrigger>
          </TabsList>

          <TabsContent value="distribution">
            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Value Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={distributionData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Category Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
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
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                      {categoryData.map((item) => (
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
          </TabsContent>

          <TabsContent value="trends">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">Revenue Trend Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
                          dataKey="value"
                          stroke="hsl(var(--chart-1))"
                          fillOpacity={1}
                          fill="url(#colorValue)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="correlation">
            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Revenue vs Quantity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis type="number" dataKey="x" name="Quantity" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis type="number" dataKey="y" name="Revenue" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Scatter data={correlationData} fill="hsl(var(--chart-1))" />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Multi-Variable Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ fill: "hsl(var(--chart-1))" }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="schema">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold">Column Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Column</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nulls</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Unique</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Mean</th>
                        </tr>
                      </thead>
                      <tbody>
                        {columnStats.map((col, i) => (
                          <motion.tr
                            key={col.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                          >
                            <td className="py-3 px-4 font-medium">{col.name}</td>
                            <td className="py-3 px-4">
                              <Badge variant="secondary" className="font-mono text-xs">
                                {col.type}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <span className={col.nulls > 0 ? "text-chart-5" : "text-chart-3"}>
                                {col.nulls}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">{col.unique.toLocaleString()}</td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {col.mean !== null ? col.mean.toLocaleString() : "—"}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
