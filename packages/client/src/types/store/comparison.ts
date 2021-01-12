export interface ComparisonResult {
  save: number
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
