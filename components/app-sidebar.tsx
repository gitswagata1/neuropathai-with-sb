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
  Flame,
  Trophy,
  Crown
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
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-50"
    >
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold whitespace-nowrap"
            >
              NeuroPath AI
            </motion.span>
          )}
        </Link>
        <button
          onClick={onToggle}
          className="w-7 h-7 rounded-md bg-sidebar-accent flex items-center justify-center hover:bg-sidebar-accent/80 transition-colors"
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Stats Card */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-3 mt-3 p-3 rounded-lg bg-secondary/50 border border-border"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">12</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-warning" />
              <span className="text-sm font-semibold">#247</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>114/454 solved</span>
            <span className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-[25%] bg-primary rounded-full" />
            </span>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all relative group",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg border border-border">
                  {item.name}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Pro Card */}
      {!collapsed && (
        <div className="mx-3 mb-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">Upgrade to Plus</span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            Unlock all problems and AI features
          </p>
          <button className="w-full py-2 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            Upgrade Now
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-sidebar-border p-2 space-y-1">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors",
            pathname === "/settings" 
              ? "bg-sidebar-accent text-sidebar-accent-foreground" 
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          )}
        >
          <Settings className="w-[18px] h-[18px] shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
        </Link>
      </div>
    </motion.aside>
  )
}
