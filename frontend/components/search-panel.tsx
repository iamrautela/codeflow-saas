'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Replace, CaseSensitive, Regex, FileText, ChevronRight, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

export function SearchPanel() {
  const [searchQuery, setSearchQuery] = useState('')
  const [replaceQuery, setReplaceQuery] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [useRegex, setUseRegex] = useState(false)
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set())

  const searchResults = [
    {
      file: 'src/App.tsx',
      matches: [
        { line: 15, text: 'const [count, setCount] = useState(0);', match: 'count' },
        { line: 23, text: 'return <div>Count: {count}</div>', match: 'count' }
      ]
    },
    {
      file: 'src/components/Header.tsx',
      matches: [
        { line: 8, text: 'const counter = useCounter();', match: 'count' }
      ]
    }
  ]

  const toggleFileExpansion = (file: string) => {
    const newExpanded = new Set(expandedFiles)
    if (newExpanded.has(file)) {
      newExpanded.delete(file)
    } else {
      newExpanded.add(file)
    }
    setExpandedFiles(newExpanded)
  }

  return (
    <div className="h-full flex flex-col bg-[#252526]">
      {/* Header */}
      <div className="p-3 border-b border-[#3e3e42]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[#cccccc] uppercase tracking-wider">
            Search
          </span>
        </div>
      </div>

      {/* Search Form */}
      <div className="p-3 space-y-3 border-b border-[#3e3e42]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#cccccc]" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="pl-10 bg-[#3c3c3c] border-[#3e3e42] text-white placeholder-[#cccccc] focus:border-[#007acc]"
          />
        </div>

        <div className="relative">
          <Replace className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#cccccc]" />
          <Input
            value={replaceQuery}
            onChange={(e) => setReplaceQuery(e.target.value)}
            placeholder="Replace"
            className="pl-10 bg-[#3c3c3c] border-[#3e3e42] text-white placeholder-[#cccccc] focus:border-[#007acc]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${caseSensitive ? 'bg-[#007acc] text-white' : 'text-[#cccccc] hover:bg-[#3e3e42]'}`}
            onClick={() => setCaseSensitive(!caseSensitive)}
            title="Match Case"
          >
            <CaseSensitive className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${useRegex ? 'bg-[#007acc] text-white' : 'text-[#cccccc] hover:bg-[#3e3e42]'}`}
            onClick={() => setUseRegex(!useRegex)}
            title="Use Regular Expression"
          >
            <Regex className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex space-x-2">
          <Button size="sm" className="flex-1 bg-[#007acc] hover:bg-[#1177bb] text-white">
            Replace All
          </Button>
          <Button size="sm" variant="outline" className="flex-1 border-[#3e3e42] text-[#cccccc] hover:bg-[#3e3e42]">
            Replace
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-auto">
        {searchQuery && (
          <div className="p-3">
            <div className="text-xs text-[#cccccc] mb-3">
              {searchResults.reduce((total, file) => total + file.matches.length, 0)} results in {searchResults.length} files
            </div>

            {searchResults.map((result) => (
              <motion.div
                key={result.file}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-2"
              >
                <div
                  className="flex items-center py-1 px-2 hover:bg-[#2a2d2e] cursor-pointer rounded text-sm"
                  onClick={() => toggleFileExpansion(result.file)}
                >
                  <motion.div
                    animate={{ rotate: expandedFiles.has(result.file) ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="h-3 w-3 mr-1 text-[#cccccc]" />
                  </motion.div>
                  <FileText className="h-4 w-4 mr-2 text-[#cccccc]" />
                  <span className="text-[#cccccc] flex-1">{result.file}</span>
                  <span className="text-xs text-[#6a6a6a]">{result.matches.length}</span>
                </div>

                {expandedFiles.has(result.file) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-6 space-y-1"
                  >
                    {result.matches.map((match, index) => (
                      <div
                        key={index}
                        className="flex items-center py-1 px-2 hover:bg-[#2a2d2e] cursor-pointer rounded text-xs"
                      >
                        <span className="text-[#6a6a6a] w-8 text-right mr-2">
                          {match.line}
                        </span>
                        <span className="text-[#cccccc] font-mono">
                          {match.text.split(match.match).map((part, i, arr) => (
                            <span key={i}>
                              {part}
                              {i < arr.length - 1 && (
                                <span className="bg-[#613214] text-[#ff6b35] px-1">
                                  {match.match}
                                </span>
                              )}
                            </span>
                          ))}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
