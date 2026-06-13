'use client'

import { Badge } from '@/components/ui'
import {
  cn,
  formatCurrency,
  formatPercent,
  calcGain,
  gainBgColor,
} from '@/lib/utils'
import { ASSET_CLASS_META } from '@/lib/constants'
import type { Asset } from '@/types'

interface AssetRowProps {
  asset: Asset
  compact?: boolean
  onClick?: (asset: Asset) => void
}

export function AssetRow({ asset, compact = false, onClick }: AssetRowProps) {
  const currentValue = asset.currentPrice * asset.quantity
  const costValue = asset.avgCostBasis * asset.quantity
  const { gain, pct } = calcGain(currentValue, costValue)
  const meta = ASSET_CLASS_META[asset.assetClass]

  return (
    <div
      className={cn(
        'flex items-center gap-4 px-5 transition-colors duration-150',
        compact ? 'py-3' : 'py-4',
        onClick && 'cursor-pointer hover:bg-surface-raised'
      )}
      onClick={() => onClick?.(asset)}
    >
      {/* Ticker Badge */}
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-data-xs font-mono font-semibold"
        style={{ backgroundColor: meta.bgColor, color: meta.color, border: `1px solid ${meta.borderColor}` }}
      >
        {asset.ticker.slice(0, 4)}
      </div>

      {/* Name & Class */}
      <div className="flex-1 min-w-0">
        <p className="text-data-sm font-semibold text-ink truncate">{asset.ticker}</p>
        {!compact && (
          <p className="text-data-xs text-ink-muted truncate">{asset.name}</p>
        )}
      </div>

      {/* Asset Class Badge — hide on compact */}
      {!compact && (
        <Badge
          variant="default"
          size="sm"
          className="hidden sm:flex"
          style={{ backgroundColor: meta.bgColor, color: meta.color, borderColor: meta.borderColor }}
        >
          {meta.label}
        </Badge>
      )}

      {/* Quantity */}
      {!compact && (
        <div className="hidden md:block text-right">
          <p className="font-mono text-data-sm text-ink-muted">
            {asset.quantity.toLocaleString()} shares
          </p>
        </div>
      )}

      {/* Current Price */}
      <div className="text-right hidden sm:block">
        <p className="font-mono text-data-sm text-ink">{formatCurrency(asset.currentPrice)}</p>
      </div>

      {/* Current Value */}
      <div className="text-right">
        <p className="font-mono text-data-sm font-medium text-ink">
          {formatCurrency(currentValue)}
        </p>
      </div>

      {/* Gain / Loss */}
      <div
        className={cn(
          'flex items-center justify-end min-w-[80px] px-2 py-0.5 rounded-md font-mono text-data-xs font-medium',
          gainBgColor(gain)
        )}
      >
        {formatPercent(pct)}
      </div>
    </div>
  )
}
