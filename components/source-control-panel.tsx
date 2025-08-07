'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GitBranch, Plus, Minus, RotateCcw, Upload, Download, GitCommit, FileText, MoreHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'

export function SourceControlPanel() {
  const [commitMessage, setCommitMessage] = useState('')
  
  const changes = [
    { file: 'src/App.tsx', status: 'modified', additions: 12, deletions: 3 },
    { file: 'src/components/Header.tsx', status: 'modified', additions: 5, deletions: 1 },
    { file: 'src/components/NewComponent.tsx', status: 'untracked', additions: 25, deletions: 0 },
    { file: 'package.json', status: 'modified', additions: 2, deletions: 0 }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'modified':
        return <div className="w-2 h-2 bg-[#f97316] rounded-full" />
      case 'untracked':
        return <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
      case 'deleted':
        return <div className="w-2 h-2 bg-[#ef4444] rounded-full" />
      default:
        return <div className="w-2 h-2 bg-[#6b7280] rounded-full" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'modified':
        return 'M'
      case 'untracked':
        return 'U'
      case 'deleted':
        return 'D'
      default:
        return '?'
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#252526]">
      {/* Header */}
      <div className="p-3 border-b border-[#3e3e42]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[#cccccc] uppercase tracking-wider">
            Source Control
          </span>
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-[#cccccc] hover:bg-[#3e3e42] hover:text-white"
              title="Refresh"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-[#cccccc] hover:bg-[#3e3e42] hover:text-white"
              title="More Actions"
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-[#cccccc]">
          <GitBranch className="h-4 w-4" />
          <span>main</span>
          <span className="text-[#6a6a6a]">•</span>
          <span className="text-[#6a6a6a]">origin/main</span>
        </div>
      </div>

      {/* Commit Section */}
      <div className="p-3 border-b border-[#3e3e42]">
        <Input
          value={commitMessage}
          onChange={(e) => setCommitMessage(e.target.value)}
          placeholder="Message (Ctrl+Enter to commit)"
          className="mb-3 bg-[#3c3c3c] border-[#3e3e42] text-white placeholder-[#cccccc] focus:border-[#007acc]"
        />
        
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            className="flex-1 bg-[#007acc] hover:bg-[#1177bb] text-white"
            disabled={!commitMessage.trim()}
          >
            <GitCommit className="h-4 w-4 mr-2" />
            Commit
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-[#3e3e42] text-[#cccccc] hover:bg-[#3e3e42]"
          >
            <Upload className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-[#3e3e42] text-[#cccccc] hover:bg-[#3e3e42]"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Changes */}
      <div className="flex-1 overflow-auto">
        <div className="p-3">
          <div className="text-xs text-[#cccccc] mb-3 uppercase tracking-wider">
            Changes ({changes.length})
          </div>

          <div className="space-y-1">
            {changes.map((change, index) => (
              <motion.div
                key={change.file}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center py-1 px-2 hover:bg-[#2a2d2e] cursor-pointer rounded group"
              >
                <div className="mr-2">
                  {getStatusIcon(change.status)}
                </div>
                <FileText className="h-4 w-4 mr-2 text-[#cccccc]" />
                <span className="flex-1 text-sm text-[#cccccc] truncate">
                  {change.file}
                </span>
                <span className="text-xs text-[#6a6a6a] mr-2">
                  {getStatusText(change.status)}
                </span>
                
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 text-[#cccccc] hover:bg-[#3e3e42]"
                    title="Stage Changes"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 text-[#cccccc] hover:bg-[#3e3e42]"
                    title="Discard Changes"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
