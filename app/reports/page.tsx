"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Download,
  Share2,
  Calendar,
  Clock,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  BarChart3,
  PieChart,
  TrendingUp,
  Trash2,
  Eye,
  Edit,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Report {
  id: string
  title: string
  dataset: string
  createdAt: string
  lastModified: string
  status: "completed" | "draft" | "scheduled"
  type: "analysis" | "summary" | "visualization"
  views: number
}

const reports: Report[] = []

const templates = [
  {
    id: "1",
    title: "Sales Analysis Template",
    description: "Comprehensive sales metrics and trends",
    icon: TrendingUp,
    color: "from-chart-1 to-chart-2",
  },
  {
    id: "2",
    title: "Data Summary Template",
    description: "Quick overview of key statistics",
    icon: FileText,
    color: "from-chart-2 to-chart-3",
  },
  {
    id: "3",
    title: "Visual Dashboard",
    description: "Interactive charts and graphs",
    icon: BarChart3,
    color: "from-chart-3 to-chart-4",
  },
  {
    id: "4",
    title: "Comparison Report",
    description: "Side-by-side data comparison",
    icon: PieChart,
    color: "from-chart-4 to-chart-5",
  },
]

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.dataset.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = selectedTab === "all" || report.status === selectedTab
    return matchesSearch && matchesTab
  })

  const getStatusColor = (status: Report["status"]) => {
    switch (status) {
      case "completed":
        return "bg-chart-3/10 text-chart-3"
      case "draft":
        return "bg-chart-4/10 text-chart-4"
      case "scheduled":
        return "bg-primary/10 text-primary"
    }
  }

  const getTypeIcon = (type: Report["type"]) => {
    switch (type) {
      case "analysis":
        return BarChart3
      case "summary":
        return FileText
      case "visualization":
        return PieChart
    }
  }

  return (
    <DashboardLayout title="Reports" description="Generate and manage your analysis reports">
      <div className="space-y-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Create New Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {templates.map((template, i) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full h-auto p-4 flex flex-col items-start gap-3 hover:shadow-md transition-all group"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                        <template.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold group-hover:text-primary transition-colors">
                          {template.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {template.description}
                        </p>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reports List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-lg font-semibold">Your Reports</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button className="bg-gradient-to-r from-primary to-accent">
                    <Plus className="h-4 w-4 mr-2" />
                    New Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Reports</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="draft">Drafts</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                </TabsList>

                <TabsContent value={selectedTab} className="mt-0">
                  {filteredReports.length > 0 ? (
                    <div className="space-y-3">
                      {filteredReports.map((report, i) => {
                        const TypeIcon = getTypeIcon(report.type)
                        return (
                          <motion.div
                            key={report.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                              <TypeIcon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                                  {report.title}
                                </h3>
                                <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                                  {report.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <FileText className="h-3.5 w-3.5" />
                                  {report.dataset}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {report.createdAt}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  {report.lastModified}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Eye className="h-3.5 w-3.5" />
                                  {report.views} views
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <Download className="h-4 w-4 mr-2" />
                                Export
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold">No reports found</h3>
                      <p className="text-muted-foreground mt-1">
                        {searchQuery
                          ? "Try adjusting your search terms"
                          : "Create your first report to get started"}
                      </p>
                      <Button className="mt-4 bg-gradient-to-r from-primary to-accent">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Report
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
