'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Code2, Zap, Users, GitBranch, Terminal, Bot, Sparkles, ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <Code2 className="h-8 w-8 text-blue-400" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              CodeFlow
            </span>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
            <Link href="#docs" className="text-gray-300 hover:text-white transition-colors">Docs</Link>
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/auth">
              <Button variant="outline" className="border-gray-700 hover:border-gray-600 bg-transparent">
                Sign In
              </Button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="container mx-auto text-center">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm mb-6">
              <Sparkles className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-sm text-gray-300">Trusted by 50,000+ developers worldwide</span>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Code Smarter.
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Build Faster.
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            The most advanced AI-powered collaborative code editor. Write, debug, and deploy with intelligent assistance that understands your codebase.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/auth">
              <Button size="lg" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-lg shadow-blue-500/25">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Hero Demo */}
          <motion.div 
            className="relative max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-gray-800/50 shadow-2xl shadow-black/50">
              <div className="bg-gradient-to-b from-gray-900 to-black p-8">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                    <div className="text-left font-mono text-sm">
                      <div className="text-gray-500">1</div>
                      <div className="text-gray-500">2</div>
                      <div className="text-gray-500">3</div>
                      <div className="text-gray-500">4</div>
                      <div className="text-gray-500">5</div>
                    </div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                    <div className="flex items-center space-x-2 mb-3">
                      <Bot className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-gray-300">AI Assistant</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      How can I help you code today?
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-6">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Everything you need to code
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful features designed for modern development workflows
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Bot,
                title: "AI-Powered Coding",
                description: "Intelligent code completion, generation, and refactoring with context-aware suggestions.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Users,
                title: "Real-time Collaboration",
                description: "Work together seamlessly with live cursors, comments, and synchronized editing.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Terminal,
                title: "Integrated Terminal",
                description: "Full-featured terminal with command execution and build system integration.",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: GitBranch,
                title: "Git Integration",
                description: "Native Git support with visual diff, branch management, and GitHub sync.",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized performance with instant startup and responsive editing experience.",
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                icon: Play,
                title: "Multi-Language Support",
                description: "Support for 50+ programming languages with syntax highlighting and IntelliSense.",
                gradient: "from-indigo-500 to-purple-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Ready to transform your coding experience?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already coding smarter with CodeFlow.
            </p>
            <Link href="/auth">
              <Button size="lg" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-lg shadow-blue-500/25">
                Start Coding Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 py-12 px-6">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2024 CodeFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
