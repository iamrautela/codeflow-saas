'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronRight, ChevronDown, File, Folder, FolderOpen, Plus, MoreHorizontal, FileText, Trash2, Edit3, Copy } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { motion, AnimatePresence } from 'framer-motion'

// VS Code file icons
const getVSCodeIcon = (fileName: string, isFolder = false) => {
  if (isFolder) {
    return { icon: '📁', color: '#dcb67a' }
  }

  const ext = fileName.split('.').pop()?.toLowerCase()
  const iconMap: Record<string, { icon: string; color: string }> = {
    'js': { icon: '🟨', color: '#f7df1e' },
    'jsx': { icon: '⚛️', color: '#61dafb' },
    'ts': { icon: '🔷', color: '#3178c6' },
    'tsx': { icon: '⚛️', color: '#61dafb' },
    'html': { icon: '🌐', color: '#e34c26' },
    'css': { icon: '🎨', color: '#1572b6' },
    'scss': { icon: '💅', color: '#cf649a' },
    'json': { icon: '📋', color: '#cbcb41' },
    'md': { icon: '📝', color: '#083fa1' },
    'py': { icon: '🐍', color: '#3776ab' },
    'java': { icon: '☕', color: '#ed8b00' },
    'cpp': { icon: '⚙️', color: '#00599c' },
    'c': { icon: '⚙️', color: '#a8b9cc' },
    'php': { icon: '🐘', color: '#777bb4' },
    'rb': { icon: '💎', color: '#cc342d' },
    'go': { icon: '🐹', color: '#00add8' },
    'rs': { icon: '🦀', color: '#dea584' },
    'vue': { icon: '💚', color: '#4fc08d' },
    'svelte': { icon: '🧡', color: '#ff3e00' },
    'png': { icon: '🖼️', color: '#a855f7' },
    'jpg': { icon: '🖼️', color: '#a855f7' },
    'svg': { icon: '🎭', color: '#ffb13b' },
    'pdf': { icon: '📄', color: '#dc2626' },
    'zip': { icon: '📦', color: '#6b7280' },
    'env': { icon: '⚙️', color: '#eab308' },
    'gitignore': { icon: '🚫', color: '#f97316' },
    'dockerfile': { icon: '🐳', color: '#2496ed' },
    'yml': { icon: '📄', color: '#cb171e' },
    'yaml': { icon: '📄', color: '#cb171e' },
  }

  return iconMap[ext || ''] || { icon: '📄', color: '#6b7280' }
}

interface FileExplorerProps {
  onFileSelect: (file: string) => void
  activeFile: string
}

