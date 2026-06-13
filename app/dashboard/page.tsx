import type { Metadata } from 'next'
import { AppShell } from '@/components/layout'
import { DashboardShell } from '@/features/portfolio/DashboardShell'
import { Button } from '@/components/ui'
import { Plus } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      subtitle="Good morning, Alex"
      topbarActions={
        <Button variant="primary" size="sm">
          <Plus size={14} strokeWidth={2.5} />
          Add Asset
        </Button>
      }
    >
      <DashboardShell />
    </AppShell>
  )
}
