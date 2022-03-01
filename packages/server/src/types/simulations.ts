import { Save } from 'common'

export type ProbabilityData = { damage: number; values: { id: string; value: number }[] }
export type MetricData = Metric & { id: string }

export interface SimulationResult {
  save: number
  displaySave: string
  discrete: ProbabilityData[]
  cumulative: ProbabilityData[]
  metrics: MetricData[]
}

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
