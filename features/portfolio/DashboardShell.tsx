'use client'

import { StatCard, GlassCard, TimeRangeSelector, EmptyState } from '@/components/ui'
import { usePortfolioStore } from '@/store'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { MOCK_ASSETS, MOCK_SNAPSHOTS } from '@/lib/mock-data'
import { TrendingUp, BarChart2, Activity } from 'lucide-react'

// Import asset table preview
import { AssetRow } from '@/features/assets/AssetRow'

export function DashboardShell() {
  const { selectedTimeRange, setTimeRange } = usePortfolioStore()

  // In production these would come from the store, loaded from Supabase
  const totalValue = MOCK_ASSETS.reduce(
    (acc, a) => acc + a.currentPrice * a.quantity,
    0
  )
  const totalCost = MOCK_ASSETS.reduce(
    (acc, a) => acc + a.avgCostBasis * a.quantity,
    0
  )
  const totalGain = totalValue - totalCost
  const totalGainPct = (totalGain / totalCost) * 100
  const dayChange = totalValue * 0.0142 // mock +1.42% day

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Summary KPIs ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Value"
          value={totalValue}
          formatted
          currency="USD"
          change={dayChange}
          changePct={1.42}
          changeLabel="today"
          accent="signal"
          glow
        />
        <StatCard
          label="Total Gain / Loss"
          value={totalGain}
          formatted
          currency="USD"
          changePct={totalGainPct}
          changeLabel="all time"
          accent="gain"
        />
        <StatCard
          label="Day Change"
          value={formatCurrency(dayChange)}
          changePct={1.42}
          accent="none"
        />
        <StatCard
          label="Positions"
          value={MOCK_ASSETS.length}
          sublabel="Across 3 asset classes"
          accent="violet"
        />
      </div>

      {/* ── Chart Area ── */}
      <GlassCard padding="none" className="overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
          <div>
            <p className="text-data-sm text-ink-muted font-medium">Portfolio Performance</p>
            <p className="font-mono text-data-2xl font-semibold text-ink mt-0.5">
              {formatCurrency(totalValue)}
            </p>
          </div>
          <TimeRangeSelector selected={selectedTimeRange} onChange={setTimeRange} />
        </div>

        {/* Chart placeholder — Recharts goes here */}
        <div className="flex flex-col items-center justify-center h-52 gap-3 bg-grid">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated border border-border">
            <BarChart2 size={22} className="text-ink-faint" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <p className="text-data-sm font-medium text-ink-muted">Chart component ready</p>
            <p className="text-data-xs text-ink-faint mt-0.5">
              Connect Recharts &lt;AreaChart&gt; here with <code className="font-mono">MOCK_SNAPSHOTS</code>
            </p>
          </div>
        </div>
      </GlassCard>

      {/* ── Bottom grid: Top Positions + Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Positions */}
        <div className="lg:col-span-2">
          <GlassCard padding="none">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <p className="text-data-sm font-semibold text-ink">Top Positions</p>
              <a href="/assets" className="text-data-xs text-signal hover:text-signal-dim transition-colors">
                View all →
              </a>
            </div>
            <div className="divide-y divide-border">
              {MOCK_ASSETS.slice(0, 4).map((asset) => (
                <AssetRow key={asset.id} asset={asset} compact />
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Activity feed */}
        <div>
          <GlassCard padding="none" className="h-full">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <p className="text-data-sm font-semibold text-ink">Recent Activity</p>
              <Activity size={15} className="text-ink-faint" />
            </div>
            <EmptyState
              icon={TrendingUp}
              title="No recent activity"
              description="Your transaction history will appear here."
              className="border-0 py-10"
            />
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
