"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Code,
  Play,
  ChevronRight,
  Lightbulb,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  Circle,
  Clock,
  Target,
  ArrowRight,
  Zap,
  HelpCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const topicContent = {
  title: "Binary Search Trees",
  subtitle: "Trees & Graphs",
  duration: "30 min",
  difficulty: "Medium",
  description: `A Binary Search Tree (BST) is a binary tree data structure where each node has at most two children, and for every node, all elements in the left subtree are smaller than the node, and all elements in the right subtree are larger.

Key properties:
• Left subtree contains only nodes with values less than the parent node
• Right subtree contains only nodes with values greater than the parent node  
• Both left and right subtrees must also be binary search trees
• No duplicate nodes (in standard BST)

Time Complexity:
• Search: O(log n) average, O(n) worst case
• Insert: O(log n) average, O(n) worst case
• Delete: O(log n) average, O(n) worst case

Space Complexity: O(n) for storing n nodes`,
  codeExample: `class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function search(root: TreeNode | null, target: number): TreeNode | null {
  if (!root || root.val === target) {
    return root;
  }
  
  if (target < root.val) {
    return search(root.left, target);
  }
  
  return search(root.right, target);
}

function insert(root: TreeNode | null, val: number): TreeNode {
  if (!root) {
    return new TreeNode(val);
  }
  
  if (val < root.val) {
    root.left = insert(root.left, val);
  } else {
    root.right = insert(root.right, val);
  }
  
  return root;
}`
}

const practiceProblems = [
  {
    id: 1,
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    status: "completed",
    time: "15 min"
  },
  {
    id: 2,
    title: "Search in a BST",
    difficulty: "Easy",
    status: "completed",
    time: "10 min"
  },
  {
    id: 3,
    title: "Insert into a BST",
    difficulty: "Medium",
    status: "in-progress",
    time: "20 min"
  },
  {
    id: 4,
    title: "Delete Node in a BST",
    difficulty: "Medium",
    status: "locked",
    time: "25 min"
  },
  {
    id: 5,
    title: "Kth Smallest Element in BST",
    difficulty: "Medium",
    status: "locked",
    time: "20 min"
  },
  {
    id: 6,
    title: "Convert BST to Greater Tree",
    difficulty: "Medium",
    status: "locked",
    time: "20 min"
  }
]

