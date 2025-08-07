'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TerminalIcon, X, Plus, Maximize2, Minimize2, Split, Trash2, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TerminalProps {
  height: number
  onHeightChange: (height: number) => void
  onClose: () => void
}

interface TerminalTab {
  id: string
  name: string
  output: string
  currentDirectory: string
  isActive: boolean
}

export function Terminal({ height, onHeightChange, onClose }: TerminalProps) {
  const [tabs, setTabs] = useState<TerminalTab[]>([
    {
      id: '1',
      name: 'bash',
      output: 'Welcome to CodeFlow Terminal\n$ ',
      currentDirectory: '/workspace/codeflow-project',
      isActive: true
    }
  ])
  const [activeTabId, setActiveTabId] = useState('1')
  const [command, setCommand] = useState('')
  const [isMaximized, setIsMaximized] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const activeTab = tabs.find(tab => tab.id === activeTabId)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [activeTab?.output])

  const executeCommand = (cmd: string) => {
    if (!activeTab) return

    const newOutput = activeTab.output + cmd + '\n'
    let commandOutput = ''

    // Simulate command execution
    switch (cmd.toLowerCase().trim()) {
      case 'clear':
        setTabs(tabs.map(tab => 
          tab.id === activeTabId 
            ? { ...tab, output: '$ ' }
            : tab
        ))
        return

      case 'ls':
      case 'dir':
        commandOutput = `package.json  README.md  tsconfig.json  .gitignore  .env
src/          public/       node_modules/  build/
\n$ `
        break

      case 'pwd':
        commandOutput = `${activeTab.currentDirectory}\n$ `
        break

      case 'whoami':
        commandOutput = 'codeflow-user\n$ '
        break

      case 'date':
        commandOutput = `${new Date().toString()}\n$ `
        break

      case 'node --version':
      case 'node -v':
        commandOutput = 'v18.17.0\n$ '
        break

      case 'npm --version':
      case 'npm -v':
        commandOutput = '9.6.7\n$ '
        break

      case 'git --version':
        commandOutput = 'git version 2.41.0\n$ '
        break

      case 'npm install':
        commandOutput = `Installing dependencies...
⠋ Installing packages...
⠙ Building fresh packages...
✓ Dependencies installed successfully!

added 1247 packages, and audited 1248 packages in 12s

found 0 vulnerabilities
\n$ `
        break

      case 'npm start':
        commandOutput = `> codeflow-project@1.0.0 start
> react-scripts start

Starting the development server...

Local:            http://localhost:3000
On Your Network:  http://192.168.1.100:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
\n$ `
        break

      case 'npm run build':
        commandOutput = `> codeflow-project@1.0.0 build
> react-scripts build

Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  46.61 KB  build/static/js/2.8b4a5f7c.chunk.js
  1.78 KB   build/static/js/3.c5b5c3f2.chunk.js
  1.17 KB   build/static/js/runtime-main.4a686d48.js
  648 B     build/static/css/main.9d5b29c0.chunk.css

The project was built assuming it is hosted at /.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.
\n$ `
        break

      case 'git status':
        commandOutput = `On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   src/App.tsx
        modified:   src/components/Header.tsx

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        src/components/NewComponent.tsx

no changes added to commit (use "git add ." or "git commit -a")
\n$ `
        break

      case 'git log --oneline':
        commandOutput = `a1b2c3d (HEAD -> main, origin/main) feat: add new component
e4f5g6h fix: resolve styling issues
i7j8k9l docs: update README
m0n1o2p initial commit
\n$ `
        break

      case 'help':
        commandOutput = `Available commands:
  ls, dir          - List directory contents
  pwd              - Print working directory
  clear            - Clear terminal
  whoami           - Current user
  date             - Current date and time
  node -v          - Node.js version
  npm -v           - npm version
  git --version    - Git version
  npm install      - Install dependencies
  npm start        - Start development server
  npm run build    - Build for production
  git status       - Git repository status
  git log          - Git commit history
  help             - Show this help message
\n$ `
        break

      default:
        if (cmd.trim()) {
          commandOutput = `Command not found: ${cmd}
Type 'help' for available commands.
\n$ `
        } else {
          commandOutput = '$ '
        }
    }

    setTabs(tabs.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, output: newOutput + commandOutput }
        : tab
    ))
  }

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(command)
      setCommand('')
    }
  }

  const createNewTab = () => {
    const newId = (tabs.length + 1).toString()
    const newTab: TerminalTab = {
      id: newId,
      name: `bash-${newId}`,
      output: 'Welcome to CodeFlow Terminal\n$ ',
      currentDirectory: '/workspace/codeflow-project',
      isActive: false
    }
    
    setTabs([...tabs, newTab])
    setActiveTabId(newId)
  }

  const closeTab = (tabId: string) => {
    if (tabs.length === 1) return
    
    const newTabs = tabs.filter(tab => tab.id !== tabId)
    setTabs(newTabs)
    
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[0].id)
    }
  }

  return (
    <div className={`flex flex-col bg-[#1e1e1e] text-[#cccccc] ${isMaximized ? 'fixed inset-0 z-50' : ''}`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d30] border-b border-[#3e3e42]">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="h-4 w-4 text-[#cccccc]" />
          <span className="text-sm font-medium">Terminal</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-[#cccccc] hover:bg-[#3e3e42] hover:text-white"
            onClick={createNewTab}
            title="New Terminal"
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-[#cccccc] hover:bg-[#3e3e42] hover:text-white"
            title="Split Terminal"
          >
            <Split className="h-3 w-3" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-[#cccccc] hover:bg-[#3e3e42] hover:text-white"
            onClick={() => setIsMaximized(!isMaximized)}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-[#cccccc] hover:bg-[#3e3e42] hover:text-white"
            title="Settings"
          >
            <Settings className="h-3 w-3" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-[#cccccc] hover:bg-[#3e3e42] hover:text-white"
            onClick={onClose}
            title="Close Terminal"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Terminal Tabs */}
      <div className="flex bg-[#252526] border-b border-[#3e3e42] overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center px-3 py-1 border-r border-[#3e3e42] cursor-pointer group text-sm ${
              tab.id === activeTabId 
                ? 'bg-[#1e1e1e] text-white' 
                : 'hover:bg-[#2a2d2e] text-[#cccccc]'
            }`}
            onClick={() => setActiveTabId(tab.id)}
          >
            <TerminalIcon className="h-3 w-3 mr-2" />
            <span className="mr-2">{tab.name}</span>
            {tabs.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 hover:bg-[#3e3e42] opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  closeTab(tab.id)
                }}
              >
                <X className="h-2 w-2" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Terminal Content */}
      <div className="flex-1 flex flex-col">
        <div 
          ref={outputRef}
          className="flex-1 p-4 font-mono text-sm overflow-auto bg-[#1e1e1e] text-[#cccccc]"
          onClick={() => inputRef.current?.focus()}
          style={{ height: isMaximized ? 'calc(100vh - 120px)' : `${height - 80}px` }}
        >
          <pre className="whitespace-pre-wrap">{activeTab?.output}</pre>
          <div className="flex items-center">
            <span className="text-[#569cd6]">$ </span>
            <Input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent border-none outline-none text-[#cccccc] ml-1 p-0 h-auto focus:ring-0 focus:border-none"
              autoFocus
            />
            <span className="animate-pulse text-[#cccccc] ml-1">|</span>
          </div>
        </div>
      </div>
    </div>
  )
}
