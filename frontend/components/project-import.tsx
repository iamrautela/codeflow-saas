'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, Github, Plus, X, Sparkles, FolderOpen } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProjectImportProps {
  onProjectImported: () => void
  onClose: () => void
}

export function ProjectImport({ onProjectImported, onClose }: ProjectImportProps) {
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
        onProjectImported()
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
      onProjectImported()
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
      onProjectImported()
    }, 1000)
  }

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }

  return (
    <Card className="bg-gray-900/95 border-gray-800/50 backdrop-blur-xl">
      <CardHeader className="text-center pb-6 relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <X className="h-4 w-4" />
        </Button>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm mb-4">
            <Sparkles className="h-4 w-4 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-300">Ready to start coding</span>
          </div>
        </motion.div>
        
        <CardTitle className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Import your project
        </CardTitle>
        <CardDescription className="text-lg text-gray-400">
          Choose how you'd like to get started with CodeFlow
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Upload Files */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm h-full cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-4 group-hover:shadow-lg group-hover:shadow-blue-500/25"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Upload className="h-8 w-8 text-white" />
                </motion.div>
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
                    {isImporting && importType === 'files' ? (
                      <motion.div className="flex items-center">
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Importing...
                      </motion.div>
                    ) : (
                      'Choose Files'
                    )}
                  </Button>
                </Label>
              </CardContent>
            </Card>
          </motion.div>

          {/* GitHub Import */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm h-full cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-900 p-4 group-hover:shadow-lg group-hover:shadow-gray-500/25"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Github className="h-8 w-8 text-white" />
                </motion.div>
                <CardTitle className="text-white">Import from GitHub</CardTitle>
                <CardDescription className="text-gray-400">
                  Clone a repository directly from GitHub
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 border-0" 
                  onClick={handleGithubImport} 
                  disabled={isImporting}
                >
                  {isImporting && importType === 'github' ? (
                    <motion.div className="flex items-center">
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Importing...
                    </motion.div>
                  ) : (
                    'Connect GitHub'
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* New Project */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm h-full cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 p-4 group-hover:shadow-lg group-hover:shadow-green-500/25"
                  whileHover={{ rotate: -360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Plus className="h-8 w-8 text-white" />
                </motion.div>
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
                  {isImporting && importType === 'new' ? (
                    <motion.div className="flex items-center">
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Creating...
                    </motion.div>
                  ) : (
                    'Create Project'
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
