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
  CheckCircle2,
  Circle,
  Clock,
  Target,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Video,
  FileText,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

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
  { id: 1, title: "Validate Binary Search Tree", difficulty: "Medium", status: "completed", time: "15 min", acceptance: "32%" },
  { id: 2, title: "Search in a BST", difficulty: "Easy", status: "completed", time: "10 min", acceptance: "78%" },
  { id: 3, title: "Insert into a BST", difficulty: "Medium", status: "in-progress", time: "20 min", acceptance: "45%" },
  { id: 4, title: "Delete Node in a BST", difficulty: "Medium", status: "todo", time: "25 min", acceptance: "38%" },
  { id: 5, title: "Kth Smallest Element in BST", difficulty: "Medium", status: "todo", time: "20 min", acceptance: "42%" },
  { id: 6, title: "Convert BST to Greater Tree", difficulty: "Medium", status: "todo", time: "20 min", acceptance: "65%" }
]

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState<"learn" | "practice">("learn")
  const [showAiResponse, setShowAiResponse] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [selectedAiAction, setSelectedAiAction] = useState("")
  const [copied, setCopied] = useState(false)

  const handleAiAction = (actionId: string) => {
    setSelectedAiAction(actionId)
    setAiLoading(true)
    setShowAiResponse(false)
    setTimeout(() => {
      setAiLoading(false)
      setShowAiResponse(true)
    }, 1500)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(topicContent.codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const completedCount = practiceProblems.filter(p => p.status === "completed").length

  return (
    <div className="min-h-screen">
      {/* Top Navigation */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between h-14 px-6">
          <div className="flex items-center gap-3 text-sm">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-muted-foreground">Trees & Graphs</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">Binary Search Trees</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{completedCount}/{practiceProblems.length} completed</span>
            <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-success transition-all"
                style={{ width: `${(completedCount / practiceProblems.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{topicContent.title}</h1>
              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {topicContent.duration}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium badge-medium`}>
                  {topicContent.difficulty}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Target className="w-4 h-4" />
                  {completedCount}/{practiceProblems.length} problems
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Video className="w-4 h-4" />
                Watch Video
              </Button>
              <Link href="/code-tutor">
                <Button size="sm" className="gap-2 bg-primary text-primary-foreground">
                  <Code className="w-4 h-4" />
                  Open Editor
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex gap-1 p-1 bg-secondary rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("learn")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "learn"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Learn
            </button>
            <button
              onClick={() => setActiveTab("practice")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "practice"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Code className="w-4 h-4" />
              Practice
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {activeTab === "learn" ? (
                <motion.div
                  key="learn"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Explanation */}
                  <Card className="p-6 bg-card border-border">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      Concept
                    </h2>
                    <div className="prose prose-sm prose-invert max-w-none">
                      <p className="text-muted-foreground whitespace-pre-line leading-relaxed text-sm">
                        {topicContent.description}
                      </p>
                    </div>
                  </Card>

                  {/* Code Example */}
                  <Card className="p-6 bg-card border-border overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Code className="w-5 h-5 text-muted-foreground" />
                        Implementation
                      </h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        className="gap-2 text-muted-foreground hover:text-foreground"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                    <pre className="p-4 rounded-lg bg-[#0d1117] border border-border overflow-x-auto text-sm">
                      <code className="text-[#e6edf3] font-mono text-xs leading-relaxed">
                        {topicContent.codeExample}
                      </code>
                    </pre>
                  </Card>

                  {/* AI Assistant */}
                  <Card className="p-6 bg-card border-border">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-accent" />
                      AI Learning Assistant
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      {[
                        { id: "explain", label: "Explain Simply", icon: Lightbulb },
                        { id: "generate", label: "Generate Problems", icon: Sparkles },
                        { id: "mistake", label: "Common Mistakes", icon: HelpCircle }
                      ].map((btn) => (
                        <Button
                          key={btn.id}
                          variant="outline"
                          onClick={() => handleAiAction(btn.id)}
                          className="h-auto py-3 px-4 justify-start gap-3 bg-secondary/50 border-border hover:bg-secondary hover:border-primary/50"
                        >
                          <btn.icon className="w-4 h-4 text-accent shrink-0" />
                          <span className="text-sm">{btn.label}</span>
                        </Button>
                      ))}
                    </div>

                    <AnimatePresence>
                      {(aiLoading || showAiResponse) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                            {aiLoading ? (
                              <div className="flex items-center gap-3">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                  <Sparkles className="w-4 h-4 text-accent" />
                                </motion.div>
                                <span className="text-sm text-muted-foreground">AI is thinking...</span>
                              </div>
                            ) : (
                              <div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {selectedAiAction === "explain" && 
                                    "Think of a BST like a guessing game! Start at the top. If your number is smaller, go left. If it's bigger, go right. Keep doing this until you find what you're looking for. It's like a super-efficient way to find things in a sorted list!"
                                  }
                                  {selectedAiAction === "generate" &&
                                    "Here are 3 practice problems for you:\n\n1. Given a BST, find the minimum value\n2. Check if a given tree is a valid BST\n3. Find the in-order successor of a node"
                                  }
                                  {selectedAiAction === "mistake" &&
                                    "Common mistakes to avoid:\n\n1. Forgetting to handle null/empty tree cases\n2. Using wrong comparison operators (< vs <=)\n3. Not considering duplicate values in BST definition\n4. Confusing in-order with pre-order traversal"
                                  }
                                </p>
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                                  <span className="text-xs text-muted-foreground">Was this helpful?</span>
                                  <Button variant="ghost" size="sm" className="h-7 px-2">
                                    <ThumbsUp className="w-3.5 h-3.5" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-7 px-2">
                                    <ThumbsDown className="w-3.5 h-3.5" />
                                  </Button>
                                </div>
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card className="bg-card border-border overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-[1fr,auto,auto,auto] gap-4 px-4 py-3 bg-secondary/50 text-xs text-muted-foreground font-medium border-b border-border">
                      <span>Problem</span>
                      <span className="w-20 text-center">Difficulty</span>
                      <span className="w-20 text-center">Acceptance</span>
                      <span className="w-24 text-center">Action</span>
                    </div>
                    
                    {/* Problems */}
                    {practiceProblems.map((problem, index) => (
                      <Link
                        key={problem.id}
                        href="/code-tutor"
                        className="grid grid-cols-[1fr,auto,auto,auto] gap-4 items-center px-4 py-3.5 hover:bg-secondary/30 transition-colors border-b border-border/50 last:border-0"
                      >
                        <div className="flex items-center gap-3 min-w-0">
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
                          <div className="min-w-0">
                            <span className="block truncate font-medium text-sm">{problem.title}</span>
                            <span className="text-xs text-muted-foreground">{problem.time}</span>
                          </div>
                        </div>
                        <span className={`w-20 text-center text-xs px-2 py-1 rounded ${
                          problem.difficulty === "Easy" 
                            ? "badge-easy" 
                            : problem.difficulty === "Medium" 
                            ? "badge-medium" 
                            : "badge-hard"
                        }`}>
                          {problem.difficulty}
                        </span>
                        <span className="w-20 text-center text-sm text-muted-foreground">
                          {problem.acceptance}
                        </span>
                        <div className="w-24 flex justify-center">
                          <Button size="sm" variant={problem.status === "completed" ? "outline" : "default"} className="h-8 text-xs">
                            {problem.status === "completed" ? "Review" : "Solve"}
                          </Button>
                        </div>
                      </Link>
                    ))}
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-5 bg-card border-border">
                <h3 className="font-semibold mb-4 text-sm">Your Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Topic Mastery</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-[65%] bg-primary" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-xl font-bold">{completedCount}</p>
                      <p className="text-xs text-muted-foreground">Solved</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold">2.5h</p>
                      <p className="text-xs text-muted-foreground">Time Spent</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Related Topics */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className="p-5 bg-card border-border">
                <h3 className="font-semibold mb-4 text-sm">Related Topics</h3>
                <div className="space-y-2">
                  {["AVL Trees", "Red-Black Trees", "Tree Traversals", "Heap"].map((topic) => (
                    <button
                      key={topic}
                      className="w-full p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 text-left text-sm transition-colors flex items-center justify-between group"
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-5 bg-accent/10 border-accent/20">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <h3 className="font-semibold text-sm">AI Insight</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You struggle with recursion base cases. Try drawing the call stack for small inputs before coding.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
