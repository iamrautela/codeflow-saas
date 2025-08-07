'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(true)
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  const handleSocialAuth = (provider: string) => {
    setIsLoading(provider)
    setTimeout(() => {
      onSuccess()
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading('form')
    setTimeout(() => {
      onSuccess()
    }, 2000)
  }

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-900/40 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 shadow-2xl w-full max-w-md"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-700/50 hover:bg-gray-600/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-4 w-4" />
            </motion.button>

            {/* Toggle Buttons */}
            <motion.div 
              className="flex bg-gray-800/50 rounded-2xl p-1 mb-8"
              variants={itemVariants}
            >
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isSignUp 
                    ? 'bg-white text-gray-900 shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign up
              </button>
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 ${
                  !isSignUp 
                    ? 'bg-white text-gray-900 shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign in
              </button>
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="text-2xl font-bold text-white mb-8"
              variants={itemVariants}
            >
              {isSignUp ? 'Create an account' : 'Welcome back'}
            </motion.h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              {isSignUp && (
                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  variants={itemVariants}
                >
                  <Input
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 rounded-xl py-6 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                  <Input
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 rounded-xl py-6 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                </motion.div>
              )}

              <motion.div 
                className="relative"
                variants={itemVariants}
              >
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 rounded-xl py-6 pl-12 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
              </motion.div>

              {isSignUp && (
                <motion.div 
                  className="relative"
                  variants={itemVariants}
                >
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <div className="w-6 h-4 bg-red-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">🇺🇸</span>
                    </div>
                    <span className="text-gray-400">▼</span>
                  </div>
                  <Input
                    type="tel"
                    placeholder="(775) 351-6501"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 rounded-xl py-6 pl-20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  disabled={isLoading === 'form'}
                  className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isLoading === 'form' ? (
                    <motion.div className="flex items-center justify-center">
                      <motion.div
                        className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      {isSignUp ? 'Creating account...' : 'Signing in...'}
                    </motion.div>
                  ) : (
                    isSignUp ? 'Create an account' : 'Sign in'
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div 
              className="flex items-center my-6"
              variants={itemVariants}
            >
              <div className="flex-1 h-px bg-gray-700/50"></div>
              <span className="px-4 text-sm text-gray-400 uppercase tracking-wider">
                OR SIGN IN WITH
              </span>
              <div className="flex-1 h-px bg-gray-700/50"></div>
            </motion.div>

            {/* Social Login Buttons */}
            <motion.div 
              className="grid grid-cols-2 gap-4 mb-6"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => handleSocialAuth('google')}
                disabled={isLoading === 'google'}
                className="flex items-center justify-center py-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading === 'google' ? (
                  <motion.div
                    className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
              </motion.button>

              <motion.button
                onClick={() => handleSocialAuth('github')}
                disabled={isLoading === 'github'}
                className="flex items-center justify-center py-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading === 'github' ? (
                  <motion.div
                    className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                )}
              </motion.button>
            </motion.div>

            {/* Terms */}
            <motion.p 
              className="text-center text-sm text-gray-500"
              variants={itemVariants}
            >
              By creating an account, you agree to our{' '}
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                Terms & Service
              </button>
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
