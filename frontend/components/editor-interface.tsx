'use client'

import { useState, useEffect } from 'react'
import { ActivityBar } from '@/components/activity-bar'
import { FileExplorer } from '@/components/file-explorer'
import { CodeEditor } from '@/components/code-editor'
import { Terminal } from '@/components/terminal'
import { StatusBar } from '@/components/status-bar'
import { CommandPalette } from '@/components/command-palette'
import { AIChat } from '@/components/ai-chat'
import { SearchPanel } from '@/components/search-panel'
import { SourceControlPanel } from '@/components/source-control-panel'
import { motion, AnimatePresence } from 'framer-motion'

export function EditorInterface() {
  const [activePanel, setActivePanel] = useState('explorer')
  const [activeFile, setActiveFile] = useState('src/App.tsx')
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [showAIChat, setShowAIChat] = useState(false)
  const [terminalHeight, setTerminalHeight] = useState(300)
  const [showTerminal, setShowTerminal] = useState(true)
  const [sidebarWidth, setSidebarWidth] = useState(300)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault()
        setShowCommandPalette(true)
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '`') {
        e.preventDefault()
        setShowTerminal(!showTerminal)
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
        e.preventDefault()
        setShowAIChat(!showAIChat)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showTerminal, showAIChat])

  const renderSidePanel = () => {
    switch (activePanel) {
      case 'explorer':
        return <FileExplorer onFileSelect={setActiveFile} activeFile={activeFile} />
      case 'search':
        return <SearchPanel />
      case 'source-control':
        return <SourceControlPanel />
      default:
        return <FileExplorer onFileSelect={setActiveFile} activeFile={activeFile} />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-white overflow-hidden">
      {/* Main Layout */}
      <div className="flex-1 flex">
        {/* Activity Bar */}
        <ActivityBar 
          activePanel={activePanel} 
          onPanelChange={setActivePanel}
          onAIChatToggle={() => setShowAIChat(!showAIChat)}
        />

        {/* Side Panel */}
        <motion.div 
          className="bg-[#252526] border-r border-[#3e3e42]"
          style={{ width: sidebarWidth }}
          initial={{ x: -sidebarWidth }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {renderSidePanel()}
        </motion.div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col">
          <CodeEditor 
            activeFile={activeFile} 
            terminalHeight={showTerminal ? terminalHeight : 0}
          />
          
          {/* Terminal */}
          <AnimatePresence>
            {showTerminal && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: terminalHeight, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="border-t border-[#3e3e42]"
              >
                <Terminal 
                  height={terminalHeight}
                  onHeightChange={setTerminalHeight}
                  onClose={() => setShowTerminal(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI Chat Panel */}
        <AnimatePresence>
          {showAIChat && (
            <motion.div
              className="w-80 bg-[#252526] border-l border-[#3e3e42]"
              initial={{ x: 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <AIChat onClose={() => setShowAIChat(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Status Bar */}
      <StatusBar activeFile={activeFile} />

      {/* Command Palette */}
      <CommandPalette 
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onCommand={(command) => {
          if (command === 'toggle-terminal') setShowTerminal(!showTerminal)
          if (command === 'toggle-ai-chat') setShowAIChat(!showAIChat)
        }}
      />
    </div>
  )
}
