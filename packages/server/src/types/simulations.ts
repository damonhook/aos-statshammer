import { Save } from 'common'

export interface SimulationResult {
  save: number
  displaySave: string
  discrete: ProbabilityData[]
  cumulative: ProbabilityData[]
  metrics: { [id: string]: Metric }
}

export type ProbabilityData = { damage: number; [id: string]: number }
export type UnitSimulationData = { [damage: number]: number }
export type UnitResultsLookup = { [id: string]: UnitResults }
export type SimResultsData = { [s in Save]: UnitSimulationData }

export interface UnitResults {
  discrete: Record<number, number>
  cumulative: Record<number, number>
  metrics: Metric
}

export interface Metric {
  max: number
  average: number
}
