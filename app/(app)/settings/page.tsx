"use client"

import { motion } from "framer-motion"
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Mail,
  Smartphone
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const settingsSections = [
  {
    title: "Profile",
    icon: User,
    items: [
      { label: "Full Name", value: "Alex Thompson", type: "text" },
      { label: "Email", value: "alex@example.com", type: "email" },
      { label: "Username", value: "@alexcodes", type: "text" }
    ]
  }
]

const preferences = [
  {
    icon: Bell,
    title: "Notifications",
    description: "Manage your notification preferences",
    enabled: true
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description: "Always use dark theme",
    enabled: true
  },
  {
    icon: Mail,
    title: "Email Updates",
    description: "Receive weekly progress reports",
    enabled: true
  },
  {
    icon: Smartphone,
    title: "Mobile Notifications",
    description: "Push notifications on mobile",
    enabled: false
  }
]

export default function SettingsPage() {
  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-primary" />
              <h2 className="font-semibold">Profile Information</h2>
            </div>
            
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground">
                AT
              </div>
              <div>
                <Button variant="outline" className="rounded-xl mb-2">
                  Change Avatar
                </Button>
                <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB</p>
              </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input 
                  defaultValue="Alex Thompson" 
                  className="h-11 rounded-xl bg-secondary/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <Input 
                  defaultValue="@alexcodes" 
                  className="h-11 rounded-xl bg-secondary/50 border-border/50"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Email</label>
                <Input 
                  type="email"
                  defaultValue="alex@example.com" 
                  className="h-11 rounded-xl bg-secondary/50 border-border/50"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button className="rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Save Changes
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-5 h-5 text-primary" />
              <h2 className="font-semibold">Preferences</h2>
            </div>
            
            <div className="space-y-4">
              {preferences.map((pref, index) => (
                <div 
                  key={pref.title}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                      <pref.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{pref.title}</h3>
                      <p className="text-xs text-muted-foreground">{pref.description}</p>
                    </div>
                  </div>
                  <button
                    className={`w-12 h-7 rounded-full transition-colors relative ${
                      pref.enabled ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${
                        pref.enabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="font-semibold">Security</h2>
            </div>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-sm">Change Password</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-sm">Two-Factor Authentication</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-sm">Active Sessions</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </Card>
        </motion.div>

        {/* Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="p-6 bg-gradient-to-br from-accent/20 to-primary/20 border-accent/30">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-accent" />
              <h2 className="font-semibold">Subscription</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              You are currently on the <span className="text-foreground font-medium">Free Plan</span>
            </p>
            <Button className="rounded-xl bg-accent text-accent-foreground hover:opacity-90">
              Upgrade to Pro
            </Button>
          </Card>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-card border-destructive/30">
            <div className="flex items-center gap-3 mb-4">
              <LogOut className="w-5 h-5 text-destructive" />
              <h2 className="font-semibold text-destructive">Danger Zone</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive" className="rounded-xl">
              Delete Account
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
