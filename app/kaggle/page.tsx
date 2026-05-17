"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Download,
  ExternalLink,
  Database,
  Star,
  FileText,
  Filter,
  SortAsc,
  Sparkles,
} from "lucide-react"

interface KaggleDataset {
  id: string
  title: string
  author: string
  downloads: string
  upvotes: number
  usability: number
  size: string
  fileTypes: string[]
  tags: string[]
  description: string
  lastUpdated: string
}

const categories = [
  "All Categories",
  "Machine Learning",
  "Business",
  "Finance",
  "Entertainment",
  "Social Science",
  "Health",
]

const sortOptions = [
  { value: "relevance", label: "Most Relevant" },
  { value: "downloads", label: "Most Downloads" },
  { value: "votes", label: "Most Upvotes" },
  { value: "recent", label: "Recently Updated" },
]

export default function KagglePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("relevance")
  const [isSearching, setIsSearching] = useState(false)
  const [datasets, setDatasets] = useState<KaggleDataset[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    setIsSearching(true)
    setHasSearched(true)
    // In production, this would call the Kaggle API
    setTimeout(() => {
      setDatasets([]) // No results until real API is connected
      setIsSearching(false)
    }, 800)
  }

  return (
    <DashboardLayout title="Kaggle Dataset Search" description="Discover and import datasets from Kaggle">
      <div className="space-y-6">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search datasets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-10 h-12"
                  />
                </div>
                <div className="flex gap-3">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-44 h-12">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-44 h-12">
                      <SortAsc className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleSearch}
                    className="h-12 px-6 bg-gradient-to-r from-primary to-accent"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dataset Grid */}
        <div className="grid gap-4">
          <AnimatePresence mode="wait">
            {isSearching ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Search className="h-5 w-5" />
                  </motion.div>
                  Searching Kaggle...
                </div>
              </motion.div>
            ) : (
              datasets.map((dataset, i) => (
                <motion.div
                  key={dataset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0">
                              <Database className="h-6 w-6 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                                  {dataset.title}
                                </h3>
                                <Badge variant="secondary" className="text-xs">
                                  {dataset.usability.toFixed(1)} Usability
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                by {dataset.author} • Updated {dataset.lastUpdated}
                              </p>
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                {dataset.description}
                              </p>
                              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Download className="h-4 w-4" />
                                  {dataset.downloads}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-chart-4" />
                                  {dataset.upvotes.toLocaleString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <FileText className="h-4 w-4" />
                                  {dataset.size}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-3">
                                {dataset.tags.slice(0, 4).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {dataset.fileTypes.map((type) => (
                                  <Badge key={type} className="text-xs bg-primary/10 text-primary hover:bg-primary/20">
                                    {type}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex lg:flex-col gap-2 shrink-0">
                          <Button className="flex-1 lg:w-32 bg-gradient-to-r from-primary to-accent">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Import
                          </Button>
                          <Button variant="outline" className="flex-1 lg:w-32">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {!isSearching && datasets.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">
              {hasSearched ? "No datasets found" : "Search for datasets"}
            </h3>
            <p className="text-muted-foreground mt-1">
              {hasSearched 
                ? "Try adjusting your search terms or filters"
                : "Enter a search query above to discover datasets from Kaggle"}
            </p>
          </motion.div>
        )}

        {/* Load More */}
        {datasets.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center pt-4"
          >
            <Button variant="outline" className="px-8">
              Load More Datasets
            </Button>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  )
}
