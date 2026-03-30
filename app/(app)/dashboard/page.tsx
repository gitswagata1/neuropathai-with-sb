"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Clock,
  Flame,
  Target,
  Play,
  Shuffle,
  Search,
  Command,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const dsaSheet = [
  {
    id: 1,
    title: "Learn the basics",
    total: 31,
    completed: 28,
    problems: [
      { title: "Things to Know in C++/Java/Python", difficulty: "Easy", status: "completed", article: true, video: true },
      { title: "Time Complexity", difficulty: "Easy", status: "completed", article: true, video: true },
      { title: "Space Complexity", difficulty: "Easy", status: "completed", article: true, video: false },
      { title: "Basic Input/Output", difficulty: "Easy", status: "completed", article: true, video: true },
      { title: "Pattern Problems", difficulty: "Easy", status: "in-progress", article: true, video: true }
    ]
  },
  {
    id: 2,
    title: "Learn Important Sorting Techniques",
    total: 7,
    completed: 7,
    problems: [
      { title: "Selection Sort", difficulty: "Easy", status: "completed", article: true, video: true },
      { title: "Bubble Sort", difficulty: "Easy", status: "completed", article: true, video: true },
      { title: "Insertion Sort", difficulty: "Easy", status: "completed", article: true, video: true },
      { title: "Merge Sort", difficulty: "Medium", status: "completed", article: true, video: true },
      { title: "Quick Sort", difficulty: "Medium", status: "completed", article: true, video: true }
    ]
  },
  {
    id: 3,
    title: "Solve Problems on Arrays [Easy -> Medium -> Hard]",
    total: 40,
    completed: 22,
    problems: [
      { title: "Largest Element in Array", difficulty: "Easy", status: "completed", article: true, video: true },
      { title: "Second Largest Element", difficulty: "Easy", status: "completed", article: true, video: true },
      { title: "Check if Array Is Sorted", difficulty: "Easy", status: "completed", article: true, video: false },
      { title: "Remove Duplicates from Sorted Array", difficulty: "Easy", status: "completed", article: true, video: true },
      { title: "Two Sum Problem", difficulty: "Medium", status: "in-progress", article: true, video: true }
    ]
  },
  {
    id: 4,
    title: "Binary Search [1D, 2D Arrays, Search Space]",
    total: 32,
    completed: 15,
    problems: [
      { title: "Binary Search to find X in sorted array", difficulty: "Easy", status: "completed", article: true, video: true },
      { title: "Lower Bound", difficulty: "Easy", status: "completed", article: true, video: true },
      { title: "Upper Bound", difficulty: "Easy", status: "completed", article: true, video: false },
      { title: "Search Insert Position", difficulty: "Easy", status: "in-progress", article: true, video: true },
      { title: "Floor/Ceil in Sorted Array", difficulty: "Medium", status: "todo", article: true, video: true }
    ]
  },
  {
    id: 5,
    title: "Strings [Basic and Medium]",
    total: 15,
    completed: 8,
    problems: []
  },
  {
    id: 6,
    title: "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]",
    total: 31,
    completed: 12,
    problems: []
  },
  {
    id: 7,
    title: "Recursion [PatternWise]",
    total: 25,
    completed: 5,
    problems: []
  },
  {
    id: 8,
    title: "Bit Manipulation [Concepts & Problems]",
    total: 18,
    completed: 3,
    problems: []
  },
  {
    id: 9,
    title: "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack]",
    total: 30,
    completed: 8,
    problems: []
  },
  {
    id: 10,
    title: "Sliding Window & Two Pointer Combined Problems",
    total: 12,
    completed: 4,
    problems: []
  },
  {
    id: 11,
    title: "Heaps [Learning, Medium, Hard Problems]",
    total: 17,
    completed: 2,
    problems: []
  },
  {
    id: 12,
    title: "Greedy Algorithms [Easy, Medium/Hard]",
    total: 16,
    completed: 0,
    problems: []
  },
  {
    id: 13,
    title: "Binary Trees [Traversals, Medium and Hard Problems]",
    total: 39,
    completed: 0,
    problems: []
  },
  {
    id: 14,
    title: "Binary Search Trees [Concept and Problems]",
    total: 16,
    completed: 0,
    problems: []
  },
  {
    id: 15,
    title: "Graphs [Concepts & Problems]",
    total: 53,
    completed: 0,
    problems: []
  },
  {
    id: 16,
    title: "Dynamic Programming [Patterns and Problems]",
    total: 56,
    completed: 0,
    problems: []
  },
  {
    id: 17,
    title: "Tries",
    total: 7,
    completed: 0,
    problems: []
  },
  {
    id: 18,
    title: "Advanced Strings",
    total: 9,
    completed: 0,
    problems: []
  }
]

