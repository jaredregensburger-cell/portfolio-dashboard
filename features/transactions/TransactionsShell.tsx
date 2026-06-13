'use client'

import { GlassCard, Badge } from '@/components/ui'
import { MOCK_TRANSACTIONS } from '@/lib/mock-data'
import { TRANSACTION_TYPE_LABELS } from '@/lib/constants'
import { formatCurrency, formatRelativeTime, cn } from '@/lib/utils'
import type { TransactionType } from '@/types'
import { ArrowDownLeft, ArrowUpRight, Gift, ArrowLeftRight, DollarSign } from 'lucide-react'

const TYPE_META: Record<TransactionType, {
  icon: typeof ArrowDownLeft
  variant: 'gain' | 'loss' | 'signal' | 'violet' | 'amber' | 'muted'
  amountPrefix: '+' | '-' | ''
}> = {
  buy: { icon: ArrowDownLeft, variant: 'signal', amountPrefix: '-' },
  sell: { icon: ArrowUpRight, variant: 'gain', amountPrefix: '+' },
  dividend: { icon: Gift, variant: 'gain', amountPrefix: '+' },
  transfer_in: { icon: ArrowDownLeft, variant: 'violet', amountPrefix: '+' },
  transfer_out: { icon: ArrowUpRight, variant: 'muted', amountPrefix: '-' },
  fee: { icon: DollarSign, variant: 'muted', amountPrefix: '-' },
}

export function TransactionsShell() {
  return (
    <div className="space-y-4 animate-fade-in">
      <GlassCard padding="none">
        {/* Header */}
        <div className="flex items-center gap-4 px-5 py-3 border-b border-border">
          <div className="w-9 shrink-0" />
          <p className="flex-1 text-data-xs font-medium text-ink-faint uppercase tracking-wide">
            Asset
          </p>
          <p className="text-data-xs font-medium text-ink-faint uppercase tracking-wide hidden sm:block w-24">
            Type
          </p>
          <p className="text-data-xs font-medium text-ink-faint uppercase tracking-wide hidden md:block text-right w-28">
            Quantity
          </p>
          <p className="text-data-xs font-medium text-ink-faint uppercase tracking-wide text-right w-28">
            Amount
          </p>
          <p className="text-data-xs font-medium text-ink-faint uppercase tracking-wide text-right hidden sm:block w-28">
            Date
          </p>
          <p className="text-data-xs font-medium text-ink-faint uppercase tracking-wide text-right w-20">
            Status
          </p>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border">
          {MOCK_TRANSACTIONS.map((tx) => {
            const meta = TYPE_META[tx.type]
            const Icon = meta.icon
            return (
              <div
                key={tx.id}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-surface-raised transition-colors duration-150"
              >
                {/* Icon */}
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                    meta.variant === 'gain' && 'bg-gain/10 text-gain',
                    meta.variant === 'signal' && 'bg-signal/10 text-signal',
                    meta.variant === 'violet' && 'bg-violet/10 text-violet',
                    meta.variant === 'muted' && 'bg-surface-elevated text-ink-faint',
                  )}
                >
                  <Icon size={15} strokeWidth={2} />
                </div>

                {/* Asset */}
                <div className="flex-1 min-w-0">
                  <p className="text-data-sm font-semibold text-ink truncate">
                    {tx.ticker ?? '—'}
                  </p>
                  <p className="text-data-xs text-ink-muted truncate">{tx.assetName}</p>
                </div>

                {/* Type */}
                <div className="hidden sm:block w-24">
                  <Badge variant={meta.variant} size="sm">
                    {TRANSACTION_TYPE_LABELS[tx.type]}
                  </Badge>
                </div>

                {/* Quantity */}
                <div className="hidden md:block text-right w-28">
                  <p className="font-mono text-data-sm text-ink-muted">
                    {tx.quantity ? `${tx.quantity} shares` : '—'}
                  </p>
                </div>

                {/* Amount */}
                <div className="text-right w-28">
                  <p
                    className={cn(
                      'font-mono text-data-sm font-medium',
                      meta.amountPrefix === '+' ? 'text-gain' : 'text-ink'
                    )}
                  >
                    {meta.amountPrefix}
                    {formatCurrency(tx.amount)}
                  </p>
                </div>

                {/* Date */}
                <div className="hidden sm:block text-right w-28">
                  <p className="font-mono text-data-xs text-ink-muted">
                    {formatRelativeTime(tx.executedAt)}
                  </p>
                </div>

                {/* Status */}
                <div className="text-right w-20">
                  <Badge
                    variant={tx.status === 'completed' ? 'gain' : tx.status === 'pending' ? 'amber' : 'loss'}
                    size="sm"
                  >
                    {tx.status}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </GlassCard>
    </div>
  )
}
