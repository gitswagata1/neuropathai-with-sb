"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Brain,
  LayoutDashboard,
  BookOpen,
  Code,
  BarChart3,
  Network,
  Settings,
  LogOut,
  ChevronLeft,
  Sparkles,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Learning", href: "/learning", icon: BookOpen },
  { name: "Code Tutor", href: "/code-tutor", icon: Code },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Knowledge Graph", href: "/knowledge-graph", icon: Network },
]

interface AppSidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function AppSidebar({ collapsed = false, onToggle }: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-50"
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold whitespace-nowrap"
            >
              NeuroPath AI
            </motion.span>
          )}
        </Link>
        <button
          onClick={onToggle}
          className="w-8 h-8 rounded-lg bg-sidebar-accent flex items-center justify-center hover:bg-sidebar-accent/80 transition-colors"
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* AI Status Card */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI Insights Ready</span>
          </div>
          <p className="text-xs text-muted-foreground">
            3 new suggestions based on your progress
          </p>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-sidebar-primary rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon className={cn("w-5 h-5 shrink-0 relative z-10", isActive && "text-sidebar-primary-foreground")} />
              {!collapsed && (
                <span className="font-medium relative z-10">{item.name}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Upgrade Card */}
      {!collapsed && (
        <div className="mx-4 mb-4 p-4 rounded-2xl bg-gradient-to-br from-accent/30 to-primary/30 border border-accent/30">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-bold">Upgrade to Pro</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Unlock unlimited AI tutoring sessions
          </p>
          <button className="w-full py-2 px-4 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            Upgrade Now
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3 space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <Settings className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-medium">Settings</span>}
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-medium">Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  )
}
