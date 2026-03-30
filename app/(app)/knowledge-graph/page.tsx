"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import {
  Network,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Info,
  X,
  BookOpen,
  Target,
  Clock,
  ArrowRight,
  Sparkles,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface KnowledgeNode {
  id: string
  name: string
  mastery: number
  x: number
  y: number
  category: string
  prerequisites: string[]
  problems: number
  timeSpent: string
}

interface Edge {
  from: string
  to: string
}

const nodes: KnowledgeNode[] = [
  // Fundamentals
  { id: "arrays", name: "Arrays", mastery: 85, x: 150, y: 100, category: "fundamentals", prerequisites: [], problems: 45, timeSpent: "12h" },
  { id: "strings", name: "Strings", mastery: 78, x: 300, y: 80, category: "fundamentals", prerequisites: ["arrays"], problems: 38, timeSpent: "10h" },
  { id: "hashing", name: "Hash Maps", mastery: 72, x: 450, y: 120, category: "fundamentals", prerequisites: ["arrays"], problems: 28, timeSpent: "8h" },
  
  // Linear DS
  { id: "linkedlist", name: "Linked Lists", mastery: 68, x: 180, y: 220, category: "linear", prerequisites: ["arrays"], problems: 25, timeSpent: "7h" },
  { id: "stacks", name: "Stacks", mastery: 65, x: 330, y: 200, category: "linear", prerequisites: ["arrays", "linkedlist"], problems: 20, timeSpent: "6h" },
  { id: "queues", name: "Queues", mastery: 60, x: 480, y: 240, category: "linear", prerequisites: ["arrays", "linkedlist"], problems: 18, timeSpent: "5h" },
  
  // Trees
  { id: "trees", name: "Binary Trees", mastery: 55, x: 200, y: 350, category: "trees", prerequisites: ["linkedlist"], problems: 30, timeSpent: "9h" },
  { id: "bst", name: "BST", mastery: 48, x: 350, y: 330, category: "trees", prerequisites: ["trees"], problems: 22, timeSpent: "7h" },
  { id: "heaps", name: "Heaps", mastery: 42, x: 500, y: 370, category: "trees", prerequisites: ["trees", "arrays"], problems: 15, timeSpent: "5h" },
  
  // Graphs
  { id: "graphs", name: "Graphs", mastery: 38, x: 150, y: 480, category: "graphs", prerequisites: ["trees"], problems: 18, timeSpent: "6h" },
  { id: "bfs", name: "BFS", mastery: 35, x: 300, y: 460, category: "graphs", prerequisites: ["graphs", "queues"], problems: 12, timeSpent: "4h" },
  { id: "dfs", name: "DFS", mastery: 32, x: 450, y: 500, category: "graphs", prerequisites: ["graphs", "stacks"], problems: 14, timeSpent: "5h" },
  
  // Advanced
  { id: "dp", name: "Dynamic Programming", mastery: 25, x: 250, y: 600, category: "advanced", prerequisites: ["arrays", "trees"], problems: 22, timeSpent: "8h" },
  { id: "backtracking", name: "Backtracking", mastery: 28, x: 420, y: 620, category: "advanced", prerequisites: ["dfs"], problems: 10, timeSpent: "4h" }
]

const edges: Edge[] = [
  { from: "arrays", to: "strings" },
  { from: "arrays", to: "hashing" },
  { from: "arrays", to: "linkedlist" },
  { from: "linkedlist", to: "stacks" },
  { from: "linkedlist", to: "queues" },
  { from: "linkedlist", to: "trees" },
  { from: "trees", to: "bst" },
  { from: "trees", to: "heaps" },
  { from: "trees", to: "graphs" },
  { from: "graphs", to: "bfs" },
  { from: "graphs", to: "dfs" },
  { from: "queues", to: "bfs" },
  { from: "stacks", to: "dfs" },
  { from: "arrays", to: "dp" },
  { from: "trees", to: "dp" },
  { from: "dfs", to: "backtracking" }
]

const categoryColors: Record<string, string> = {
  fundamentals: "#22c55e",
  linear: "#3b82f6",
  trees: "#8b5cf6",
  graphs: "#f59e0b",
  advanced: "#ef4444"
}

const getMasteryColor = (mastery: number) => {
  if (mastery >= 70) return "#22c55e"
  if (mastery >= 50) return "#3b82f6"
  if (mastery >= 30) return "#f59e0b"
  return "#ef4444"
}

