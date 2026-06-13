import { cn } from '@/lib/utils'
import { Button } from './Button'
import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-8 text-center',
        'rounded-xl border border-dashed border-border',
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-elevated border border-border mb-5">
        <Icon size={24} className="text-ink-faint" strokeWidth={1.5} />
      </div>
      <h3 className="text-data-lg font-semibold text-ink mb-2">{title}</h3>
      <p className="text-data-sm text-ink-muted max-w-sm leading-relaxed">{description}</p>
      {action && (
        <Button variant="primary" size="md" onClick={action.onClick} className="mt-6">
          {action.label}
        </Button>
      )}
    </div>
  )
}
