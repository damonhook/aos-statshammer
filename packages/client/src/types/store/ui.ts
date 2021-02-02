import type { Metric } from './simulations'

export type HomeTab = 'units' | 'target'
export interface HomeUI {
  tab: HomeTab
}

export type GraphTab = 'bar' | 'line' | 'radar'
export interface StatsUI {
  graphTab: GraphTab
}

export type ReferenceLines = keyof Metric | undefined
export interface SimulationsUI {
  save: number
  referenceLines: ReferenceLines
  inverted: boolean
}

interface UIStore {
  home: HomeUI
  stats: StatsUI
  simulations: SimulationsUI
}

export default UIStore