export function FileExplorer({ onFileSelect, activeFile }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src', 'public']))
  const [files, setFiles] = useState([
    { name: 'package.json', type: 'file', path: 'package.json' },
    { name: 'README.md', type: 'file', path: 'README.md' },
    { name: 'tsconfig.json', type: 'file', path: 'tsconfig.json' },
    { name: '.gitignore', type: 'file', path: '.gitignore' },
    { name: '.env', type: 'file', path: '.env' },
    { name: 'src', type: 'folder', path: 'src', children: [
      { name: 'App.tsx', type: 'file', path: 'src/App.tsx' },
      { name: 'index.tsx', type: 'file', path: 'src/index.tsx' },
      { name: 'App.css', type: 'file', path: 'src/App.css' },
      { name: 'index.css', type: 'file', path: 'src/index.css' },
      { name: 'components', type: 'folder', path: 'src/components', children: [
        { name: 'Header.tsx', type: 'file', path: 'src/components/Header.tsx' },
        { name: 'Footer.tsx', type: 'file', path: 'src/components/Footer.tsx' },
        { name: 'Button.tsx', type: 'file', path: 'src/components/Button.tsx' }
      ]},
      { name: 'hooks', type: 'folder', path: 'src/hooks', children: [
        { name: 'useAuth.ts', type: 'file', path: 'src/hooks/useAuth.ts' },
        { name: 'useApi.ts', type: 'file', path: 'src/hooks/useApi.ts' }
      ]},
      { name: 'utils', type: 'folder', path: 'src/utils', children: [
        { name: 'helpers.ts', type: 'file', path: 'src/utils/helpers.ts' },
        { name: 'constants.ts', type: 'file', path: 'src/utils/constants.ts' }
      ]}
    ]},
    { name: 'public', type: 'folder', path: 'public', children: [
      { name: 'index.html', type: 'file', path: 'public/index.html' },
      { name: 'favicon.ico', type: 'file', path: 'public/favicon.ico' },
      { name: 'logo192.png', type: 'file', path: 'public/logo192.png' },
      { name: 'manifest.json', type: 'file', path: 'public/manifest.json' }
    ]},
    { name: 'node_modules', type: 'folder', path: 'node_modules', children: [] }
  ])
  const [isCreating, setIsCreating] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const [creatingIn, setCreatingIn] = useState('')

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedFolders(newExpanded)
  }

  const createNewFile = (parentPath: string = '') => {
    setIsCreating(true)
    setCreatingIn(parentPath)
  }

  const handleCreateFile = () => {
    if (!newFileName.trim()) return
    
    const newFile = {
      name: newFileName,
      type: 'file' as const,
      path: creatingIn ? `${creatingIn}/${newFileName}` : newFileName
    }

    setFiles(prev => [...prev, newFile])
    setIsCreating(false)
    setNewFileName('')
    setCreatingIn('')
  }

  const renderFileTree = (items: any[], depth = 0) => {
    return items.map((item, index) => (
      <motion.div 
        key={item.path}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.02 }}
      >
        <div
          className={`flex items-center px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer group text-sm ${
            activeFile === item.path 
              ? 'bg-[#37373d] text-white' 
              : 'text-[#cccccc]'
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => {
            if (item.type === 'folder') {
              toggleFolder(item.path)
            } else {
              onFileSelect(item.path)
            }
          }}
        >
          {item.type === 'folder' ? (
            <>
              <motion.div
                animate={{ rotate: expandedFolders.has(item.path) ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="mr-1"
              >
                <ChevronRight className="h-3 w-3 text-[#cccccc]" />
              </motion.div>
              <span className="mr-2 text-sm">
                {expandedFolders.has(item.path) ? '📂' : '📁'}
              </span>
            </>
          ) : (
            <>
              <div className="w-4 mr-1" />
              <span className="mr-2 text-sm">
                {getVSCodeIcon(item.name).icon}
              </span>
            </>
          )}
          
          <span className="flex-1 truncate">{item.name}</span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 opacity-0 group-hover:opacity-100 hover:bg-[#3e3e42] text-[#cccccc]"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1e1e1e] border-[#3e3e42] text-[#cccccc]">
              {item.type === 'folder' && (
                <>
                  <DropdownMenuItem onClick={() => createNewFile(item.path)} className="hover:bg-[#2a2d2e]">
                    <Plus className="h-4 w-4 mr-2" />
                    New File
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#3e3e42]" />
                </>
              )}
              <DropdownMenuItem className="hover:bg-[#2a2d2e]">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2a2d2e]">
                <Edit3 className="h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2a2d2e] text-red-400">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <AnimatePresence>
          {item.type === 'folder' && expandedFolders.has(item.path) && item.children && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderFileTree(item.children, depth + 1)}
              {isCreating && creatingIn === item.path && (
                <motion.div 
                  className="flex items-center px-2 py-1"
                  style={{ paddingLeft: `${(depth + 1) * 12 + 8}px` }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-4 mr-1" />
                  <span className="mr-2 text-sm">📄</span>
                  <Input
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCreateFile()
                      if (e.key === 'Escape') {
                        setIsCreating(false)
                        setNewFileName('')
                      }
                    }}
                    className="h-6 text-sm bg-[#3c3c3c] border-[#007acc] text-white text-xs"
                    placeholder="filename.ext"
                    autoFocus
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    ))
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-[#3e3e42] bg-[#252526]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[#cccccc] uppercase tracking-wider">
            Explorer
          </span>
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-[#cccccc] hover:bg-[#3e3e42] hover:text-white"
              onClick={() => createNewFile()}
              title="New File"
            >
              <Plus className="h-3 w-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-[#cccccc] hover:bg-[#3e3e42] hover:text-white"
              title="Refresh Explorer"
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="text-xs text-[#cccccc] font-medium">CODEFLOW</div>
      </div>
      
      <div className="flex-1 overflow-auto bg-[#252526]">
        {renderFileTree(files)}
        
        <AnimatePresence>
          {isCreating && !creatingIn && (
            <motion.div 
              className="flex items-center px-2 py-1" 
              style={{ paddingLeft: '8px' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <span className="mr-2 text-sm">📄</span>
              <Input
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateFile()
                  if (e.key === 'Escape') {
                    setIsCreating(false)
                    setNewFileName('')
                  }
                }}
                className="h-6 text-sm bg-[#3c3c3c] border-[#007acc] text-white"
                placeholder="filename.ext"
                autoFocus
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
