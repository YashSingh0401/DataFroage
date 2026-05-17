"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Key,
  Mail,
  Save,
  Upload,
  Trash2,
  Moon,
  Sun,
  Monitor,
} from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    reports: false,
    marketing: false,
  })
  const [theme, setTheme] = useState("system")

  return (
    <DashboardLayout title="Settings" description="Manage your account and preferences">
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted/50 grid grid-cols-2 lg:grid-cols-5 h-auto p-1">
            <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-background">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2 data-[state=active]:bg-background">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2 data-[state=active]:bg-background">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2 data-[state=active]:bg-background">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2 data-[state=active]:bg-background">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Data</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details and profile picture</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20 border-4 border-primary/20">
                      <AvatarImage src="https://avatar.vercel.sh/dataforge" alt="User" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xl">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        JPG, GIF or PNG. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Form */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="email" type="email" defaultValue="john@example.com" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input id="bio" placeholder="Tell us about yourself..." />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-gradient-to-r from-primary to-accent">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to receive updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { key: "email", title: "Email Notifications", description: "Receive updates via email" },
                    { key: "push", title: "Push Notifications", description: "Browser push notifications" },
                    { key: "reports", title: "Weekly Reports", description: "Summary of your data activity" },
                    { key: "marketing", title: "Marketing", description: "News and product updates" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({ ...prev, [item.key]: checked }))
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how the app looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: "light", icon: Sun, label: "Light" },
                        { value: "dark", icon: Moon, label: "Dark" },
                        { value: "system", icon: Monitor, label: "System" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setTheme(option.value)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                            theme === option.value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <option.icon className={`h-6 w-6 ${theme === option.value ? "text-primary" : "text-muted-foreground"}`} />
                          <span className={`text-sm font-medium ${theme === option.value ? "text-primary" : ""}`}>
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="w-full sm:w-64">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password regularly for security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="currentPassword" type="password" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="newPassword" type="password" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="confirmPassword" type="password" className="pl-10" />
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-accent">
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div>
                      <p className="font-medium">Enable 2FA</p>
                      <p className="text-sm text-muted-foreground">
                        Use an authenticator app for additional security
                      </p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Export Data</CardTitle>
                  <CardDescription>Download all your data and reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">
                    <Database className="h-4 w-4 mr-2" />
                    Export All Data
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions for your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                    <div>
                      <p className="font-medium text-destructive">Delete Account</p>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
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
