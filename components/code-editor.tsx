'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { X, Circle, MoreHorizontal, Split, Copy, Save } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'

interface CodeEditorProps {
  activeFile: string
  terminalHeight: number
}

const getLanguageFromFile = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase()
  const languageMap: Record<string, string> = {
    'js': 'JavaScript',
    'jsx': 'JavaScript React',
    'ts': 'TypeScript',
    'tsx': 'TypeScript React',
    'css': 'CSS',
    'scss': 'SCSS',
    'sass': 'Sass',
    'html': 'HTML',
    'json': 'JSON',
    'md': 'Markdown',
    'py': 'Python',
    'java': 'Java',
    'cpp': 'C++',
    'c': 'C',
    'php': 'PHP',
    'rb': 'Ruby',
    'go': 'Go',
    'rs': 'Rust',
    'vue': 'Vue',
    'svelte': 'Svelte'
  }
  return languageMap[ext || ''] || 'Plain Text'
}

const getVSCodeIcon = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase()
  const iconMap: Record<string, string> = {
    'js': '🟨', 'jsx': '⚛️', 'ts': '🔷', 'tsx': '⚛️',
    'html': '🌐', 'css': '🎨', 'scss': '💅', 'json': '📋',
    'md': '📝', 'py': '🐍', 'java': '☕', 'cpp': '⚙️',
    'c': '⚙️', 'php': '🐘', 'rb': '💎', 'go': '🐹',
    'rs': '🦀', 'vue': '💚', 'svelte': '🧡'
  }
  return iconMap[ext || ''] || '📄'
}

