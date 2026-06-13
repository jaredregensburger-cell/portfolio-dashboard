'use client'

import { GlassCard, Button, Badge } from '@/components/ui'
import { useUIStore } from '@/store'
import { CURRENCIES } from '@/lib/constants'
import { User, Bell, Shield, Palette, Database, CreditCard } from 'lucide-react'

const SETTINGS_SECTIONS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'data', label: 'Data & Integrations', icon: Database },
  { id: 'billing', label: 'Billing', icon: CreditCard },
]

export function SettingsShell() {
  const { currency, setCurrency } = useUIStore()

  return (
    <div className="max-w-4xl space-y-6 animate-fade-in">
      {/* Section Nav */}
      <div className="flex gap-1 flex-wrap">
        {SETTINGS_SECTIONS.map((s) => {
          const Icon = s.icon
          return (
            <button
              key={s.id}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-data-sm text-ink-muted hover:text-ink hover:bg-surface-raised border border-transparent hover:border-border transition-all duration-150"
            >
              <Icon size={14} strokeWidth={1.75} />
              {s.label}
            </button>
          )
        })}
      </div>

      {/* Profile Section */}
      <GlassCard accent="signal">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-data-base font-semibold text-ink">Profile</h2>
            <p className="text-data-sm text-ink-muted mt-0.5">
              Manage your account information
            </p>
          </div>
          <Badge variant="signal" size="sm">Active</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Display Name', placeholder: 'Alex Investor' },
            { label: 'Email', placeholder: 'alex@folio.app' },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-data-xs font-medium text-ink-muted uppercase tracking-wide mb-2">
                {field.label}
              </label>
              <input
                type="text"
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-border bg-surface-raised px-3 py-2.5 text-data-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors duration-150"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border flex justify-end">
          <Button variant="primary" size="sm">Save Changes</Button>
        </div>
      </GlassCard>

      {/* Preferences */}
      <GlassCard>
        <h2 className="text-data-base font-semibold text-ink mb-1">Preferences</h2>
        <p className="text-data-sm text-ink-muted mb-5">Display & currency settings</p>
        <div className="space-y-4">
          <div>
            <label className="block text-data-xs font-medium text-ink-muted uppercase tracking-wide mb-2">
              Base Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="rounded-lg border border-border bg-surface-raised px-3 py-2.5 text-data-sm text-ink focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors duration-150 cursor-pointer"
            >
              {CURRENCIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.symbol} {c.label} ({c.value})
                </option>
              ))}
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Danger Zone */}
      <GlassCard accent="loss">
        <h2 className="text-data-base font-semibold text-ink mb-1">Danger Zone</h2>
        <p className="text-data-sm text-ink-muted mb-4">
          Irreversible actions — proceed with caution
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="danger" size="sm">
            Delete All Data
          </Button>
          <Button variant="danger" size="sm">
            Close Account
          </Button>
        </div>
      </GlassCard>
    </div>
  )
}
