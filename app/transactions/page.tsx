import type { Metadata } from 'next'
import { AppShell } from '@/components/layout'
import { Button } from '@/components/ui'
import { Plus, Download, Filter } from 'lucide-react'
import { TransactionsShell } from '@/features/transactions/TransactionsShell'

export const metadata: Metadata = {
  title: 'Transactions',
}

export default function TransactionsPage() {
  return (
    <AppShell
      title="Transactions"
      subtitle="Full ledger history"
      topbarActions={
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Filter size={14} strokeWidth={1.75} />
            Filter
          </Button>
          <Button variant="secondary" size="sm">
            <Download size={14} strokeWidth={1.75} />
            Export CSV
          </Button>
          <Button variant="primary" size="sm">
            <Plus size={14} strokeWidth={2.5} />
            Record
          </Button>
        </div>
      }
    >
      <TransactionsShell />
    </AppShell>
  )
}
