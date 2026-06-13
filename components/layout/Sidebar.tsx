'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  PieChart,
  TrendingUp,
  ArrowLeftRight,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Portfolio', href: '/portfolio', icon: PieChart },
  { label: 'Assets', href: '/assets', icon: TrendingUp },
  { label: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
]

const BOTTOM_ITEMS = [{ label: 'Settings', href: '/settings', icon: Settings }]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebar, toggleSidebar } = useUIStore()
  const isCollapsed = sidebar === 'collapsed'

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen flex flex-col',
        'border-r border-border bg-surface',
        'transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-16' : 'w-sidebar'
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          'flex items-center gap-3 h-topbar px-4 border-b border-border',
          'shrink-0'
        )}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-signal-gradient">
          <Zap size={16} className="text-white" strokeWidth={2.5} />
        </div>
        {!isCollapsed && (
          <div className="animate-fade-in">
            <p className="font-semibold text-ink text-sm leading-tight">Folio</p>
            <p className="text-data-xs text-ink-faint">Investor Dashboard</p>
          </div>
        )}
      </div>

      {/* Main Nav */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon
          return (
            <Link
              href={item.href as any}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5',
                'transition-all duration-150 group relative',
                isActive
                  ? 'bg-signal/10 text-signal border border-signal/20'
                  : 'text-ink-muted hover:text-ink hover:bg-surface-raised border border-transparent'
              )}
            >
              <Icon
                size={18}
                strokeWidth={isActive ? 2.5 : 1.75}
                className={cn('shrink-0', isActive ? 'text-signal' : '')}
              />
              {!isCollapsed && (
                <span
                  className={cn(
                    'text-data-sm font-medium animate-fade-in',
                    isActive ? 'text-signal' : ''
                  )}
                >
                  {item.label}
                </span>
              )}
              {/* Active indicator */}
              {isActive && (
                <span className="absolute right-2.5 h-1.5 w-1.5 rounded-full bg-signal" />
              )}
              {/* Collapsed tooltip */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 hidden group-hover:flex items-center">
                  <div className="bg-surface-elevated border border-border rounded-md px-2.5 py-1 text-data-sm text-ink whitespace-nowrap shadow-glass">
                    {item.label}
                  </div>
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="py-4 px-2 space-y-0.5 border-t border-border shrink-0">
        {BOTTOM_ITEMS.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5',
                'transition-all duration-150 group relative',
                isActive
                  ? 'bg-signal/10 text-signal border border-signal/20'
                  : 'text-ink-muted hover:text-ink hover:bg-surface-raised border border-transparent'
              )}
            >
              <Icon size={18} strokeWidth={1.75} className="shrink-0" />
              {!isCollapsed && (
                <span className="text-data-sm font-medium animate-fade-in">{item.label}</span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-2 hidden group-hover:flex items-center">
                  <div className="bg-surface-elevated border border-border rounded-md px-2.5 py-1 text-data-sm text-ink whitespace-nowrap shadow-glass">
                    {item.label}
                  </div>
                </div>
              )}
            </Link>
          )
        })}

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-ink-faint hover:text-ink-muted hover:bg-surface-raised transition-all duration-150 border border-transparent"
        >
          {isCollapsed ? (
            <ChevronRight size={18} strokeWidth={1.75} className="shrink-0" />
          ) : (
            <>
              <ChevronLeft size={18} strokeWidth={1.75} className="shrink-0" />
              <span className="text-data-sm font-medium animate-fade-in">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
