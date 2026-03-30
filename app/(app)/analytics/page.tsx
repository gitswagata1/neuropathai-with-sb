"use client"

import { motion } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  Calendar,
  ArrowUp,
  ArrowDown,
  Flame,
  Trophy,
  Brain,
  Zap
} from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
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
  { name: "Arrays", mastery: 85, problems: 45, color: "#22c55e" },
  { name: "Strings", mastery: 78, problems: 38, color: "#3b82f6" },
  { name: "Linked Lists", mastery: 72, problems: 25, color: "#3b82f6" },
  { name: "Trees", mastery: 55, problems: 30, color: "#eab308" },
  { name: "Graphs", mastery: 42, problems: 18, color: "#f97316" },
  { name: "DP", mastery: 35, problems: 22, color: "#ef4444" }
]

const difficultyBreakdown = [
  { name: "Easy", value: 85, color: "#22c55e" },
  { name: "Medium", value: 120, color: "#eab308" },
  { name: "Hard", value: 42, color: "#ef4444" }
]

const timeDistribution = [
  { hour: "6am", minutes: 0 },
  { hour: "8am", minutes: 15 },
  { hour: "10am", minutes: 45 },
  { hour: "12pm", minutes: 30 },
  { hour: "2pm", minutes: 20 },
  { hour: "4pm", minutes: 25 },
  { hour: "6pm", minutes: 40 },
  { hour: "8pm", minutes: 55 },
  { hour: "10pm", minutes: 35 }
]

const stats = [
  {
    label: "Total Problems",
    value: "247",
    change: "+18",
    trend: "up",
    icon: Target,
    color: "from-primary to-blue-400"
  },
  {
    label: "Study Hours",
    value: "156",
    change: "+12",
    trend: "up",
    icon: Clock,
    color: "from-emerald-500 to-teal-500"
  },
  {
    label: "Current Streak",
    value: "12",
    change: "+3",
    trend: "up",
    icon: Flame,
    color: "from-orange-500 to-red-500"
  },
  {
    label: "Avg. Mastery",
    value: "68%",
    change: "+5%",
    trend: "up",
    icon: Trophy,
    color: "from-accent to-purple-400"
  }
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Track your learning progress and identify areas for improvement
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Card className="p-5 bg-card border-border/50 hover:border-border transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                }`}>
                  {stat.trend === "up" ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Weekly Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Weekly Progress</h3>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Problems</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-muted-foreground">Hours</span>
                </div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyProgress} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  <Bar dataKey="problems" name="Problems" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="hours" name="Hours" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Difficulty Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="p-6 bg-card border-border/50 h-full">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Difficulty Breakdown</h3>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={difficultyBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {difficultyBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {difficultyBreakdown.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Mastery Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Mastery Growth</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyProgress}>
                  <defs>
                    <linearGradient id="masteryGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="mastery"
                    name="Mastery %"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#masteryGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Study Time Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Peak Study Hours</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeDistribution}>
                  <defs>
                    <linearGradient id="timeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="minutes"
                    name="Minutes"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="url(#timeGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Topic Mastery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 bg-card border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Topic Mastery</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Sorted by mastery</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topicMastery.map((topic, index) => (
              <motion.div
                key={topic.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + index * 0.05 }}
                className="p-4 rounded-xl bg-secondary/30 border border-border/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{topic.name}</h4>
                  <span className="text-sm font-semibold" style={{ color: topic.color }}>
                    {topic.mastery}%
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${topic.mastery}%` }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: topic.color }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{topic.problems} problems solved</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* AI Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <Card className="p-6 bg-gradient-to-br from-primary/10 via-card to-accent/10 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Based on your progress, you&apos;re making excellent strides in array manipulation and string problems. 
                Your peak productivity is between 8-10 PM. Consider dedicating more time to Dynamic Programming and Graph problems - 
                these are currently your weakest areas but are crucial for interview success. 
                Focus on at least 2 DP problems daily for the next two weeks.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
