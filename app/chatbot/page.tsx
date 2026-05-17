"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  Bot,
  User,
  Sparkles,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Database,
  BarChart3,
  FileText,
  Lightbulb,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const suggestedQueries = [
  { icon: Database, text: "What are the top 5 products by revenue?" },
  { icon: BarChart3, text: "Show me the sales trend for Q4 2024" },
  { icon: FileText, text: "Summarize the key insights from my dataset" },
  { icon: Lightbulb, text: "What patterns do you see in customer behavior?" },
]

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI data assistant. Upload a dataset first, then I can help you analyze it, answer questions about your data, generate visualizations, and provide insights. What would you like to know?",
    timestamp: new Date(),
  },
]

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response - in production, this would call an actual AI API
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I don't have any datasets loaded yet. Please upload a dataset first in the Upload section, then come back and I'll be able to analyze it and answer your questions!",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestedQuery = (query: string) => {
    setInput(query)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <DashboardLayout title="AI Chatbot" description="Ask questions about your data in natural language">
      <div className="h-[calc(100vh-10rem)] flex flex-col max-w-4xl mx-auto">
        {/* Chat Messages */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-6">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        message.role === "assistant"
                          ? "bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25"
                          : "bg-muted"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      ) : (
                        <User className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div
                      className={`flex-1 ${
                        message.role === "user" ? "text-right" : ""
                      }`}
                    >
                      <div
                        className={`inline-block max-w-[85%] p-4 rounded-2xl ${
                          message.role === "assistant"
                            ? "bg-muted/50 text-left"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {message.role === "assistant" && (
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-muted-foreground hover:text-foreground"
                            onClick={() => copyToClipboard(message.content)}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-muted-foreground hover:text-foreground"
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-muted-foreground hover:text-foreground"
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-muted-foreground hover:text-foreground"
                          >
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Regenerate
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
                      <Bot className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="bg-muted/50 rounded-2xl p-4">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 rounded-full bg-primary"
                        />
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 rounded-full bg-primary"
                        />
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 rounded-full bg-primary"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>

          {/* Suggested Queries */}
          {messages.length <= 1 && (
            <div className="p-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Suggested questions
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestedQueries.map((query, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleSuggestedQuery(query.text)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted text-left transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <query.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm">{query.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <CardContent className="p-4 border-t border-border/50">
            <div className="flex gap-3">
              <Input
                placeholder="Ask anything about your data..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                className="flex-1 h-12"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="h-12 px-6 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI can make mistakes. Verify important information.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
