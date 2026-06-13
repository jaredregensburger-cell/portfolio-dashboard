'use client'

import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { useUIStore } from '@/store'
import { cn } from '@/lib/utils'

interface AppShellProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  topbarActions?: React.ReactNode
}

export function AppShell({ children, title, subtitle, topbarActions }: AppShellProps) {
  const { sidebar } = useUIStore()
  const isCollapsed = sidebar === 'collapsed'

  return (
    <div className="min-h-screen bg-void">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div
        className={cn(
          'flex flex-col min-h-screen transition-all duration-300 ease-in-out',
          isCollapsed ? 'ml-16' : 'ml-sidebar'
        )}
      >
        <Topbar title={title} subtitle={subtitle} actions={topbarActions} />
        <main className="flex-1 p-6 overflow-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  )
}
