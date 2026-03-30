"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  RotateCcw,
  Send,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  Code,
  Terminal,
  MessageSquare,
  X,
  ChevronRight,
  Zap,
  Copy,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const initialCode = `function validateBST(root) {
  // Your code here
  
  function helper(node, min, max) {
    if (!node) return true;
    
    if (node.val <= min || node.val >= max) {
      return false;
    }
    
    return helper(node.left, min, node.val) 
        && helper(node.right, node.val, max);
  }
  
  return helper(root, -Infinity, Infinity);
}`

const problemDescription = {
  title: "Validate Binary Search Tree",
  difficulty: "Medium",
  description: `Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
• The left subtree of a node contains only nodes with keys less than the node's key.
• The right subtree of a node contains only nodes with keys greater than the node's key.
• Both the left and right subtrees must also be binary search trees.`,
  examples: [
    {
      input: "root = [2,1,3]",
      output: "true",
      explanation: "The tree is valid as 1 < 2 < 3"
    },
    {
      input: "root = [5,1,4,null,null,3,6]",
      output: "false",
      explanation: "The root node's right subtree has value 4 which is less than root 5"
    }
  ]
}

const aiMessages = [
  {
    type: "ai",
    content: "I see you're working on validating a BST. Your approach using helper function with min/max bounds is correct! Let me analyze your code...",
    timestamp: "Just now"
  },
  {
    type: "ai",
    content: "Your solution looks good! You're correctly passing the bounds through recursion. One suggestion: consider using Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER instead of Infinity for edge cases.",
    timestamp: "Just now",
    isInsight: true
  }
]

export default function CodeTutorPage() {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState(aiMessages)
  const [copied, setCopied] = useState(false)
  const [aiTyping, setAiTyping] = useState(false)

  const handleRun = () => {
    setIsRunning(true)
    setOutput("Running...\n")
    
    setTimeout(() => {
      setOutput(`> Running validateBST()...

Test Case 1: [2,1,3]
Expected: true
Output: true ✓

Test Case 2: [5,1,4,null,null,3,6]
Expected: false
Output: false ✓

All test cases passed!
Runtime: 52ms (beats 89%)
Memory: 42.1MB (beats 76%)`)
      setIsRunning(false)
    }, 1500)
  }

  const handleReset = () => {
    setCode(initialCode)
    setOutput("")
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    setMessages(prev => [...prev, {
      type: "user",
      content: chatInput,
      timestamp: "Just now"
    }])
    setChatInput("")
    setAiTyping(true)

    setTimeout(() => {
      setAiTyping(false)
      setMessages(prev => [...prev, {
        type: "ai",
        content: chatInput.toLowerCase().includes("time complexity") 
          ? "The time complexity of your solution is O(n) where n is the number of nodes, as you visit each node exactly once. The space complexity is O(h) where h is the height of the tree, due to the recursive call stack."
          : chatInput.toLowerCase().includes("optimize")
          ? "Your current solution is already quite optimal! An iterative approach using a stack could save some call stack space, but the time complexity would remain O(n). Would you like me to show you the iterative version?"
          : "Great question! Your approach is solid. The key insight is that for a BST, every node must fall within a valid range defined by its ancestors. You're tracking this correctly with min and max bounds.",
        timestamp: "Just now"
      }])
    }, 1500)
  }

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Practice</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{problemDescription.title}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{problemDescription.title}</h1>
            <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
              {problemDescription.difficulty}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
        {/* Left: Code Editor */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="xl:col-span-2 flex flex-col gap-4"
        >
          {/* Problem Description */}
          <Card className="p-4 bg-card border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Code className="w-4 h-4 text-primary" />
              <span className="font-medium text-sm">Problem</span>
            </div>
            <p className="text-sm text-muted-foreground whitespace-pre-line mb-4">
              {problemDescription.description}
            </p>
            <div className="space-y-3">
              {problemDescription.examples.map((ex, i) => (
                <div key={i} className="p-3 rounded-lg bg-secondary/30 border border-border/50 text-sm">
                  <p className="font-mono text-xs text-muted-foreground">Input: {ex.input}</p>
                  <p className="font-mono text-xs text-muted-foreground">Output: {ex.output}</p>
                  <p className="text-xs text-muted-foreground mt-1">Explanation: {ex.explanation}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Editor */}
          <Card className="flex-1 flex flex-col bg-[#0d1117] border-border/50 overflow-hidden">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-secondary/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 text-sm text-muted-foreground">solution.js</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-8 px-3 rounded-lg"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="h-8 px-3 rounded-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Code Area */}
            <div className="flex-1 overflow-auto p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent text-emerald-400 font-mono text-sm resize-none focus:outline-none"
                spellCheck={false}
              />
            </div>

            {/* Run Button */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 bg-secondary/20">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Terminal className="w-4 h-4" />
                <span>JavaScript</span>
              </div>
              <Button
                onClick={handleRun}
                disabled={isRunning}
                className="h-9 px-5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90"
              >
                {isRunning ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {isRunning ? "Running..." : "Run Code"}
              </Button>
            </div>
          </Card>

          {/* Output */}
          <Card className="h-40 bg-[#0d1117] border-border/50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border/50 bg-secondary/20">
              <Terminal className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Output</span>
            </div>
            <div className="p-4 h-[calc(100%-40px)] overflow-auto">
              <pre className="font-mono text-sm text-muted-foreground whitespace-pre-wrap">
                {output || "Click 'Run Code' to see output..."}
              </pre>
            </div>
          </Card>
        </motion.div>

        {/* Right: AI Assistant */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col"
        >
          <Card className="flex-1 flex flex-col bg-card border-border/50 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">AI Code Tutor</h3>
                <p className="text-xs text-muted-foreground">Always ready to help</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 p-3 border-b border-border/50 overflow-x-auto">
              {[
                { label: "Explain", icon: Lightbulb },
                { label: "Hint", icon: Zap },
                { label: "Debug", icon: AlertCircle }
              ].map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 rounded-lg border-border/50 shrink-0"
                >
                  <action.icon className="w-3 h-3 mr-1" />
                  {action.label}
                </Button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[90%] ${
                    msg.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : msg.isInsight
                      ? "bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30"
                      : "bg-secondary/50 border border-border/50"
                  } rounded-2xl px-4 py-3`}>
                    {msg.type === "ai" && msg.isInsight && (
                      <div className="flex items-center gap-1 mb-2">
                        <Lightbulb className="w-3 h-3 text-accent" />
                        <span className="text-xs font-medium text-accent">Insight</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <p className="text-xs mt-2 opacity-60">{msg.timestamp}</p>
                  </div>
                </motion.div>
              ))}
              
              {aiTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary/50 border border-border/50 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-muted-foreground"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-muted-foreground"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-muted-foreground"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50">
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about your code..."
                  className="h-10 rounded-xl bg-secondary/50 border-border/50"
                />
                <Button
                  onClick={handleSendMessage}
                  className="h-10 w-10 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Try: {'"'}What&apos;s the time complexity?{'"'}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