export default function KnowledgeGraphPage() {
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5))
  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === svgRef.current) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }, [isDragging, dragStart])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const weakNodes = nodes.filter(n => n.mastery < 40).slice(0, 3)

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold mb-2">Knowledge Graph</h1>
        <p className="text-muted-foreground">
          Visualize your learning journey and identify knowledge gaps
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="xl:col-span-3"
        >
          <Card className="relative h-[600px] bg-card border-border/50 overflow-hidden">
            {/* Controls */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomIn}
                className="h-9 w-9 rounded-lg bg-background/80 backdrop-blur"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomOut}
                className="h-9 w-9 rounded-lg bg-background/80 backdrop-blur"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleReset}
                className="h-9 w-9 rounded-lg bg-background/80 backdrop-blur"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-3 p-3 rounded-xl bg-background/80 backdrop-blur border border-border/50">
              {Object.entries(categoryColors).map(([category, color]) => (
                <div key={category} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-xs capitalize">{category}</span>
                </div>
              ))}
            </div>

            {/* SVG Graph */}
            <svg
              ref={svgRef}
              className="w-full h-full cursor-grab"
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
              onMouseDown={handleMouseDown}
            >
              <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                {/* Edges */}
                {edges.map((edge, i) => {
                  const fromNode = nodes.find(n => n.id === edge.from)
                  const toNode = nodes.find(n => n.id === edge.to)
                  if (!fromNode || !toNode) return null
                  
                  return (
                    <motion.line
                      key={i}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.3 }}
                      transition={{ duration: 0.5, delay: i * 0.02 }}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth={2}
                    />
                  )
                })}

                {/* Nodes */}
                {nodes.map((node, i) => (
                  <motion.g
                    key={node.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.03 }}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedNode(node)}
                  >
                    {/* Outer ring (mastery indicator) */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={35}
                      fill="none"
                      stroke={getMasteryColor(node.mastery)}
                      strokeWidth={3}
                      strokeDasharray={`${(node.mastery / 100) * 220} 220`}
                      strokeLinecap="round"
                      transform={`rotate(-90 ${node.x} ${node.y})`}
                      className="transition-all duration-300"
                    />
                    
                    {/* Inner circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={28}
                      fill={categoryColors[node.category]}
                      fillOpacity={0.2}
                      className="transition-all duration-300 hover:fill-opacity-40"
                    />
                    
                    {/* Node border */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={28}
                      fill="none"
                      stroke={categoryColors[node.category]}
                      strokeWidth={2}
                      className="transition-all duration-300"
                    />
                    
                    {/* Text */}
                    <text
                      x={node.x}
                      y={node.y - 5}
                      textAnchor="middle"
                      fill="white"
                      fontSize={10}
                      fontWeight={500}
                    >
                      {node.name}
                    </text>
                    <text
                      x={node.x}
                      y={node.y + 10}
                      textAnchor="middle"
                      fill={getMasteryColor(node.mastery)}
                      fontSize={11}
                      fontWeight={600}
                    >
                      {node.mastery}%
                    </text>
                  </motion.g>
                ))}
              </g>
            </svg>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Node Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-card border-border/50">
              {selectedNode ? (
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span 
                        className="text-xs px-2 py-1 rounded-full capitalize"
                        style={{ 
                          backgroundColor: `${categoryColors[selectedNode.category]}20`,
                          color: categoryColors[selectedNode.category]
                        }}
                      >
                        {selectedNode.category}
                      </span>
                      <h3 className="text-lg font-semibold mt-2">{selectedNode.name}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedNode(null)}
                      className="p-1 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Mastery Ring */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-24 h-24">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="42"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="8"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="42"
                          fill="none"
                          stroke={getMasteryColor(selectedNode.mastery)}
                          strokeWidth="8"
                          strokeDasharray={`${(selectedNode.mastery / 100) * 264} 264`}
                          strokeLinecap="round"
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">{selectedNode.mastery}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-secondary/30 border border-border/50">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Target className="w-4 h-4" />
                        <span className="text-xs">Problems</span>
                      </div>
                      <p className="font-semibold">{selectedNode.problems}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary/30 border border-border/50">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs">Time</span>
                      </div>
                      <p className="font-semibold">{selectedNode.timeSpent}</p>
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {selectedNode.prerequisites.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Prerequisites</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedNode.prerequisites.map(prereq => {
                          const prereqNode = nodes.find(n => n.id === prereq)
                          return (
                            <button
                              key={prereq}
                              onClick={() => setSelectedNode(prereqNode || null)}
                              className="text-xs px-2 py-1 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                            >
                              {prereqNode?.name}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Info className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Click on a node to see details
                  </p>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Weak Areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="p-6 bg-card border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <h3 className="font-semibold">Needs Attention</h3>
              </div>
              <div className="space-y-3">
                {weakNodes.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="w-full p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/40 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{node.name}</span>
                      <span className="text-sm" style={{ color: getMasteryColor(node.mastery) }}>
                        {node.mastery}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${node.mastery}%`,
                          backgroundColor: getMasteryColor(node.mastery)
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* AI Suggestion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-5 bg-gradient-to-br from-primary/10 via-card to-accent/10 border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">AI Recommendation</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Master Trees before moving to Graphs. Your current tree fundamentals at 55% need strengthening for effective graph traversal learning.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
