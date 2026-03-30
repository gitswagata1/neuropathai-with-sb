"use client"

import { motion } from "framer-motion"
import {
  Brain,
  Flame,
  Target,
  TrendingUp,
  Clock,
  BookOpen,
  Code,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Play,
  Zap,
  BarChart3
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const stats = [
  {
    label: "Current Streak",
    value: "12",
    unit: "days",
    icon: Flame,
    color: "from-orange-500 to-red-500",
    change: "+3 from last week"
  },
  {
    label: "Problems Solved",
    value: "247",
    unit: "total",
    icon: Target,
    color: "from-primary to-blue-400",
    change: "+18 this week"
  },
  {
    label: "Mastery Level",
    value: "68",
    unit: "%",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-500",
    change: "+5% from last month"
  },
  {
    label: "Study Time",
    value: "4.5",
    unit: "hrs/day",
    icon: Clock,
    color: "from-accent to-purple-400",
    change: "Above average"
  }
]

const masteryBars = [
  { topic: "Arrays & Hashing", mastery: 85, color: "bg-emerald-500" },
  { topic: "Two Pointers", mastery: 72, color: "bg-primary" },
  { topic: "Sliding Window", mastery: 68, color: "bg-primary" },
  { topic: "Stack", mastery: 55, color: "bg-yellow-500" },
  { topic: "Binary Search", mastery: 45, color: "bg-orange-500" },
  { topic: "Trees", mastery: 35, color: "bg-red-500" }
]

const continueItems = [
  {
    title: "Binary Search Trees",
    subtitle: "Trees & Graphs",
    progress: 65,
    problems: "8/12 completed",
    estimated: "30 min left"
  }
]

const weakAreas = [
  {
    topic: "Recursion Base Cases",
    insight: "You often miss edge cases in recursive solutions",
    icon: AlertCircle,
    severity: "high"
  },
  {
    topic: "Time Complexity Analysis",
    insight: "Practice analyzing nested loops",
    icon: AlertCircle,
    severity: "medium"
  },
  {
    topic: "Tree Traversal",
    insight: "Mix up pre-order and post-order patterns",
    icon: AlertCircle,
    severity: "medium"
  }
]

const todaysTasks = [
  {
    id: 1,
    title: "Complete Binary Search Practice",
    type: "Practice",
    duration: "25 min",
    difficulty: "Medium",
    completed: true
  },
  {
    id: 2,
    title: "Review: Two Sum Patterns",
    type: "Review",
    duration: "15 min",
    difficulty: "Easy",
    completed: true
  },
  {
    id: 3,
    title: "Learn: BST Insertion & Deletion",
    type: "Learn",
    duration: "20 min",
    difficulty: "Medium",
    completed: false
  },
  {
    id: 4,
    title: "Solve: Validate BST",
    type: "Practice",
    duration: "30 min",
    difficulty: "Medium",
    completed: false
  },
  {
    id: 5,
    title: "Daily Challenge: LRU Cache",
    type: "Challenge",
    duration: "45 min",
    difficulty: "Hard",
    completed: false
  }
]

const aiInsights = [
  {
    title: "Pattern Recognition",
    message: "You excel at array manipulation but struggle with recursive thinking. Focus on breaking down problems into smaller subproblems.",
    type: "insight"
  },
  {
    title: "Optimal Study Time",
    message: "Your best problem-solving hours are 9-11 AM. Consider scheduling harder topics during this window.",
    type: "recommendation"
  }
]

export default function DashboardPage() {
  const completedTasks = todaysTasks.filter(t => t.completed).length
  const totalTasks = todaysTasks.length

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, Alex</h1>
        <p className="text-muted-foreground">
          {"Here's"} your learning progress for today
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
                <span className="text-xs text-muted-foreground">{stat.change}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className="text-muted-foreground text-sm">{stat.unit}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Insight Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-gradient-to-br from-primary/10 via-card to-accent/10 border-primary/20 glow-blue">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold">AI Insights</h3>
                <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                  Updated 2h ago
                </span>
              </div>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="p-4 rounded-xl bg-background/50 border border-border/50">
                    <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">{insight.message}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Continue Learning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="p-6 bg-card border-border/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Continue Learning</h3>
                </div>
                <Link href="/learning" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              {continueItems.map((item, index) => (
                <div key={index} className="p-5 rounded-2xl bg-secondary/30 border border-border/50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {item.subtitle}
                      </span>
                      <h4 className="text-lg font-semibold mt-2">{item.title}</h4>
                    </div>
                    <Link href="/learning">
                      <Button className="rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90">
                        <Play className="w-4 h-4 mr-2" />
                        Resume
                      </Button>
                    </Link>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.problems}</span>
                      <span className="text-muted-foreground">{item.estimated}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </motion.div>

          {/* Mastery Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-card border-border/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Topic Mastery</h3>
                </div>
                <Link href="/analytics" className="text-sm text-primary hover:underline">
                  See details
                </Link>
              </div>
              <div className="space-y-4">
                {masteryBars.map((item, index) => (
                  <div key={item.topic}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{item.topic}</span>
                      <span className="text-muted-foreground">{item.mastery}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.mastery}%` }}
                        transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Today's Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card className="p-6 bg-card border-border/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold">{"Today's"} Plan</h3>
                </div>
                <span className="text-sm text-muted-foreground">
                  {completedTasks}/{totalTasks} done
                </span>
              </div>
              <div className="space-y-3">
                {todaysTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className={`p-4 rounded-xl border transition-colors ${
                      task.completed
                        ? "bg-secondary/30 border-border/30 opacity-60"
                        : "bg-secondary/50 border-border/50 hover:border-border"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        task.completed ? "border-emerald-500 bg-emerald-500" : "border-muted-foreground"
                      }`}>
                        {task.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium text-sm ${task.completed && "line-through"}`}>
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{task.type}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{task.duration}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                          <span className={`text-xs ${
                            task.difficulty === "Hard" ? "text-red-400" :
                            task.difficulty === "Medium" ? "text-yellow-400" : "text-emerald-400"
                          }`}>
                            {task.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Weak Areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-card border-border/50">
              <div className="flex items-center gap-2 mb-6">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <h3 className="font-semibold">Areas to Improve</h3>
              </div>
              <div className="space-y-4">
                {weakAreas.map((area, index) => (
                  <motion.div
                    key={area.topic}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + index * 0.05 }}
                    className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20"
                  >
                    <h4 className="font-medium text-sm mb-1">{area.topic}</h4>
                    <p className="text-xs text-muted-foreground">{area.insight}</p>
                  </motion.div>
                ))}
              </div>
              <Link href="/learning">
                <Button variant="outline" className="w-full mt-4 rounded-xl">
                  Practice Weak Areas
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
