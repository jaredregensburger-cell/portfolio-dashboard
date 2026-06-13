import type { Metadata } from 'next'
import { AppShell } from '@/components/layout'
import { Button } from '@/components/ui'
import { Plus, Filter } from 'lucide-react'
import { AssetsShell } from '@/features/assets/AssetsShell'

export const metadata: Metadata = {
  title: 'Assets',
}

export default function AssetsPage() {
  return (
    <AppShell
      title="Assets"
      subtitle="All positions across your portfolio"
      topbarActions={
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Filter size={14} strokeWidth={1.75} />
            Filter
          </Button>
          <Button variant="primary" size="sm">
            <Plus size={14} strokeWidth={2.5} />
            Add Position
          </Button>
        </div>
      }
    >
      <AssetsShell />
    </AppShell>
  )
}