const getInitialCode = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase()
  
  const templates: Record<string, string> = {
    'tsx': `import React, { useState, useEffect } from 'react';
import './App.css';

interface AppProps {
  title?: string;
}

const App: React.FC<AppProps> = ({ title = 'CodeFlow' }) => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log('App component mounted');
    return () => {
      console.log('App component unmounted');
    };
  }, []);

  const handleIncrement = async () => {
    setIsLoading(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    setCount(prev => prev + 1);
    setIsLoading(false);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>{title}</h1>
        <p>Welcome to your React TypeScript application!</p>
      </header>
      
      <main className="app-main">
        <div className="counter-section">
          <h2>Counter: {count}</h2>
          <div className="button-group">
            <button 
              onClick={handleIncrement}
              disabled={isLoading}
              className="btn btn-primary"
            >
              {isLoading ? 'Loading...' : 'Increment'}
            </button>
            <button 
              onClick={handleReset}
              className="btn btn-secondary"
            >
              Reset
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;`,
    'css': `/* ${filename} */
/* Modern CSS with CSS Grid and Flexbox */

:root {
  --primary-color: #007acc;
  --secondary-color: #1e1e1e;
  --accent-color: #00d4ff;
  --text-color: #ffffff;
  --bg-color: #0a0a0a;
  --border-radius: 8px;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
              'Helvetica Neue', Arial, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  line-height: 1.6;
}

.app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 2rem;
  padding: 2rem;
}

.app-header {
  text-align: center;
  padding: 2rem 0;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.app-header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.app-main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.counter-section {
  background: var(--secondary-color);
  padding: 3rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  text-align: center;
  min-width: 300px;
}

.counter-section h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--accent-color);
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  min-width: 120px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 122, 204, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: transparent;
  color: var(--text-color);
  border: 2px solid var(--primary-color);
}

.btn-secondary:hover {
  background: var(--primary-color);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .app {
    padding: 1rem;
  }
  
  .app-header h1 {
    font-size: 2rem;
  }
  
  .counter-section {
    padding: 2rem;
  }
  
  .button-group {
    flex-direction: column;
  }
}`,
    'js': `// ${filename}
// Modern JavaScript with ES6+ features

import { createApp } from './utils/app.js';
import { ApiService } from './services/api.js';

class CodeFlowApp {
  constructor() {
    this.state = {
      isLoading: false,
      data: null,
      error: null
    };
    
    this.apiService = new ApiService();
    this.init();
  }

  async init() {
    try {
      console.log('🚀 Initializing CodeFlow App...');
      
      await this.loadInitialData();
      this.setupEventListeners();
      this.render();
      
      console.log('✅ App initialized successfully!');
    } catch (error) {
      console.error('❌ Failed to initialize app:', error);
      this.handleError(error);
    }
  }

  async loadInitialData() {
    this.setState({ isLoading: true });
    
    try {
      const data = await this.apiService.fetchData();
      this.setState({ data, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  }

  setupEventListeners() {
    // Modern event delegation
    document.addEventListener('click', this.handleClick.bind(this));
    document.addEventListener('keydown', this.handleKeydown.bind(this));
    
    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('[data-lazy]').forEach(el => {
      observer.observe(el);
    });
  }

  handleClick(event) {
    const { target } = event;
    
    // Handle button clicks with data attributes
    if (target.matches('[data-action]')) {
      event.preventDefault();
      const action = target.dataset.action;
      this.executeAction(action, target);
    }
  }

  handleKeydown(event) {
    // Keyboard shortcuts
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case 's':
          event.preventDefault();
          this.saveData();
          break;
        case 'r':
          event.preventDefault();
          this.refreshData();
          break;
      }
    }
  }

  executeAction(action, element) {
    const actions = {
      'increment': () => this.increment(),
      'decrement': () => this.decrement(),
      'reset': () => this.reset(),
      'save': () => this.saveData(),
      'load': () => this.loadInitialData()
    };

    if (actions[action]) {
      actions[action]();
    } else {
      console.warn(\`Unknown action: \${action}\`);
    }
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  render() {
    const { isLoading, data, error } = this.state;
    
    if (isLoading) {
      this.renderLoading();
    } else if (error) {
      this.renderError(error);
    } else {
      this.renderContent(data);
    }
  }

  renderLoading() {
    document.getElementById('app').innerHTML = \`
      <div class="loading">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>
    \`;
  }

  renderError(error) {
    document.getElementById('app').innerHTML = \`
      <div class="error">
        <h2>Oops! Something went wrong</h2>
        <p>\${error}</p>
        <button data-action="load">Try Again</button>
      </div>
    \`;
  }

  renderContent(data) {
    document.getElementById('app').innerHTML = \`
      <div class="app-content">
        <h1>Welcome to CodeFlow!</h1>
        <div class="data-display">
          \${data ? JSON.stringify(data, null, 2) : 'No data available'}
        </div>
        <div class="actions">
          <button data-action="save">Save</button>
          <button data-action="load">Refresh</button>
        </div>
      </div>
    \`;
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new CodeFlowApp());
} else {
  new CodeFlowApp();
}

export default CodeFlowApp;`,
    'json': `{
  "name": "codeflow-project",
  "version": "1.0.0",
  "description": "A modern development environment built with CodeFlow",
  "main": "src/index.tsx",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src --ext .ts,.tsx,.js,.jsx",
    "lint:fix": "eslint src --ext .ts,.tsx,.js,.jsx --fix",
    "format": "prettier --write src/**/*.{ts,tsx,js,jsx,css,md}",
    "type-check": "tsc --noEmit",
    "dev": "concurrently \\"npm run start\\" \\"npm run type-check -- --watch\\"",
    "analyze": "npm run build && npx bundle-analyzer build/static/js/*.js"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "axios": "^1.3.0",
    "framer-motion": "^10.0.0",
    "lucide-react": "^0.294.0",
    "@radix-ui/react-dialog": "^1.0.0",
    "@radix-ui/react-dropdown-menu": "^2.0.0",
    "clsx": "^1.2.1",
    "tailwind-merge": "^1.10.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@types/node": "^18.0.0",
    "@typescript-eslint/eslint-plugin": "^5.0.0",
    "@typescript-eslint/parser": "^5.0.0",
    "eslint": "^8.0.0",
    "eslint-config-react-app": "^7.0.0",
    "eslint-plugin-react": "^7.32.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "prettier": "^2.8.0",
    "typescript": "^4.9.0",
    "react-scripts": "5.0.1",
    "concurrently": "^7.6.0",
    "bundle-analyzer": "^0.1.0"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "keywords": [
    "react",
    "typescript",
    "codeflow",
    "editor",
    "development"
  ],
  "author": "CodeFlow Team",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/codeflow/project.git"
  },
  "bugs": {
    "url": "https://github.com/codeflow/project/issues"
  },
  "homepage": "https://codeflow.dev"
}`
  }
  
  return templates[ext || ''] || `// ${filename}
// Welcome to CodeFlow!

console.log('Hello from CodeFlow!');

// Start coding here...
function main() {
  // Your code goes here
}

main();`
}

