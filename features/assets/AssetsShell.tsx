'use client'

import { GlassCard, Badge } from '@/components/ui'
import { MOCK_ASSETS } from '@/lib/mock-data'
import { ASSET_CLASS_META } from '@/lib/constants'
import { AssetRow } from './AssetRow'
import { formatCurrency, calcGain } from '@/lib/utils'
import type { AssetClass } from '@/types'
import { useState } from 'react'

const FILTERS: Array<{ label: string; value: AssetClass | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Equities', value: 'equity' },
  { label: 'Crypto', value: 'crypto' },
  { label: 'ETFs', value: 'etf' },
]

export function AssetsShell() {
  const [filter, setFilter] = useState<AssetClass | 'all'>('all')

  const filtered =
    filter === 'all' ? MOCK_ASSETS : MOCK_ASSETS.filter((a) => a.assetClass === filter)

  const totalValue = filtered.reduce((acc, a) => acc + a.currentPrice * a.quantity, 0)

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Filter tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-lg text-data-sm font-medium border transition-all duration-150 ${
              filter === f.value
                ? 'bg-signal/10 text-signal border-signal/25'
                : 'text-ink-muted border-border hover:border-border-strong hover:text-ink'
            }`}
          >
            {f.label}
          </button>
        ))}
        <div className="ml-auto font-mono text-data-sm text-ink-muted">
          {filtered.length} positions ·{' '}
          <span className="text-ink font-medium">{formatCurrency(totalValue)}</span>
        </div>
      </div>

      {/* Table */}
      <GlassCard padding="none">
        {/* Header */}
        <div className="flex items-center gap-4 px-5 py-3 border-b border-border">
          <div className="w-9 shrink-0" />
          <p className="flex-1 text-data-xs font-medium text-ink-faint uppercase tracking-wide">
            Asset
          </p>
          <p className="hidden sm:block text-data-xs font-medium text-ink-faint uppercase tracking-wide w-20">
            Class
          </p>
          <p className="hidden md:block text-data-xs font-medium text-ink-faint uppercase tracking-wide text-right w-28">
            Quantity
          </p>
          <p className="hidden sm:block text-data-xs font-medium text-ink-faint uppercase tracking-wide text-right w-24">
            Price
          </p>
          <p className="text-data-xs font-medium text-ink-faint uppercase tracking-wide text-right w-28">
            Value
          </p>
          <p className="text-data-xs font-medium text-ink-faint uppercase tracking-wide text-right w-20">
            P&L
          </p>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border">
          {filtered.map((asset) => (
            <AssetRow key={asset.id} asset={asset} />
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
