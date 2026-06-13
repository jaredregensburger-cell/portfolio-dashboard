'use client'

import { GlassCard, EmptyState, Badge } from '@/components/ui'
import { PieChart } from 'lucide-react'
import { MOCK_ASSETS } from '@/lib/mock-data'
import { ASSET_CLASS_META } from '@/lib/constants'
import { formatCurrency, formatPercent } from '@/lib/utils'
import type { AssetClass } from '@/types'

export function PortfolioShell() {
  const totalValue = MOCK_ASSETS.reduce(
    (acc, a) => acc + a.currentPrice * a.quantity,
    0
  )

  // Group by asset class
  const byClass = MOCK_ASSETS.reduce<Record<string, number>>((acc, a) => {
    const val = a.currentPrice * a.quantity
    acc[a.assetClass] = (acc[a.assetClass] ?? 0) + val
    return acc
  }, {})

  const allocationSlices = Object.entries(byClass).map(([cls, val]) => ({
    assetClass: cls as AssetClass,
    value: val,
    pct: (val / totalValue) * 100,
    ...ASSET_CLASS_META[cls as AssetClass],
  }))

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Allocation Chart Placeholder */}
        <GlassCard className="lg:col-span-1 flex flex-col items-center justify-center min-h-[280px]">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated border border-border mb-4">
            <PieChart size={22} className="text-ink-faint" strokeWidth={1.5} />
          </div>
          <p className="text-data-sm font-medium text-ink-muted">Allocation Chart</p>
          <p className="text-data-xs text-ink-faint mt-1 text-center max-w-[160px]">
            Recharts &lt;PieChart&gt; connects here
          </p>
        </GlassCard>

        {/* Allocation Breakdown */}
        <GlassCard className="lg:col-span-2" padding="none">
          <div className="px-5 py-4 border-b border-border">
            <p className="text-data-sm font-semibold text-ink">Allocation Breakdown</p>
          </div>
          <div className="divide-y divide-border">
            {allocationSlices.map((slice) => (
              <div key={slice.assetClass} className="flex items-center gap-4 px-5 py-3.5">
                <div
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: slice.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-data-sm font-medium text-ink">{slice.label}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-data-sm font-medium text-ink">
                    {formatCurrency(slice.value)}
                  </p>
                  <p className="font-mono text-data-xs text-ink-muted">
                    {slice.pct.toFixed(1)}%
                  </p>
                </div>
                {/* Bar */}
                <div className="w-20 h-1.5 rounded-full bg-surface-elevated overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${slice.pct}%`,
                      backgroundColor: slice.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
