'use client'

import { useState, useEffect } from 'react'
import { EditorInterface } from '@/components/editor-interface'

export default function EditorPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has an active project
    const checkProject = () => {
      const savedProject = localStorage.getItem('codeflow-project')
      if (!savedProject) {
        window.location.href = '/import'
        return
      }
      setIsLoading(false)
    }

    checkProject()
  }, [])

  if (isLoading) {
    return (
      <div className="h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    )
  }

  return <EditorInterface />
}
