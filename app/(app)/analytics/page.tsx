"use client"

import { motion } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  ArrowUp,
  Flame,
  Trophy,
  Brain,
  Sparkles,
  Calendar
} from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from "recharts"

const weeklyProgress = [
  { day: "Mon", problems: 8, hours: 2.5 },
  { day: "Tue", problems: 12, hours: 3.2 },
  { day: "Wed", problems: 6, hours: 1.8 },
  { day: "Thu", problems: 15, hours: 4.0 },
  { day: "Fri", problems: 10, hours: 2.8 },
  { day: "Sat", problems: 18, hours: 4.5 },
  { day: "Sun", problems: 14, hours: 3.5 }
]

const monthlyProgress = [
  { week: "Week 1", mastery: 45, problems: 35 },
  { week: "Week 2", mastery: 52, problems: 42 },
  { week: "Week 3", mastery: 58, problems: 38 },
  { week: "Week 4", mastery: 68, problems: 55 }
]

const topicMastery = [
  { name: "Arrays & Hashing", mastery: 85, solved: 45, total: 53 },
  { name: "Two Pointers", mastery: 78, solved: 25, total: 32 },
  { name: "Sliding Window", mastery: 72, solved: 18, total: 25 },
  { name: "Stack", mastery: 65, solved: 20, total: 31 },
  { name: "Binary Search", mastery: 55, solved: 22, total: 40 },
  { name: "Trees", mastery: 42, solved: 18, total: 43 },
  { name: "Graphs", mastery: 35, solved: 12, total: 34 },
  { name: "Dynamic Programming", mastery: 28, solved: 15, total: 54 }
]

const stats = [
  { label: "Problems Solved", value: "114", subtext: "/454", icon: Target, trend: "+18 this week" },
  { label: "Study Hours", value: "156", subtext: "hrs", icon: Clock, trend: "+12 this week" },
  { label: "Current Streak", value: "12", subtext: "days", icon: Flame, trend: "Personal best!" },
  { label: "Global Rank", value: "#247", subtext: "", icon: Trophy, trend: "Top 5%" }
]

const difficultyStats = {
  easy: { solved: 85, total: 133 },
  medium: { solved: 28, total: 184 },
  hard: { solved: 1, total: 137 }
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg text-sm">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-muted-foreground">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

function getMasteryColor(mastery: number) {
  if (mastery >= 70) return "bg-success"
  if (mastery >= 50) return "bg-warning"
  return "bg-destructive"
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between h-14 px-6">
          <h1 className="text-lg font-semibold">Analytics</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Last 30 days
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4 bg-card border-border">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-success">
                    <ArrowUp className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="text-muted-foreground text-sm">{stat.subtext}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                <p className="text-xs text-success mt-1">{stat.trend}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Difficulty Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="p-5 bg-card border-border">
            <h3 className="font-semibold mb-4 text-sm">Difficulty Breakdown</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-success/10 border border-success/20 text-center">
                <p className="text-2xl font-bold text-success">{difficultyStats.easy.solved}</p>
                <p className="text-xs text-muted-foreground">/{difficultyStats.easy.total} Easy</p>
                <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-success"
                    style={{ width: `${(difficultyStats.easy.solved / difficultyStats.easy.total) * 100}%` }}
                  />
                </div>
              </div>
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20 text-center">
                <p className="text-2xl font-bold text-warning">{difficultyStats.medium.solved}</p>
                <p className="text-xs text-muted-foreground">/{difficultyStats.medium.total} Medium</p>
                <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-warning"
                    style={{ width: `${(difficultyStats.medium.solved / difficultyStats.medium.total) * 100}%` }}
                  />
                </div>
              </div>
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
                <p className="text-2xl font-bold text-destructive">{difficultyStats.hard.solved}</p>
                <p className="text-xs text-muted-foreground">/{difficultyStats.hard.total} Hard</p>
                <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-destructive"
                    style={{ width: `${(difficultyStats.hard.solved / difficultyStats.hard.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Weekly Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="p-5 bg-card border-border">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm">Weekly Activity</h3>
              </div>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyProgress} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                    <Bar dataKey="problems" name="Problems" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Mastery Growth */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-5 bg-card border-border">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm">Mastery Growth</h3>
              </div>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyProgress}>
                    <defs>
                      <linearGradient id="masteryGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="mastery"
                      name="Mastery %"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#masteryGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Topic Mastery */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-6"
        >
          <Card className="p-5 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm">Topic Mastery</h3>
            </div>
            <div className="space-y-3">
              {topicMastery.map((topic, index) => (
                <div key={topic.name} className="flex items-center gap-4">
                  <div className="w-40 truncate text-sm">{topic.name}</div>
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${topic.mastery}%` }}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.05 }}
                        className={`h-full ${getMasteryColor(topic.mastery)}`}
                      />
                    </div>
                    <span className="w-10 text-sm text-right font-medium">{topic.mastery}%</span>
                    <span className="w-16 text-xs text-muted-foreground text-right">
                      {topic.solved}/{topic.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* AI Insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-5 bg-accent/5 border-accent/20">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">AI Analysis</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {"You're"} making great progress on Arrays and Two Pointers! Your peak productivity is between 8-10 PM. 
                  <span className="text-foreground font-medium"> Focus recommendation:</span> Spend more time on Dynamic Programming - {"it's"} your weakest area but crucial for interviews. 
                  Try solving 2 DP problems daily for the next two weeks.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
