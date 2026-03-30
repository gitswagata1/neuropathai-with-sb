"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  RotateCcw,
  Send,
  Sparkles,
  AlertCircle,
  Lightbulb,
  Code,
  Terminal,
  ChevronRight,
  Zap,
  Copy,
  Check,
  ArrowLeft,
  Clock,
  ThumbsUp,
  ThumbsDown,
  FileText,
  Video
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

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
  acceptance: "32.4%",
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
      explanation: "The root node's right child (4) is less than root (5)"
    }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [1, 10^4]",
    "-2^31 <= Node.val <= 2^31 - 1"
  ]
}

const aiMessages = [
  {
    type: "ai",
    content: "I see you're working on validating a BST. Your approach using a helper function with min/max bounds is correct!",
    timestamp: "Just now"
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
  const [activeTab, setActiveTab] = useState<"problem" | "submissions">("problem")

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
          ? "The time complexity is O(n) where n is the number of nodes. Space complexity is O(h) where h is the tree height due to recursion stack."
          : chatInput.toLowerCase().includes("hint")
          ? "Hint: Think about what valid ranges each node must fall within. The left child must be less than parent, and right child must be greater."
          : "Great question! The key insight is tracking valid bounds as you traverse. Each node must satisfy: min < node.val < max.",
        timestamp: "Just now"
      }])
    }, 1200)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="h-14 border-b border-border bg-background/95 backdrop-blur flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/learning" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span className="text-sm text-muted-foreground">Practice</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">{problemDescription.title}</span>
          <span className="badge-medium text-xs px-2 py-0.5 rounded">
            {problemDescription.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 h-8">
            <FileText className="w-3.5 h-3.5" />
            Editorial
          </Button>
          <Button variant="outline" size="sm" className="gap-2 h-8">
            <Video className="w-3.5 h-3.5" />
            Video
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Problem */}
        <div className="w-[400px] border-r border-border flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("problem")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === "problem" 
                  ? "border-b-2 border-primary text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Problem
            </button>
            <button
              onClick={() => setActiveTab("submissions")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === "submissions" 
                  ? "border-b-2 border-primary text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Submissions
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "problem" ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-lg font-bold">{problemDescription.title}</h1>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="badge-medium px-2 py-0.5 rounded text-xs">{problemDescription.difficulty}</span>
                    <span>Acceptance: {problemDescription.acceptance}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {problemDescription.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {problemDescription.examples.map((ex, i) => (
                    <div key={i} className="p-3 rounded-lg bg-secondary/50 border border-border">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Example {i + 1}:</p>
                      <div className="font-mono text-xs space-y-1">
                        <p><span className="text-muted-foreground">Input:</span> {ex.input}</p>
                        <p><span className="text-muted-foreground">Output:</span> {ex.output}</p>
                        <p className="text-muted-foreground">{ex.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Constraints:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {problemDescription.constraints.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-muted-foreground">•</span>
                        <span className="font-mono">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground text-sm">
                No submissions yet
              </div>
            )}
          </div>
        </div>

        {/* Center Panel - Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Editor Header */}
          <div className="h-10 flex items-center justify-between px-3 bg-secondary/30 border-b border-border">
            <div className="flex items-center gap-2 text-sm">
              <Code className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">JavaScript</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 px-2">
                {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReset} className="h-7 px-2">
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Code Area */}
          <div className="flex-1 bg-[#0d1117] overflow-auto">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-[#e6edf3] font-mono text-sm resize-none focus:outline-none p-4 leading-relaxed"
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div className="h-36 border-t border-border flex flex-col">
            <div className="h-9 flex items-center justify-between px-3 bg-secondary/30 border-b border-border">
              <div className="flex items-center gap-2 text-sm">
                <Terminal className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Output</span>
              </div>
              <Button
                onClick={handleRun}
                disabled={isRunning}
                size="sm"
                className="h-7 px-3 bg-success hover:bg-success/90 text-white"
              >
                {isRunning ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <Play className="w-3.5 h-3.5 mr-1" />
                )}
                {isRunning ? "Running" : "Run"}
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-3 bg-[#0d1117]">
              <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap">
                {output || "Click 'Run' to execute your code..."}
              </pre>
            </div>
          </div>
        </div>

        {/* Right Panel - AI Assistant */}
        <div className="w-[320px] border-l border-border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="h-12 flex items-center gap-2 px-4 border-b border-border bg-primary/5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">AI Tutor</h3>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 p-2 border-b border-border">
            {[
              { label: "Hint", icon: Lightbulb },
              { label: "Debug", icon: AlertCircle },
              { label: "Optimize", icon: Zap }
            ].map((action) => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                className="flex-1 h-8 text-xs border-border"
              >
                <action.icon className="w-3 h-3 mr-1" />
                {action.label}
              </Button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[90%] rounded-xl px-3 py-2 ${
                  msg.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 border border-border"
                }`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  {msg.type === "ai" && (
                    <div className="flex items-center gap-1 mt-2 pt-2 border-t border-border/50">
                      <Button variant="ghost" size="sm" className="h-6 px-1.5">
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-1.5">
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {aiTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-secondary/50 border border-border rounded-xl px-3 py-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about the problem..."
                className="h-9 text-sm bg-secondary/50 border-border"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="h-9 w-9 p-0 bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