const aiButtons = [
  {
    id: "explain",
    label: "Explain Simply",
    icon: Lightbulb,
    description: "Get a simpler explanation"
  },
  {
    id: "generate",
    label: "Generate Problems",
    icon: Sparkles,
    description: "Create practice problems"
  },
  {
    id: "mistake",
    label: "Explain My Mistake",
    icon: HelpCircle,
    description: "Analyze your errors"
  }
]

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState<"learn" | "practice">("learn")
  const [showAiResponse, setShowAiResponse] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [selectedAiAction, setSelectedAiAction] = useState("")

  const handleAiAction = (actionId: string) => {
    setSelectedAiAction(actionId)
    setAiLoading(true)
    setTimeout(() => {
      setAiLoading(false)
      setShowAiResponse(true)
    }, 1500)
  }

  const completedCount = practiceProblems.filter(p => p.status === "completed").length

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Trees & Graphs</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Binary Search Trees</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{topicContent.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {topicContent.duration}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                topicContent.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-emerald-500/20 text-emerald-400"
              }`}>
                {topicContent.difficulty}
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                {completedCount}/{practiceProblems.length} problems
              </span>
            </div>
          </div>
          <div className="h-2 sm:w-48 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / practiceProblems.length) * 100}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex gap-2 p-1 bg-secondary/50 rounded-2xl w-fit">
              <button
                onClick={() => setActiveTab("learn")}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === "learn"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Learn
              </button>
              <button
                onClick={() => setActiveTab("practice")}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === "practice"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Code className="w-4 h-4" />
                Practice
              </button>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === "learn" ? (
              <motion.div
                key="learn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Explanation */}
                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Topic Explanation
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {topicContent.description}
                    </p>
                  </div>
                </Card>

                {/* Code Example */}
                <Card className="p-6 bg-card border-border/50 overflow-hidden">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-accent" />
                    Code Example
                  </h2>
                  <div className="relative">
                    <pre className="p-5 rounded-xl bg-[#0d1117] border border-border/50 overflow-x-auto text-sm">
                      <code className="text-emerald-400 font-mono">
                        {topicContent.codeExample}
                      </code>
                    </pre>
                  </div>
                </Card>

                {/* AI Actions */}
                <Card className="p-6 bg-gradient-to-br from-primary/10 via-card to-accent/10 border-primary/20">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Learning Assistant
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {aiButtons.map((btn) => (
                      <Button
                        key={btn.id}
                        variant="outline"
                        onClick={() => handleAiAction(btn.id)}
                        className="h-auto py-4 px-4 rounded-xl border-border/50 hover:border-primary hover:bg-primary/10 flex flex-col items-center gap-2"
                      >
                        <btn.icon className="w-5 h-5 text-primary" />
                        <span className="font-medium">{btn.label}</span>
                      </Button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {(aiLoading || showAiResponse) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4"
                      >
                        <div className="p-5 rounded-xl bg-background/50 border border-border/50">
                          {aiLoading ? (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                  <Sparkles className="w-4 h-4 text-primary" />
                                </motion.div>
                              </div>
                              <span className="text-muted-foreground">AI is thinking...</span>
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
                                  <Sparkles className="w-3 h-3 text-primary" />
                                </div>
                                <span className="font-medium text-sm">AI Response</span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {selectedAiAction === "explain" && 
                                  "Think of a BST like a guessing game! Start at the top. If your number is smaller, go left. If it's bigger, go right. Keep doing this until you find what you're looking for. It's like a super-efficient way to find things in a sorted list!"
                                }
                                {selectedAiAction === "generate" &&
                                  "Here are 3 practice problems for you:\n\n1. Given a BST, find the minimum value\n2. Check if a given tree is a valid BST\n3. Find the in-order successor of a node"
                                }
                                {selectedAiAction === "mistake" &&
                                  "Based on your recent submissions, I notice you often forget to handle the edge case when the tree is empty (null root). Always start your recursive functions with a base case check: if (!root) return..."
                                }
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="practice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 bg-card border-border/50">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Practice Problems
                  </h2>
                  <div className="space-y-3">
                    {practiceProblems.map((problem, index) => (
                      <motion.div
                        key={problem.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 rounded-xl border transition-all ${
                          problem.status === "locked"
                            ? "bg-secondary/30 border-border/30 opacity-50"
                            : problem.status === "completed"
                            ? "bg-emerald-500/10 border-emerald-500/30"
                            : "bg-secondary/50 border-border/50 hover:border-primary cursor-pointer"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            problem.status === "completed"
                              ? "bg-emerald-500"
                              : problem.status === "in-progress"
                              ? "bg-primary"
                              : "bg-secondary"
                          }`}>
                            {problem.status === "completed" ? (
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            ) : problem.status === "in-progress" ? (
                              <Play className="w-3 h-3 text-white" />
                            ) : (
                              <Circle className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{problem.title}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                problem.difficulty === "Easy"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : problem.difficulty === "Medium"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}>
                                {problem.difficulty}
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {problem.time}
                              </span>
                            </div>
                          </div>
                          {problem.status !== "locked" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="rounded-lg"
                            >
                              {problem.status === "completed" ? "Review" : "Solve"}
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-card border-border/50">
              <h3 className="font-semibold mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Topic Mastery</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-[65%] bg-gradient-to-r from-primary to-accent" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                  <div>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-xs text-muted-foreground">Problems Solved</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">2.5h</p>
                    <p className="text-xs text-muted-foreground">Time Spent</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Related Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="p-6 bg-card border-border/50">
              <h3 className="font-semibold mb-4">Related Topics</h3>
              <div className="space-y-2">
                {["AVL Trees", "Red-Black Trees", "Tree Traversals", "Heap"].map((topic, i) => (
                  <button
                    key={topic}
                    className="w-full p-3 rounded-xl bg-secondary/30 border border-border/50 hover:border-border text-left text-sm transition-colors flex items-center justify-between group"
                  >
                    <span>{topic}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* AI Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-gradient-to-br from-accent/20 to-primary/20 border-accent/30">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">AI Tip</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                You struggle with recursion base cases. When solving BST problems, always ask yourself: {'"'}What happens when root is null?{'"'}
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
