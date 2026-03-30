"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Brain, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Code, 
  Briefcase, 
  GraduationCap,
  Target,
  Clock,
  Sparkles,
  Trophy,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const skillLevels = [
  { 
    id: "beginner", 
    title: "Beginner", 
    description: "New to programming or DSA",
    icon: GraduationCap,
    detail: "Start from basics: arrays, loops, functions"
  },
  { 
    id: "intermediate", 
    title: "Intermediate", 
    description: "Familiar with basic DSA concepts",
    icon: Code,
    detail: "Focus on: recursion, trees, graphs, DP"
  },
  { 
    id: "advanced", 
    title: "Advanced", 
    description: "Looking to master complex topics",
    icon: Trophy,
    detail: "Advanced: segment trees, tries, complex DP"
  }
]

const goals = [
  { id: "faang", label: "FAANG Interviews", icon: Target },
  { id: "competitive", label: "Competitive Programming", icon: Trophy },
  { id: "college", label: "College Placements", icon: GraduationCap },
  { id: "skills", label: "Skill Development", icon: Zap },
  { id: "startup", label: "Startup Interviews", icon: Briefcase },
  { id: "refresh", label: "Refresh Concepts", icon: Code }
]

const timeCommitments = [
  { id: "light", hours: "1-2", label: "hrs/day", description: "Relaxed pace", duration: "6 months" },
  { id: "moderate", hours: "2-4", label: "hrs/day", description: "Balanced", duration: "3 months" },
  { id: "intense", hours: "4+", label: "hrs/day", description: "Intensive", duration: "6 weeks" }
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [skillLevel, setSkillLevel] = useState("")
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [timeCommitment, setTimeCommitment] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(g => g !== goalId)
        : [...prev, goalId]
    )
  }

  const canProceed = () => {
    if (step === 1) return !!skillLevel
    if (step === 2) return selectedGoals.length > 0
    if (step === 3) return !!timeCommitment
    return true
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      setIsGenerating(true)
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left - Progress */}
      <div className="hidden lg:flex w-80 bg-card border-r border-border flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold">NeuroPath AI</span>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-6">Setup Progress</h2>
          <div className="space-y-4">
            {[
              { num: 1, label: "Skill Level" },
              { num: 2, label: "Learning Goals" },
              { num: 3, label: "Time Commitment" }
            ].map((item) => (
              <div key={item.num} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step > item.num 
                    ? "bg-success text-white" 
                    : step === item.num 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-muted-foreground"
                }`}>
                  {step > item.num ? <Check className="w-4 h-4" /> : item.num}
                </div>
                <span className={`text-sm ${step >= item.num ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-border">
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-xs text-muted-foreground">
              Your personalized learning path will be generated based on your selections.
            </p>
          </div>
        </div>
      </div>

      {/* Right - Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Brain className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-sm">NeuroPath AI</span>
            </div>
            <span className="text-sm text-muted-foreground">Step {step}/3</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`flex-1 h-1 rounded-full ${s <= step ? "bg-primary" : "bg-secondary"}`} 
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-xl">
            <AnimatePresence mode="wait">
              {!isGenerating ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {step === 1 && (
                    <div>
                      <h1 className="text-2xl font-bold mb-2">{"What's"} your current level?</h1>
                      <p className="text-muted-foreground mb-8">
                        {"We'll"} customize your learning path accordingly.
                      </p>
                      
                      <div className="space-y-3">
                        {skillLevels.map((level) => (
                          <button
                            key={level.id}
                            onClick={() => setSkillLevel(level.id)}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${
                              skillLevel === level.id
                                ? "bg-primary/10 border-primary"
                                : "bg-card border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                skillLevel === level.id ? "bg-primary text-primary-foreground" : "bg-secondary"
                              }`}>
                                <level.icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-semibold">{level.title}</h3>
                                  {skillLevel === level.id && (
                                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                      <Check className="w-3 h-3 text-primary-foreground" />
                                    </div>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{level.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">{level.detail}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h1 className="text-2xl font-bold mb-2">What are your goals?</h1>
                      <p className="text-muted-foreground mb-8">
                        Select all that apply. We&apos;ll prioritize your curriculum.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {goals.map((goal) => (
                          <button
                            key={goal.id}
                            onClick={() => toggleGoal(goal.id)}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              selectedGoals.includes(goal.id)
                                ? "bg-primary/10 border-primary"
                                : "bg-card border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                selectedGoals.includes(goal.id) ? "bg-primary text-primary-foreground" : "bg-secondary"
                              }`}>
                                <goal.icon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium">{goal.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h1 className="text-2xl font-bold mb-2">How much time can you commit?</h1>
                      <p className="text-muted-foreground mb-8">
                        {"We'll"} pace your learning accordingly.
                      </p>
                      
                      <div className="space-y-3">
                        {timeCommitments.map((time) => (
                          <button
                            key={time.id}
                            onClick={() => setTimeCommitment(time.id)}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${
                              timeCommitment === time.id
                                ? "bg-primary/10 border-primary"
                                : "bg-card border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  timeCommitment === time.id ? "bg-primary text-primary-foreground" : "bg-secondary"
                                }`}>
                                  <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-bold">{time.hours}</span>
                                    <span className="text-sm text-muted-foreground">{time.label}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{time.description}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">~{time.duration}</p>
                                <p className="text-xs text-muted-foreground">to complete</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-8 h-8 text-primary" />
                    </motion.div>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Creating Your Roadmap</h2>
                  <p className="text-muted-foreground mb-8">
                    AI is analyzing your profile and building a personalized learning path...
                  </p>
                  
                  <div className="space-y-3 max-w-xs mx-auto mb-8">
                    {[
                      "Analyzing skill level",
                      "Mapping learning goals",
                      "Optimizing schedule"
                    ].map((text, i) => (
                      <motion.div
                        key={text}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.5 }}
                        className="flex items-center gap-3 text-sm"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.5 + 0.3 }}
                          className="w-5 h-5 rounded-full bg-success flex items-center justify-center"
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                        <span>{text}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    <Link href="/dashboard">
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Go to Dashboard
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        {!isGenerating && (
          <div className="p-6 border-t border-border">
            <div className="max-w-xl mx-auto flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {step === 3 ? "Generate Roadmap" : "Continue"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
