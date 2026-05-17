"use client"

import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 bg-card/50 backdrop-blur-sm px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-6" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-lg font-semibold">{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {description && (
            <span className="hidden md:block text-sm text-muted-foreground ml-4">
              {description}
            </span>
          )}
        </header>
        <main className="flex-1 overflow-auto p-6 bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
