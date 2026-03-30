"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Brain, Sparkles, Code, BookOpen, Trophy, Rocket, 
  GraduationCap, Briefcase, Target, ArrowRight, ArrowLeft,
  Check, Loader2, Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const skillLevels = [
  {
    id: "beginner",
    icon: BookOpen,
    title: "Beginner",
    description: "New to programming or CS fundamentals",
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: "intermediate",
    icon: Code,
    title: "Intermediate",
    description: "Comfortable with basics, learning advanced concepts",
    color: "from-primary to-blue-400"
  },
  {
    id: "advanced",
    icon: Trophy,
    title: "Advanced",
    description: "Strong foundation, preparing for top companies",
    color: "from-accent to-purple-400"
  }
]

const goals = [
  {
    id: "dsa",
    icon: Target,
    title: "Master DSA",
    description: "Data Structures & Algorithms mastery"
  },
  {
    id: "interviews",
    icon: Briefcase,
    title: "Crack Interviews",
    description: "FAANG-level interview preparation"
  },
  {
    id: "projects",
    icon: Rocket,
    title: "Build Projects",
    description: "Hands-on project-based learning"
  },
  {
    id: "competitive",
    icon: Trophy,
    title: "Competitive Programming",
    description: "Compete and improve problem-solving"
  },
  {
    id: "fundamentals",
    icon: GraduationCap,
    title: "CS Fundamentals",
    description: "OS, DBMS, Networks, System Design"
  },
  {
    id: "fullstack",
    icon: Code,
    title: "Full Stack Development",
    description: "Frontend + Backend + DevOps"
  }
]

const roadmapItems = [
  { week: "Week 1-2", topic: "Arrays & Strings", problems: 25 },
  { week: "Week 3-4", topic: "Linked Lists & Stacks", problems: 20 },
  { week: "Week 5-6", topic: "Trees & Graphs", problems: 30 },
  { week: "Week 7-8", topic: "Dynamic Programming", problems: 25 },
  { week: "Week 9-10", topic: "Advanced Algorithms", problems: 20 },
  { week: "Week 11-12", topic: "System Design Basics", problems: 15 }
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedSkill, setSelectedSkill] = useState("")
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [showRoadmap, setShowRoadmap] = useState(false)

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(g => g !== goalId)
        : [...prev, goalId]
    )
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsGenerating(false)
            setShowRoadmap(true)
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  const getProgressMessage = () => {
    if (generationProgress < 20) return "Analyzing your skill level..."
    if (generationProgress < 40) return "Mapping your learning goals..."
    if (generationProgress < 60) return "Curating optimal content..."
    if (generationProgress < 80) return "Building personalized roadmap..."
    return "Finalizing your journey..."
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-3xl"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Brain className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">NeuroPath AI</span>
        </div>

        {/* Progress bar */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  step >= s 
                    ? "bg-gradient-to-br from-primary to-accent text-primary-foreground" 
                    : "bg-secondary text-muted-foreground"
                }`}
                animate={{ scale: step === s ? 1.1 : 1 }}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </motion.div>
              {s < 3 && (
                <div className={`w-16 h-1 rounded-full ${step > s ? "bg-primary" : "bg-secondary"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="glass-card rounded-3xl p-8 md:p-12">
          <AnimatePresence mode="wait">
            {/* Step 1: Skill Level */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                  What&apos;s your current level?
                </h2>
                <p className="text-muted-foreground text-center mb-10">
                  Help us personalize your learning experience
                </p>

                <div className="space-y-4">
                  {skillLevels.map((level) => (
                    <motion.button
                      key={level.id}
                      onClick={() => setSelectedSkill(level.id)}
                      className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                        selectedSkill === level.id
                          ? "border-primary bg-primary/10"
                          : "border-border/50 hover:border-border hover:bg-secondary/30"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center`}>
                          <level.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{level.title}</h3>
                          <p className="text-sm text-muted-foreground">{level.description}</p>
                        </div>
                        {selectedSkill === level.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                          >
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-end mt-10">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedSkill}
                    className="h-12 px-8 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Goals */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                  What are your goals?
                </h2>
                <p className="text-muted-foreground text-center mb-10">
                  Select all that apply
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {goals.map((goal) => (
                    <motion.button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`p-5 rounded-2xl border-2 text-left transition-all ${
                        selectedGoals.includes(goal.id)
                          ? "border-primary bg-primary/10"
                          : "border-border/50 hover:border-border hover:bg-secondary/30"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                          <goal.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold">{goal.title}</h3>
                          <p className="text-xs text-muted-foreground">{goal.description}</p>
                        </div>
                        {selectedGoals.includes(goal.id) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0"
                          >
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-between mt-10">
                  <Button
                    variant="ghost"
                    onClick={() => setStep(1)}
                    className="h-12 px-6 rounded-xl"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      setStep(3)
                      handleGenerate()
                    }}
                    disabled={selectedGoals.length === 0}
                    className="h-12 px-8 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    Generate Roadmap
                    <Sparkles className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: AI Generation */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {isGenerating ? (
                  <div className="py-12">
                    <div className="flex flex-col items-center justify-center">
                      <motion.div
                        className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-8"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Brain className="w-12 h-12 text-primary-foreground" />
                      </motion.div>
                      
                      <h2 className="text-2xl font-bold mb-2">AI is working...</h2>
                      <p className="text-muted-foreground mb-8">{getProgressMessage()}</p>
                      
                      <div className="w-full max-w-sm">
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-accent"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(generationProgress, 100)}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground text-center mt-3">
                          {Math.round(Math.min(generationProgress, 100))}% complete
                        </p>
                      </div>
                    </div>
                  </div>
                ) : showRoadmap ? (
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Zap className="w-6 h-6 text-primary" />
                      <h2 className="text-2xl md:text-3xl font-bold text-center">
                        Your Personalized Roadmap
                      </h2>
                    </div>
                    <p className="text-muted-foreground text-center mb-10">
                      AI-generated based on your profile
                    </p>

                    <div className="space-y-4">
                      {roadmapItems.map((item, index) => (
                        <motion.div
                          key={item.week}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border/50"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">{item.week}</span>
                              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                                {item.problems} problems
                              </span>
                            </div>
                            <h3 className="font-semibold mt-1">{item.topic}</h3>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-10">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowRoadmap(false)
                          handleGenerate()
                        }}
                        className="flex-1 h-12 rounded-xl"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Regenerate
                      </Button>
                      <Button
                        onClick={() => router.push("/dashboard")}
                        className="flex-1 h-12 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90"
                      >
                        Start Learning
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
