import { Target } from './target'
import { Unit } from './units'

export interface ComparisonRequest {
  units: Unit[]
  target?: Target
}

export interface ComparisonResult {
  save: number
  displaySave: string
  values: { [id: string]: number }
}

export interface ComparisonResponse {
  units: { [id: string]: string }
  results: ComparisonResult[]
}

interface ComparisonStore {
  pending: boolean
  results: ComparisonResult[]
}

export default ComparisonStore
