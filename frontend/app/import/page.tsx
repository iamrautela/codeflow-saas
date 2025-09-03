'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, Github, FolderOpen, Plus, Code2, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ImportPage() {
  const [isImporting, setIsImporting] = useState(false)
  const [importType, setImportType] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setIsImporting(true)
      setImportType('files')
      setTimeout(() => {
        localStorage.setItem('codeflow-project', JSON.stringify({
          name: 'My Project',
          files: ['index.html', 'style.css', 'script.js']
        }))
        window.location.href = '/editor'
      }, 2000)
    }
  }

  const handleGithubImport = () => {
    setIsImporting(true)
    setImportType('github')
    setTimeout(() => {
      localStorage.setItem('codeflow-project', JSON.stringify({
        name: 'GitHub Project',
        files: ['README.md', 'package.json', 'src/index.js']
      }))
      window.location.href = '/editor'
    }, 2000)
  }

  const handleNewProject = () => {
    setIsImporting(true)
    setImportType('new')
    setTimeout(() => {
      localStorage.setItem('codeflow-project', JSON.stringify({
        name: 'New Project',
        files: ['index.js']
      }))
      window.location.href = '/editor'
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Code2 className="h-8 w-8 text-blue-400" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              CodeFlow
            </span>
          </div>
        </div>
      </header>

      {/* Import Section */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm mb-6">
            <Sparkles className="h-4 w-4 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-300">Ready to start coding</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Import your project
          </h1>
          <p className="text-xl text-gray-400">
            Choose how you'd like to get started with CodeFlow
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Upload Files */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group h-full">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Upload Files</CardTitle>
                <CardDescription className="text-gray-400">
                  Upload your existing project files or folders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    webkitdirectory=""
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={isImporting}
                  />
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0" 
                    disabled={isImporting}
                  >
                    {isImporting && importType === 'files' ? 'Importing...' : 'Choose Files'}
                  </Button>
                </Label>
              </CardContent>
            </Card>
          </motion.div>

          {/* GitHub Import */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group h-full">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Github className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Import from GitHub</CardTitle>
                <CardDescription className="text-gray-400">
                  Clone a repository directly from GitHub
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0" 
                  onClick={handleGithubImport} 
                  disabled={isImporting}
                >
                  {isImporting && importType === 'github' ? 'Importing...' : 'Connect GitHub'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* New Project */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group h-full">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">New Project</CardTitle>
                <CardDescription className="text-gray-400">
                  Start fresh with a blank project template
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-0" 
                  onClick={handleNewProject} 
                  disabled={isImporting}
                >
                  {isImporting && importType === 'new' ? 'Creating...' : 'Create Project'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