export function CodeEditor({ activeFile, terminalHeight }: CodeEditorProps) {
  const [openTabs, setOpenTabs] = useState<string[]>(['src/App.tsx'])
  const [fileContents, setFileContents] = useState<Record<string, string>>({})
  const [unsavedFiles, setUnsavedFiles] = useState<Set<string>>(new Set())
  const editorRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!openTabs.includes(activeFile)) {
      setOpenTabs([...openTabs, activeFile])
    }
    
    if (!fileContents[activeFile]) {
      setFileContents(prev => ({
        ...prev,
        [activeFile]: getInitialCode(activeFile)
      }))
    }
  }, [activeFile, openTabs, fileContents])

  const closeTab = (file: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    const newTabs = openTabs.filter(tab => tab !== file)
    setOpenTabs(newTabs)
    
    // Remove from unsaved files
    const newUnsaved = new Set(unsavedFiles)
    newUnsaved.delete(file)
    setUnsavedFiles(newUnsaved)
  }

  const updateFileContent = (file: string, content: string) => {
    setFileContents(prev => ({
      ...prev,
      [file]: content
    }))
    
    // Mark as unsaved
    const newUnsaved = new Set(unsavedFiles)
    newUnsaved.add(file)
    setUnsavedFiles(newUnsaved)
  }

  const saveFile = (file: string) => {
    const newUnsaved = new Set(unsavedFiles)
    newUnsaved.delete(file)
    setUnsavedFiles(newUnsaved)
    console.log(`Saved: ${file}`)
  }

  const currentContent = fileContents[activeFile] || getInitialCode(activeFile)
  const lineCount = currentContent.split('\n').length

  return (
    <div className="flex-1 flex flex-col bg-[#1e1e1e]">
      {/* Tab Bar */}
      <div className="flex bg-[#2d2d30] border-b border-[#3e3e42] overflow-x-auto">
        <AnimatePresence>
          {openTabs.map((tab, index) => (
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center px-3 py-2 border-r border-[#3e3e42] cursor-pointer group min-w-0 max-w-48 ${
                tab === activeFile 
                  ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]' 
                  : 'hover:bg-[#37373d] text-[#cccccc]'
              }`}
              onClick={() => {/* Tab switching handled by parent */}}
            >
              <span className="mr-2 text-sm flex-shrink-0">
                {getVSCodeIcon(tab)}
              </span>
              <span className="text-sm truncate mr-2">{tab.split('/').pop()}</span>
              
              {unsavedFiles.has(tab) && (
                <Circle className="h-2 w-2 fill-white text-white mr-1 flex-shrink-0" />
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 hover:bg-[#3e3e42] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1e1e1e] border-[#3e3e42] text-[#cccccc]">
                  <DropdownMenuItem onClick={() => closeTab(tab)} className="hover:bg-[#2a2d2e]">
                    Close
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => saveFile(tab)} className="hover:bg-[#2a2d2e]">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#3e3e42]" />
                  <DropdownMenuItem className="hover:bg-[#2a2d2e]">
                    <Split className="h-4 w-4 mr-2" />
                    Split Right
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#2a2d2e]">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Path
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Breadcrumb */}
      <div className="px-4 py-1 bg-[#1e1e1e] border-b border-[#3e3e42] text-xs text-[#cccccc]">
        {activeFile.split('/').map((part, index, array) => (
          <span key={index}>
            {part}
            {index < array.length - 1 && <span className="mx-1 text-[#6a6a6a]">›</span>}
          </span>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 relative" style={{ height: `calc(100vh - 200px - ${terminalHeight}px)` }}>
        {/* Line numbers */}
        <div className="absolute left-0 top-0 w-12 h-full bg-[#1e1e1e] border-r border-[#3e3e42] text-xs text-[#858585] p-2 pointer-events-none z-10 select-none overflow-hidden">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="leading-6 text-right pr-2 font-mono">
              {i + 1}
            </div>
          ))}
        </div>
        
        <textarea
          ref={editorRef}
          value={currentContent}
          onChange={(e) => updateFileContent(activeFile, e.target.value)}
          className="w-full h-full pl-14 pr-4 py-2 bg-[#1e1e1e] border-none outline-none resize-none font-mono text-sm text-[#d4d4d4] leading-6"
          placeholder="Start coding..."
          spellCheck={false}
          style={{
            tabSize: 2,
            fontFamily: "'Cascadia Code', 'Fira Code', 'JetBrains Mono', Consolas, Monaco, 'Courier New', monospace"
          }}
        />
        
        {/* Minimap placeholder */}
        <div className="absolute top-0 right-0 w-20 h-full bg-[#1e1e1e] border-l border-[#3e3e42] opacity-50">
          <div className="p-2 text-xs text-[#6a6a6a]">
            <div className="w-full h-2 bg-[#007acc] mb-1 opacity-30"></div>
            <div className="w-3/4 h-1 bg-[#cccccc] mb-1 opacity-20"></div>
            <div className="w-full h-1 bg-[#cccccc] mb-1 opacity-20"></div>
            <div className="w-1/2 h-1 bg-[#cccccc] mb-1 opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
