import { Unit } from './units'

export type ProbabilityData = { damage: number; [id: string]: number }

export interface Metric {
  max: number
  average: number
}

export interface SimulationResult {
  save: number
  displaySave: string
  discrete: ProbabilityData[]
  cumulative: ProbabilityData[]
  metrics: { [id: string]: Metric }
}

export interface SimulationsRequest {
  units: Unit[]
}

export interface SimulationsResponse {
  units: { [id: string]: string }
  results: SimulationResult[]
}

interface SimulationsStore {
  pending: boolean
  results: SimulationResult[]
}

export default SimulationsStore
