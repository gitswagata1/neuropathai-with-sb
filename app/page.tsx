"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Github, ArrowRight, Eye, EyeOff, Sparkles, Zap, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

const floatingTopics = [
  { label: "Dynamic Programming", position: "top-[15%] left-[8%]", delay: 0 },
  { label: "Graph Algorithms", position: "top-[10%] right-[15%]", delay: 0.1 },
  { label: "Binary Trees", position: "bottom-[35%] right-[10%]", delay: 0.2 },
  { label: "Recursion", position: "bottom-[28%] left-[5%]", delay: 0.3 },
]

const features = [
  { icon: Sparkles, text: "Adaptive learning paths that evolve with you" },
  { icon: Zap, text: "Real-time AI explanations and code feedback" },
  { icon: Target, text: "Concept mastery tracking across 200+ topics" },
]

const demoAccounts = [
  { email: "student@neuropath.ai", password: "demo2025", label: "Student" },
  { email: "pro@neuropath.ai", password: "demo2025", label: "Pro" },
]

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleDemoFill = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex">
        {/* Left Panel - Branding with Brain Illustration */}
        <div className="hidden lg:flex lg:w-[50%] relative overflow-hidden bg-gradient-to-br from-[#0f1629] via-[#0a0f1a] to-[#0d1424]">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
          
          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[100px]" />

          {/* Floating topic badges */}
          {floatingTopics.map((topic, i) => (
            <motion.div
              key={topic.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: topic.delay + 0.3 }}
              className={`absolute ${topic.position} z-20`}
            >
              <div className="px-4 py-2 rounded-full bg-[#1a2744]/80 border border-[#2a3a5c] text-sm text-muted-foreground backdrop-blur-sm">
                {topic.label}
              </div>
            </motion.div>
          ))}

          {/* Brain Illustration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Center brain icon */}
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#1a2744] to-[#0f1629] border border-[#2a3a5c] flex items-center justify-center shadow-2xl">
                <Brain className="w-16 h-16 text-primary/80" />
              </div>
              
              {/* Floating accent icons */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 12h4l3-9 6 18 3-9h4" />
                </svg>
              </motion.div>
              
              <motion.div 
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 -left-6 w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center"
              >
                <Zap className="w-5 h-5 text-amber-500" />
              </motion.div>
              
              <motion.div 
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -right-8 w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center"
              >
                <Target className="w-5 h-5 text-violet-400" />
              </motion.div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative z-20 flex flex-col justify-end px-12 xl:px-16 pb-16 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-4">
                Your AI
                <br />
                <span className="text-primary">Learning</span>
                <br />
                Companion
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed max-w-md mb-8">
                Master computer science with an AI that adapts to your pace, identifies your gaps, and builds your personalized path to expertise.
              </p>

              {/* Feature list */}
              <div className="space-y-4">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-background">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">NeuroPath AI</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-1">
                  {isLogin ? "Welcome back" : "Get started"}
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  {isLogin 
                    ? "Sign in to continue your learning journey" 
                    : "Create your free account to start learning"}
                </p>

                {/* Toggle Tabs */}
                <div className="flex gap-3 mb-6">
                  <Button
                    onClick={() => setIsLogin(true)}
                    variant={isLogin ? "default" : "outline"}
                    className={`flex-1 h-11 ${isLogin ? "bg-primary hover:bg-primary/90" : "bg-transparent border-border hover:bg-secondary"}`}
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => setIsLogin(false)}
                    variant={!isLogin ? "default" : "outline"}
                    className={`flex-1 h-11 ${!isLogin ? "bg-primary hover:bg-primary/90" : "bg-transparent border-border hover:bg-secondary"}`}
                  >
                    Create Account
                  </Button>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Button
                    variant="outline"
                    className="h-11 bg-secondary/50 border-border hover:bg-secondary"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 bg-secondary/50 border-border hover:bg-secondary"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-background px-3 text-xs text-muted-foreground">
                      or continue with email
                    </span>
                  </div>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  {!isLogin && (
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-11 bg-secondary/50 border-border focus-visible:ring-1 focus-visible:ring-primary"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Email address</label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 bg-secondary/50 border-border focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Password</label>
                      {isLogin && (
                        <button type="button" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 bg-secondary/50 border-border focus-visible:ring-1 focus-visible:ring-primary pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {isLogin && (
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="remember" 
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                        Remember me for 30 days
                      </label>
                    </div>
                  )}

                  <Link href="/onboarding" className="block pt-2">
                    <Button 
                      className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    >
                      {isLogin ? "Sign In" : "Create Account"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </form>

                {/* Demo Accounts */}
                {isLogin && (
                  <div className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-sm text-emerald-400 font-medium">Demo Accounts</span>
                      <span className="text-xs text-muted-foreground">— click to autofill</span>
                    </div>
                    <div className="space-y-2">
                      {demoAccounts.map((demo) => (
                        <button
                          key={demo.email}
                          onClick={() => handleDemoFill(demo.email, demo.password)}
                          className="w-full flex items-center justify-between p-2 rounded-md bg-secondary/50 hover:bg-secondary transition-colors text-left"
                        >
                          <div>
                            <span className="text-xs text-muted-foreground">{demo.label}:</span>
                            <span className="text-sm ml-2">{demo.email}</span>
                          </div>
                          <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!isLogin && (
                  <p className="text-xs text-muted-foreground text-center mt-5">
                    By signing up, you agree to our{" "}
                    <button className="text-primary hover:underline">Terms</button>
                    {" "}and{" "}
                    <button className="text-primary hover:underline">Privacy Policy</button>
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Footer Signature */}
      <footer className="py-4 text-center border-t border-border bg-background">
        <p className="text-sm text-muted-foreground">
          Driven by Passion, Built for Impact - <span className="text-foreground font-medium">Swagata Banerjee</span>
        </p>
      </footer>
    </div>
  )
}
