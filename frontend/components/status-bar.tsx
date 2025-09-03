'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { GitBranch, AlertCircle, CheckCircle, Zap, Wifi, WifiOff, Bell } from 'lucide-react'
import { motion } from 'framer-motion'

interface StatusBarProps {
  activeFile: string
}

export function StatusBar({ activeFile }: StatusBarProps) {
  const [time, setTime] = useState(new Date())
  const [isOnline, setIsOnline] = useState(true)
  const [errors, setErrors] = useState(0)
  const [warnings, setWarnings] = useState(2)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const getLanguageFromFile = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase()
    const languageMap: Record<string, string> = {
      'js': 'JavaScript',
      'jsx': 'JavaScript React',
      'ts': 'TypeScript',
      'tsx': 'TypeScript React',
      'css': 'CSS',
      'html': 'HTML',
      'json': 'JSON',
      'md': 'Markdown',
      'py': 'Python'
    }
    return languageMap[ext || ''] || 'Plain Text'
  }

  const getLineInfo = () => {
    // Simulate line/column info
    return { line: 42, column: 15, selected: 0 }
  }

  const lineInfo = getLineInfo()

  return (
    <div className="h-6 bg-[#007acc] flex items-center justify-between px-2 text-white text-xs">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        {/* Git branch */}
        <motion.div 
          className="flex items-center space-x-1 hover:bg-white/10 px-2 py-1 rounded cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <GitBranch className="h-3 w-3" />
          <span>main</span>
        </motion.div>

        {/* Sync status */}
        <motion.div 
          className="flex items-center space-x-1 hover:bg-white/10 px-2 py-1 rounded cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="h-3 w-3" />
          </motion.div>
          <span>Syncing...</span>
        </motion.div>

        {/* Problems */}
        {(errors > 0 || warnings > 0) && (
          <motion.div 
            className="flex items-center space-x-2 hover:bg-white/10 px-2 py-1 rounded cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            {errors > 0 && (
              <div className="flex items-center space-x-1">
                <AlertCircle className="h-3 w-3 text-red-300" />
                <span>{errors}</span>
              </div>
            )}
            {warnings > 0 && (
              <div className="flex items-center space-x-1">
                <AlertCircle className="h-3 w-3 text-yellow-300" />
                <span>{warnings}</span>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Line/Column info */}
        <motion.div 
          className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          Ln {lineInfo.line}, Col {lineInfo.column}
          {lineInfo.selected > 0 && ` (${lineInfo.selected} selected)`}
        </motion.div>

        {/* Language */}
        <motion.div 
          className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          {getLanguageFromFile(activeFile)}
        </motion.div>

        {/* Encoding */}
        <motion.div 
          className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          UTF-8
        </motion.div>

        {/* Line endings */}
        <motion.div 
          className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          LF
        </motion.div>

        {/* Connection status */}
        <motion.div 
          className="flex items-center space-x-1 hover:bg-white/10 px-2 py-1 rounded cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          {isOnline ? (
            <Wifi className="h-3 w-3 text-green-300" />
          ) : (
            <WifiOff className="h-3 w-3 text-red-300" />
          )}
        </motion.div>

        {/* Notifications */}
        <motion.div 
          className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <Bell className="h-3 w-3" />
        </motion.div>

        {/* Time */}
        <div className="text-white/80">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}
