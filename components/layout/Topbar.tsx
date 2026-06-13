'use client'

import { Bell, Search, ChevronDown } from 'lucide-react'
import { cn, initials } from '@/lib/utils'
import { Button } from '@/components/ui'

interface TopbarProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

const MOCK_USER = {
  displayName: 'Alex Investor',
  email: 'alex@folio.app',
  avatarUrl: null,
}

export function Topbar({ title, subtitle, actions }: TopbarProps) {
  return (
    <header className="flex h-topbar items-center justify-between px-6 border-b border-border bg-surface/80 backdrop-blur-glass shrink-0">
      {/* Left: Title */}
      <div>
        <h1 className="text-data-lg font-semibold text-ink">{title}</h1>
        {subtitle && <p className="text-data-sm text-ink-muted">{subtitle}</p>}
      </div>

      {/* Right: Actions + Search + User */}
      <div className="flex items-center gap-2">
        {actions}

        {/* Search */}
        <button className="flex items-center gap-2 rounded-lg border border-border bg-surface-raised px-3 py-1.5 text-data-sm text-ink-muted hover:text-ink hover:border-border-strong transition-all duration-150">
          <Search size={14} strokeWidth={1.75} />
          <span className="hidden sm:block">Search</span>
          <kbd className="hidden sm:flex items-center gap-0.5 font-mono text-data-xs text-ink-faint border border-border rounded px-1 py-0.5 ml-1">
            ⌘K
          </kbd>
        </button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={17} strokeWidth={1.75} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-signal border-2 border-surface" />
        </Button>

        {/* User */}
        <button className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-surface-raised transition-all duration-150">
          <div
            className={cn(
              'h-7 w-7 rounded-full flex items-center justify-center text-data-xs font-semibold',
              'bg-signal-gradient text-white'
            )}
          >
            {MOCK_USER.avatarUrl ? (
              <img src={MOCK_USER.avatarUrl} alt="" className="h-7 w-7 rounded-full" />
            ) : (
              initials(MOCK_USER.displayName)
            )}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-data-sm font-medium text-ink leading-none">
              {MOCK_USER.displayName}
            </p>
          </div>
          <ChevronDown size={14} className="text-ink-faint hidden md:block" />
        </button>
      </div>
    </header>
  )
}
