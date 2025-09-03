'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bot, User, X, Send, Sparkles, Code, RefreshCw, Copy, ThumbsUp, ThumbsDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface AIChatProps {
  onClose: () => void
}

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  code?: string
  language?: string
}

export function AIChat({ onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '👋 Hi! I\'m your AI coding assistant powered by CodeFlow. I can help you:\n\n• **Write and debug code** with context awareness\n• **Explain complex concepts** in simple terms\n• **Refactor and optimize** your existing code\n• **Generate tests** and documentation\n• **Review code** for best practices\n\nWhat would you like to work on today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const sendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(input),
        timestamp: new Date(),
        ...(input.toLowerCase().includes('code') && {
          code: getCodeExample(input),
          language: 'typescript'
        })
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('react') || input.includes('component')) {
      return `I'll help you create a React component! Here's a modern TypeScript React component with hooks:`
    }
    
    if (input.includes('function') || input.includes('typescript')) {
      return `Here's a TypeScript function with proper typing and error handling:`
    }
    
    if (input.includes('debug') || input.includes('error') || input.includes('fix')) {
      return `I can help you debug that! Here are some common debugging strategies:

🔍 **Quick Debug Checklist:**
• Check the browser console for error messages
• Verify variable names and their scope
• Ensure proper TypeScript types
• Check for missing imports or dependencies
• Validate API endpoints and data structures

Share your specific error message or problematic code, and I'll provide targeted solutions!`
    }
    
    if (input.includes('optimize') || input.includes('performance')) {
      return `Great question about optimization! Here are some performance improvement techniques:`
    }
    
    return `I understand you need help with coding. Here are some ways I can assist:

🚀 **What I can help with:**
• **Code Generation** - Write functions, components, or entire features
• **Debugging** - Find and fix errors in your code
• **Code Review** - Analyze and improve existing code
• **Explanations** - Break down complex programming concepts
• **Testing** - Write unit tests and integration tests
• **Refactoring** - Clean up and optimize your codebase

What specific coding challenge are you working on?`
  }

  const getCodeExample = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('react') || input.includes('component')) {
      return `import React, { useState, useEffect } from 'react';

interface UserProfileProps {
  userId: string;
  onUpdate?: (user: User) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
  userId, 
  onUpdate 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        
        const userData = await response.json();
        setUser(userData);
        onUpdate?.(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, onUpdate]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <img 
        src={user.avatar || '/default-avatar.png'} 
        alt={user.name}
        className="avatar"
      />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};`
    }
    
    if (input.includes('function') || input.includes('typescript')) {
      return `// Advanced TypeScript function with generics and error handling
async function fetchData<T>(
  url: string,
  options?: RequestInit
): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data: T = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Fetch error:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Usage example
interface User {
  id: number;
  name: string;
  email: string;
}

const { data: user, error } = await fetchData<User>('/api/user/123');

if (error) {
  console.error('Failed to fetch user:', error);
} else if (user) {
  console.log('User loaded:', user.name);
}`
    }
    
    return `// Example code based on your request
function exampleFunction() {
  console.log('This is an example!');
}`
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    console.log('Code copied to clipboard!')
  }

  const quickActions = [
    { icon: Code, label: 'Generate Code', prompt: 'Help me write a function that...' },
    { icon: RefreshCw, label: 'Refactor', prompt: 'Can you help me refactor this code?' },
    { icon: Sparkles, label: 'Explain', prompt: 'Can you explain how this works?' }
  ]

  return (
    <div className="h-full flex flex-col bg-[#252526]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#3e3e42]">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bot className="h-6 w-6 text-[#007acc]" />
            <motion.div 
              className="absolute inset-0 bg-[#007acc]/20 rounded-full blur-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <span className="font-medium text-white">AI Assistant</span>
            <div className="text-xs text-[#cccccc]">Powered by CodeFlow AI</div>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="text-[#cccccc] hover:bg-[#3e3e42] hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-[#3e3e42]">
        <div className="text-xs text-[#cccccc] mb-2">Quick Actions</div>
        <div className="flex gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              className="text-xs bg-[#3c3c3c] border-[#3e3e42] hover:bg-[#3e3e42] text-[#cccccc]"
              onClick={() => setInput(action.prompt)}
            >
              <action.icon className="h-3 w-3 mr-1" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-[#007acc] text-white'
                      : 'bg-[#3c3c3c] text-[#cccccc] border border-[#3e3e42]'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'ai' && (
                      <Bot className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#007acc]" />
                    )}
                    {message.type === 'user' && (
                      <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </div>
                      
                      {message.code && (
                        <div className="mt-3 bg-[#1e1e1e] rounded-lg border border-[#3e3e42] overflow-hidden">
                          <div className="flex items-center justify-between px-3 py-2 bg-[#2d2d30] border-b border-[#3e3e42]">
                            <span className="text-xs text-[#cccccc]">{message.language}</span>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-[#cccccc] hover:bg-[#3e3e42]"
                                onClick={() => copyCode(message.code!)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <pre className="p-3 text-sm text-[#d4d4d4] overflow-x-auto">
                            <code>{message.code}</code>
                          </pre>
                        </div>
                      )}
                      
                      {message.type === 'ai' && (
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-[#cccccc] hover:bg-[#3e3e42]"
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-[#cccccc] hover:bg-[#3e3e42]"
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-[#cccccc] hover:bg-[#3e3e42]"
                            onClick={() => copyCode(message.content)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-[#3c3c3c] border border-[#3e3e42] rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-[#007acc]" />
                  <div className="flex space-x-1">
                    <motion.div 
                      className="w-2 h-2 bg-[#007acc] rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-[#007acc] rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-[#007acc] rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-[#3e3e42]">
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your code..."
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="bg-[#3c3c3c] border-[#3e3e42] text-white placeholder-[#cccccc] focus:border-[#007acc] focus:ring-1 focus:ring-[#007acc]"
          />
          <Button 
            onClick={sendMessage} 
            disabled={!input.trim() || isTyping}
            className="bg-[#007acc] hover:bg-[#1177bb] border-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
