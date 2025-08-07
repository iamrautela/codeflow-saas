'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bot, User, X, Send, Sparkles, Code, RefreshCw } from 'lucide-react'

interface AIAssistantProps {
  onClose: () => void
}

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

export function AIAssistant({ onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '👋 Hi! I\'m your AI coding assistant. I can help you:\n\n• Write and debug code\n• Explain complex concepts\n• Refactor and optimize\n• Generate tests and documentation\n\nWhat would you like to work on?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

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
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('function') || input.includes('how to create')) {
      return `Here's a function that might help:

\`\`\`javascript
function createComponent(name, props = {}) {
  return {
    name,
    props,
    render() {
      return \`<div class="\${name}">\${props.content || 'Hello World'}</div>\`;
    }
  };
}

// Usage
const myComponent = createComponent('my-component', { 
  content: 'Welcome to CodeFlow!' 
});
\`\`\`

This creates a reusable component factory. Would you like me to explain any part or help you customize it?`
    }
    
    if (input.includes('debug') || input.includes('error') || input.includes('fix')) {
      return `I can help you debug that! Here are some common debugging strategies:

🔍 **Quick Debug Checklist:**
• Check console for error messages
• Verify variable names and scope
• Ensure proper syntax (missing semicolons, brackets)
• Check API endpoints and data types

Share your error message or problematic code, and I'll provide specific solutions!`
    }
    
    if (input.includes('refactor') || input.includes('optimize')) {
      return `I'd be happy to help refactor your code! Here are some optimization techniques:

✨ **Code Refactoring Tips:**
• Extract reusable functions
• Use descriptive variable names
• Implement proper error handling
• Optimize loops and conditionals
• Apply design patterns where appropriate

Share the code you'd like to improve, and I'll suggest specific optimizations with examples!`
    }
    
    if (input.includes('test') || input.includes('testing')) {
      return `Let me help you write tests! Here's a basic test structure:

\`\`\`javascript
// Example test using Jest
describe('Calculator', () => {
  test('should add two numbers correctly', () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });
  
  test('should handle edge cases', () => {
    expect(add(0, 0)).toBe(0);
    expect(add(-1, 1)).toBe(0);
  });
});
\`\`\`

What functionality would you like to test?`
    }
    
    if (input.includes('explain') || input.includes('what is')) {
      return `I'd be happy to explain that concept! Here's a clear breakdown:

📚 **Key Points:**
• Core concept and purpose
• How it works in practice
• Common use cases
• Best practices and gotchas

Could you be more specific about what you'd like me to explain? I can provide detailed explanations with code examples.`
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

  const quickActions = [
    { icon: Code, label: 'Generate Code', prompt: 'Help me write a function that...' },
    { icon: RefreshCw, label: 'Refactor', prompt: 'Can you help me refactor this code?' },
    { icon: Sparkles, label: 'Explain', prompt: 'Can you explain how this works?' }
  ]

  return (
    <div className="h-full flex flex-col bg-[#0f0f0f]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bot className="h-6 w-6 text-blue-400" />
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg" />
          </div>
          <div>
            <span className="font-medium text-white">AI Assistant</span>
            <div className="text-xs text-gray-400">Powered by CodeFlow AI</div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:bg-gray-800 hover:text-white">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-800/50">
        <div className="text-xs text-gray-400 mb-2">Quick Actions</div>
        <div className="flex gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              className="text-xs bg-gray-800/50 border-gray-700 hover:bg-gray-700 text-gray-300"
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
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800/50 text-gray-100 border border-gray-700/50'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'ai' && (
                    <Bot className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-400" />
                  )}
                  {message.type === 'user' && (
                    <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-blue-400" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-gray-800/50">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your code..."
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-400"
          />
          <Button 
            onClick={sendMessage} 
            disabled={!input.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 border-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
