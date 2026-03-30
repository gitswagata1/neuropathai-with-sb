"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Sparkles, Target, TrendingUp, Github, Mail, ArrowRight, Eye, EyeOff, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Personalized roadmaps that adapt to your learning style"
  },
  {
    icon: Target,
    title: "Structured Paths",
    description: "Master DSA with battle-tested learning sequences"
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Visual insights into your mastery and weak areas"
  }
]

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight">NeuroPath AI</span>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
              Master CS with{" "}
              <span className="gradient-text">AI-Powered</span>
              <br />
              Learning Paths
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Your personalized journey to becoming a world-class developer. 
              Adaptive learning that evolves with you.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 border-2 border-background flex items-center justify-center text-xs font-medium"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div>
              <p className="font-semibold">10,000+ learners</p>
              <p className="text-sm text-muted-foreground">already on their journey</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight">NeuroPath AI</span>
          </div>

          {/* Form Card */}
          <div className="glass-card rounded-3xl p-8 glow-blue">
            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-secondary/50 rounded-2xl mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isLogin 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                  !isLogin 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign Up
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-2">
                  {isLogin ? "Welcome back" : "Start your journey"}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {isLogin 
                    ? "Continue your learning path" 
                    : "Create your account to get started"}
                </p>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-12 rounded-xl bg-input border-border/50 focus:border-primary transition-colors"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-xl bg-input border-border/50 focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 rounded-xl bg-input border-border/50 focus:border-primary transition-colors pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {isLogin && (
                    <div className="flex justify-end">
                      <button className="text-sm text-primary hover:underline">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <Link href="/onboarding">
                    <Button 
                      className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-base font-semibold mt-4"
                    >
                      {isLogin ? "Sign In" : "Create Account"}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </form>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-card px-4 text-sm text-muted-foreground">
                      or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl border-border/50 hover:bg-secondary/50 transition-colors"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl border-border/50 hover:bg-secondary/50 transition-colors"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Google
                  </Button>
                </div>

                {!isLogin && (
                  <p className="text-xs text-muted-foreground text-center mt-6">
                    By creating an account, you agree to our{" "}
                    <button className="text-primary hover:underline">Terms</button>
                    {" "}and{" "}
                    <button className="text-primary hover:underline">Privacy Policy</button>
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex items-center justify-center gap-6 text-muted-foreground"
          >
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary" />
              <span>No credit card</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
