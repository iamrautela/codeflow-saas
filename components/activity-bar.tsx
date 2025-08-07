'use client'

import { motion } from 'framer-motion'
import { Files, Search, GitBranch, Play, Package, Settings, Bot, Code2 } from 'lucide-react'

interface ActivityBarProps {
  activePanel: string
  onPanelChange: (panel: string) => void
  onAIChatToggle: () => void
}

export function ActivityBar({ activePanel, onPanelChange, onAIChatToggle }: ActivityBarProps) {
  const items = [
    { id: 'explorer', icon: Files, label: 'Explorer', shortcut: '⇧⌘E' },
    { id: 'search', icon: Search, label: 'Search', shortcut: '⇧⌘F' },
    { id: 'source-control', icon: GitBranch, label: 'Source Control', shortcut: '⌃⇧G' },
    { id: 'run', icon: Play, label: 'Run and Debug', shortcut: '⇧⌘D' },
    { id: 'extensions', icon: Package, label: 'Extensions', shortcut: '⇧⌘X' },
  ]

  return (
    <div className="w-12 bg-[#2d2d30] flex flex-col items-center py-2 border-r border-[#3e3e42]">
      {/* Logo */}
      <motion.div 
        className="mb-4 p-2 rounded-md hover:bg-[#3e3e42] cursor-pointer group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Code2 className="h-6 w-6 text-[#007acc] group-hover:text-[#1177bb]" />
      </motion.div>

      {/* Activity Items */}
      <div className="flex flex-col space-y-1 flex-1">
        {items.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onPanelChange(item.id)}
            className={`p-2 rounded-md transition-colors group relative ${
              activePanel === item.id 
                ? 'bg-[#37373d] text-white border-l-2 border-[#007acc]' 
                : 'text-[#cccccc] hover:bg-[#3e3e42] hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`${item.label} (${item.shortcut})`}
          >
            <item.icon className="h-6 w-6" />
            
            {/* Tooltip */}
            <div className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-[#1e1e1e] text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              {item.label}
              <div className="text-[#cccccc]">{item.shortcut}</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Bottom Items */}
      <div className="flex flex-col space-y-1">
        <motion.button
          onClick={onAIChatToggle}
          className="p-2 rounded-md text-[#cccccc] hover:bg-[#3e3e42] hover:text-white transition-colors group relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="AI Chat (⌘L)"
        >
          <Bot className="h-6 w-6" />
          <div className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-[#1e1e1e] text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            AI Chat
            <div className="text-[#cccccc]">⌘L</div>
          </div>
        </motion.button>

        <motion.button
          className="p-2 rounded-md text-[#cccccc] hover:bg-[#3e3e42] hover:text-white transition-colors group relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Settings"
        >
          <Settings className="h-6 w-6" />
          <div className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-[#1e1e1e] text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            Settings
          </div>
        </motion.button>
      </div>
    </div>
  )
}
