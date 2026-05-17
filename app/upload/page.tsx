"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Cloud,
  HardDrive,
  Link as LinkIcon,
  FolderOpen,
  Sparkles,
} from "lucide-react"

interface UploadedFile {
  id: string
  name: string
  size: string
  progress: number
  status: "uploading" | "complete" | "error"
  type: string
}

const supportedFormats = [
  { name: "CSV", icon: FileText, color: "from-chart-1 to-chart-2" },
  { name: "JSON", icon: FileText, color: "from-chart-2 to-chart-3" },
  { name: "Excel", icon: FileText, color: "from-chart-3 to-chart-4" },
  { name: "Parquet", icon: FileText, color: "from-chart-4 to-chart-5" },
]

const uploadSources = [
  { name: "Local Files", icon: HardDrive, description: "Upload from your computer" },
  { name: "Cloud Storage", icon: Cloud, description: "Connect to S3, GCS, or Azure" },
  { name: "URL Import", icon: LinkIcon, description: "Import from a direct link" },
]

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [urlInput, setUrlInput] = useState("")

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const simulateUpload = (fileName: string, fileSize: string, fileType: string) => {
    const id = Math.random().toString(36).slice(2)
    const newFile: UploadedFile = {
      id,
      name: fileName,
      size: fileSize,
      progress: 0,
      status: "uploading",
      type: fileType,
    }
    setFiles((prev) => [...prev, newFile])

    // Simulate upload progress
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id === id && f.status === "uploading") {
            const newProgress = Math.min(f.progress + Math.random() * 20, 100)
            if (newProgress >= 100) {
              clearInterval(interval)
              return { ...f, progress: 100, status: "complete" }
            }
            return { ...f, progress: newProgress }
          }
          return f
        })
      )
    }, 300)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    droppedFiles.forEach((file) => {
      simulateUpload(file.name, `${(file.size / 1024 / 1024).toFixed(2)} MB`, file.type)
    })
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        simulateUpload(file.name, `${(file.size / 1024 / 1024).toFixed(2)} MB`, file.type)
      })
    }
  }

  const handleUrlImport = () => {
    if (urlInput.trim()) {
      const fileName = urlInput.split("/").pop() || "imported_file.csv"
      simulateUpload(fileName, "Unknown", "url-import")
      setUrlInput("")
    }
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <DashboardLayout title="Upload Dataset" description="Import your data for AI-powered analysis">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Upload Sources */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {uploadSources.map((source, i) => (
            <motion.div
              key={source.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="cursor-pointer hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:border-primary/50">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                    <source.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{source.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{source.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative p-12 border-2 border-dashed rounded-xl m-6 transition-all duration-300 ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/30"
                }`}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".csv,.json,.xlsx,.xls,.parquet"
                />
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    animate={isDragging ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg shadow-primary/25"
                  >
                    <Upload className="h-8 w-8 text-primary-foreground" />
                  </motion.div>
                  <h3 className="text-xl font-semibold">
                    {isDragging ? "Drop your files here" : "Drag & drop your datasets"}
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    or click to browse from your computer
                  </p>
                  <div className="flex items-center gap-4 mt-6">
                    {supportedFormats.map((format) => (
                      <div
                        key={format.name}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm"
                      >
                        <format.icon className="h-3.5 w-3.5" />
                        {format.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* URL Import */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-primary" />
                Import from URL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input
                  placeholder="https://example.com/dataset.csv"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleUrlImport} disabled={!urlInput.trim()}>
                  Import
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Uploaded Files */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-primary" />
                    Uploaded Files ({files.length})
                  </CardTitle>
                  {files.some((f) => f.status === "complete") && (
                    <Button className="bg-gradient-to-r from-primary to-accent">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Analyze All
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {files.map((file) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/50"
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          file.status === "complete"
                            ? "bg-chart-3/10"
                            : file.status === "error"
                            ? "bg-destructive/10"
                            : "bg-primary/10"
                        }`}>
                          {file.status === "complete" ? (
                            <CheckCircle2 className="h-5 w-5 text-chart-3" />
                          ) : file.status === "error" ? (
                            <AlertCircle className="h-5 w-5 text-destructive" />
                          ) : (
                            <FileText className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium truncate">{file.name}</p>
                            <span className="text-sm text-muted-foreground ml-2">{file.size}</span>
                          </div>
                          {file.status === "uploading" && (
                            <Progress value={file.progress} className="h-2" />
                          )}
                          {file.status === "complete" && (
                            <p className="text-sm text-chart-3">Upload complete</p>
                          )}
                          {file.status === "error" && (
                            <p className="text-sm text-destructive">Upload failed</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(file.id)}
                          className="shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {files.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-8 text-muted-foreground"
          >
            <p>No files uploaded yet. Start by dragging a file above or importing from a URL.</p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  )
}
