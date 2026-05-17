"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Upload,
  BarChart3,
  MessageSquare,
  Search,
  FileText,
  Settings,
  LogOut,
  Database,
  Sparkles,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Upload Dataset", url: "/upload", icon: Upload },
  { title: "Dataset Analysis", url: "/analysis", icon: BarChart3 },
  { title: "AI Chatbot", url: "/chatbot", icon: MessageSquare },
  { title: "Kaggle Search", url: "/kaggle", icon: Search },
  { title: "Reports", url: "/reports", icon: FileText },
]

const secondaryNavItems = [
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25"
          >
            <Database className="h-5 w-5 text-primary-foreground" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight">DataForge</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              AI-Powered
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="relative"
                    >
                      <Link href={item.url} className="flex items-center gap-3 px-3 py-2.5">
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 rounded-lg bg-sidebar-accent"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                        <item.icon className={`relative h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                        <span className={`relative ${isActive ? "font-medium text-sidebar-accent-foreground" : "text-muted-foreground"}`}>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url} className="flex items-center gap-3 px-3 py-2.5">
                        <item.icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                        <span className={isActive ? "font-medium" : "text-muted-foreground"}>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarSeparator className="mb-4" />
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-primary/20">
            <AvatarImage src="https://avatar.vercel.sh/dataforge" alt="User" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-medium truncate">John Doe</span>
            <span className="text-xs text-muted-foreground truncate">john@example.com</span>
          </div>
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-sidebar-accent text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </motion.button>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