const totalProblems = dsaSheet.reduce((acc, section) => acc + section.total, 0)
const completedProblems = dsaSheet.reduce((acc, section) => acc + section.completed, 0)
const progressPercentage = Math.round((completedProblems / totalProblems) * 100)

const difficultyStats = {
  easy: { total: 133, completed: 85 },
  medium: { total: 184, completed: 28 },
  hard: { total: 137, completed: 1 }
}

export default function DashboardPage() {
  const [expandedSections, setExpandedSections] = useState<number[]>([1, 3])
  const [searchQuery, setSearchQuery] = useState("")
  const [showCommandPalette, setShowCommandPalette] = useState(false)

  const toggleSection = (id: number) => {
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center justify-between h-14 px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">{"Striver's"} A2Z Sheet</h1>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
              Last updated: Today
            </span>
          </div>
          
          {/* Search */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowCommandPalette(true)}
              className="flex items-center gap-2 h-9 px-3 bg-secondary rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search for a problem...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 bg-muted px-1.5 py-0.5 rounded text-xs">
                <Command className="w-3 h-3" />K
              </kbd>
            </button>
            <Link href="/learning">
              <Button size="sm" className="h-9 bg-primary text-primary-foreground hover:bg-primary/90">
                <Shuffle className="w-4 h-4 mr-2" />
                Random Problem
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Progress Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-card rounded-xl border border-border">
            {/* Overall Progress Circle */}
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24">
                <svg className="progress-ring w-24 h-24">
                  <circle
                    className="text-secondary"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="48"
                    cy="48"
                  />
                  <circle
                    className="text-primary"
                    strokeWidth="8"
                    strokeDasharray={`${progressPercentage * 2.51} 251`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="48"
                    cy="48"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">{progressPercentage}%</span>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Overall Progress</p>
                <p className="text-2xl font-bold">{completedProblems}/{totalProblems}</p>
                <p className="text-xs text-muted-foreground mt-1">Problems solved</p>
              </div>
            </div>

            {/* Difficulty Stats */}
            <div className="flex gap-4">
              <div className="text-center px-6 py-3 bg-success/10 rounded-lg border border-success/20">
                <p className="text-sm text-muted-foreground mb-1">Easy</p>
                <p className="text-xl font-bold text-success">{difficultyStats.easy.completed}/{difficultyStats.easy.total}</p>
              </div>
              <div className="text-center px-6 py-3 bg-warning/10 rounded-lg border border-warning/20">
                <p className="text-sm text-muted-foreground mb-1">Medium</p>
                <p className="text-xl font-bold text-warning">{difficultyStats.medium.completed}/{difficultyStats.medium.total}</p>
              </div>
              <div className="text-center px-6 py-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-sm text-muted-foreground mb-1">Hard</p>
                <p className="text-xl font-bold text-destructive">{difficultyStats.hard.completed}/{difficultyStats.hard.total}</p>
              </div>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-3 px-4 py-3 bg-primary/10 rounded-lg border border-primary/20">
              <Flame className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Insight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-xl flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">AI Recommendation</p>
            <p className="text-sm text-muted-foreground">
              Based on your progress, you should focus on <span className="text-foreground font-medium">Binary Search</span> next. 
              You have strong array fundamentals to build on.
            </p>
          </div>
          <Link href="/learning">
            <Button size="sm" variant="outline" className="shrink-0">
              Start Now
            </Button>
          </Link>
        </motion.div>

        {/* DSA Sheet Sections */}
        <div className="space-y-2">
          {dsaSheet.map((section, index) => {
            const isExpanded = expandedSections.includes(section.id)
            const sectionProgress = section.total > 0 ? Math.round((section.completed / section.total) * 100) : 0
            
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors text-left"
                >
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                    section.completed === section.total ? "bg-success text-success-foreground" : "bg-secondary"
                  }`}>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground font-medium">{section.id}.</span>
                      <h3 className="font-medium truncate">{section.title}</h3>
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 w-32">
                      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${
                            sectionProgress === 100 ? "bg-success" : "bg-primary"
                          }`}
                          style={{ width: `${sectionProgress}%` }}
                        />
                      </div>
                    </div>
                    <span className={`text-sm font-medium tabular-nums ${
                      section.completed === section.total ? "text-success" : "text-muted-foreground"
                    }`}>
                      {section.completed}/{section.total}
                    </span>
                  </div>
                </button>

                {/* Section Content */}
                <AnimatePresence>
                  {isExpanded && section.problems.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border">
                        {/* Table Header */}
                        <div className="grid grid-cols-[1fr,auto,auto,auto,auto] gap-4 px-4 py-2 bg-secondary/30 text-xs text-muted-foreground font-medium">
                          <span className="pl-10">Problem</span>
                          <span className="w-20 text-center">Difficulty</span>
                          <span className="w-16 text-center">Article</span>
                          <span className="w-16 text-center">Video</span>
                          <span className="w-20 text-center">Status</span>
                        </div>
                        
                        {/* Problems */}
                        {section.problems.map((problem, pIndex) => (
                          <Link
                            key={pIndex}
                            href="/learning"
                            className="grid grid-cols-[1fr,auto,auto,auto,auto] gap-4 items-center px-4 py-3 hover:bg-secondary/30 transition-colors border-t border-border/50"
                          >
                            <div className="flex items-center gap-3 pl-2 min-w-0">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                problem.status === "completed" 
                                  ? "bg-success" 
                                  : problem.status === "in-progress"
                                  ? "bg-primary"
                                  : "border border-muted-foreground"
                              }`}>
                                {problem.status === "completed" && <CheckCircle2 className="w-3 h-3 text-white" />}
                                {problem.status === "in-progress" && <Play className="w-2.5 h-2.5 text-white" />}
                              </div>
                              <span className="truncate">{problem.title}</span>
                            </div>
                            <span className={`w-20 text-center text-xs px-2 py-1 rounded-full ${
                              problem.difficulty === "Easy" 
                                ? "badge-easy" 
                                : problem.difficulty === "Medium" 
                                ? "badge-medium" 
                                : "badge-hard"
                            }`}>
                              {problem.difficulty}
                            </span>
                            <div className="w-16 flex justify-center">
                              {problem.article && (
                                <FileText className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                              )}
                            </div>
                            <div className="w-16 flex justify-center">
                              {problem.video && (
                                <Video className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
                              )}
                            </div>
                            <div className="w-20 flex justify-center">
                              <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {showCommandPalette && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-[20vh]"
            onClick={() => setShowCommandPalette(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for a command to run..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 p-0 h-auto text-base"
                  autoFocus
                />
                <kbd className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">ESC</kbd>
              </div>
              <div className="p-2 max-h-80 overflow-y-auto">
                <p className="px-3 py-2 text-xs text-muted-foreground font-medium">Suggestions</p>
                {["Two Sum", "Binary Search", "Merge Sort", "Valid Parentheses"].map((item, i) => (
                  <Link
                    key={i}
                    href="/learning"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                    onClick={() => setShowCommandPalette(false)}
                  >
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <span>{item}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
