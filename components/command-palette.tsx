'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Search, File, Settings, Terminal, GitBranch, Play, Bot, Palette, Command } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onCommand: (command: string) => void
}

interface Command {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  category: string
  shortcut?: string
  action: string
}

const commands: Command[] = [
  {
    id: '1',
    title: 'Toggle Terminal',
    description: 'Show or hide the integrated terminal',
    icon: Terminal,
    category: 'View',
    shortcut: 'Ctrl+`',
    action: 'toggle-terminal'
  },
  {
    id: '2',
    title: 'Toggle AI Chat',
    description: 'Open or close the AI assistant',
    icon: Bot,
    category: 'AI',
    shortcut: 'Cmd+L',
    action: 'toggle-ai-chat'
  },
  {
    id: '3',
    title: 'New File',
    description: 'Create a new file',
    icon: File,
    category: 'File',
    shortcut: 'Cmd+N',
    action: 'new-file'
  },
  {
    id: '4',
    title: 'Git: Initialize Repository',
    description: 'Initialize a new git repository',
    icon: GitBranch,
    category: 'Git',
    action: 'git-init'
  },
  {
    id: '5',
    title: 'Run Task',
    description: 'Run a predefined task',
    icon: Play,
    category: 'Tasks',
    shortcut: 'Cmd+Shift+P',
    action: 'run-task'
  },
  {
    id: '6',
    title: 'Preferences: Open Settings',
    description: 'Open user settings',
    icon: Settings,
    category: 'Preferences',
    shortcut: 'Cmd+,',
    action: 'open-settings'
  },
  {
    id: '7',
    title: 'Change Color Theme',
    description: 'Change the color theme',
    icon: Palette,
    category: 'Preferences',
    action: 'change-theme'
  }
]

export function CommandPalette({ isOpen, onClose, onCommand }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.description.toLowerCase().includes(query.toLowerCase()) ||
    command.category.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          )
          break
        case 'Enter':
          e.preventDefault()
          if (filteredCommands[selectedIndex]) {
            onCommand(filteredCommands[selectedIndex].action)
            onClose()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredCommands, onCommand, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg shadow-2xl w-full max-w-2xl"
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-[#3e3e42]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#cccccc]" />
                <Input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setSelectedIndex(0)
                  }}
                  placeholder="Type a command or search..."
                  className="pl-10 bg-[#3c3c3c] border-[#3e3e42] text-white placeholder-[#cccccc] focus:border-[#007acc] focus:ring-1 focus:ring-[#007acc]"
                  autoFocus
                />
              </div>
            </div>

            {/* Commands List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center text-[#cccccc]">
                  <Command className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No commands found</p>
                  <p className="text-sm text-[#6a6a6a] mt-1">
                    Try a different search term
                  </p>
                </div>
              ) : (
                <div className="py-2">
                  {filteredCommands.map((command, index) => (
                    <motion.div
                      key={command.id}
                      className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${
                        index === selectedIndex 
                          ? 'bg-[#37373d] text-white' 
                          : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                      }`}
                      onClick={() => {
                        onCommand(command.action)
                        onClose()
                      }}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <command.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium truncate">
                            {command.title}
                          </span>
                          {command.shortcut && (
                            <span className="text-xs text-[#6a6a6a] ml-2 flex-shrink-0">
                              {command.shortcut}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#6a6a6a] truncate">
                          {command.description}
                        </p>
                      </div>
                      <span className="text-xs text-[#6a6a6a] ml-2 flex-shrink-0">
                        {command.category}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-[#3e3e42] bg-[#252526] text-xs text-[#6a6a6a] flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
                <span>esc to cancel</span>
              </div>
              <div>
                {filteredCommands.length} commands
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
