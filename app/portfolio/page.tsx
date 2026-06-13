import type { Metadata } from 'next'
import { AppShell } from '@/components/layout'
import { Button } from '@/components/ui'
import { Plus, Download } from 'lucide-react'
import { PortfolioShell } from '@/features/portfolio/PortfolioShell'

export const metadata: Metadata = {
  title: 'Portfolio',
}

export default function PortfolioPage() {
  return (
    <AppShell
      title="Portfolio"
      subtitle="Allocation & performance overview"
      topbarActions={
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Download size={14} strokeWidth={1.75} />
            Export
          </Button>
          <Button variant="primary" size="sm">
            <Plus size={14} strokeWidth={2.5} />
            New Portfolio
          </Button>
        </div>
      }
    >
      <PortfolioShell />
    </AppShell>
  )
}
