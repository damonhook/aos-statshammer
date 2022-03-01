import { Unit } from '../unit'

export interface ComparisonRequest {
  units: Unit[]
}

export interface ComparisonResponse {
  results: ComparisonResult[]
}

export interface ComparisonResult {
  save: number
  displaySave: string
  values: ComparisonValue[]
}

export type ComparisonValue = { id: string; value: number }
