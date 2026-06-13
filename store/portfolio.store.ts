import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Portfolio, Asset, PortfolioSummary, TimeRange, Status } from '@/types'

interface PortfolioState {
  // Data
  portfolios: Portfolio[]
  activePortfolioId: string | null
  activePortfolio: Portfolio | null
  summary: PortfolioSummary | null
  selectedTimeRange: TimeRange

  // UI State
  status: Status
  error: string | null

  // Actions
  setPortfolios: (portfolios: Portfolio[]) => void
  setActivePortfolio: (id: string) => void
  setTimeRange: (range: TimeRange) => void
  setStatus: (status: Status) => void
  setError: (error: string | null) => void
  updateAsset: (asset: Asset) => void
  reset: () => void
}

const initialState = {
  portfolios: [],
  activePortfolioId: null,
  activePortfolio: null,
  summary: null,
  selectedTimeRange: '1M' as TimeRange,
  status: 'idle' as Status,
  error: null,
}

export const usePortfolioStore = create<PortfolioState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setPortfolios: (portfolios) => {
        const active = portfolios[0] ?? null
        set({
          portfolios,
          activePortfolio: active,
          activePortfolioId: active?.id ?? null,
          summary: active?.summary ?? null,
        })
      },

      setActivePortfolio: (id) => {
        const portfolio = get().portfolios.find((p) => p.id === id) ?? null
        set({
          activePortfolioId: id,
          activePortfolio: portfolio,
          summary: portfolio?.summary ?? null,
        })
      },

      setTimeRange: (range) => set({ selectedTimeRange: range }),

      setStatus: (status) => set({ status }),

      setError: (error) => set({ error, status: error ? 'error' : 'idle' }),

      updateAsset: (updatedAsset) => {
        const { portfolios, activePortfolioId } = get()
        const updatedPortfolios = portfolios.map((p) => {
          if (p.id !== activePortfolioId) return p
          return {
            ...p,
            assets: p.assets.map((a) => (a.id === updatedAsset.id ? updatedAsset : a)),
          }
        })
        set({ portfolios: updatedPortfolios })
      },

      reset: () => set(initialState),
    }),
    { name: 'portfolio-store' }
  )
)
