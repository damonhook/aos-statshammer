import type { UnitParams } from './unit'

export interface CompareRequest {
  units: UnitParams[]
}

export interface CompareResponse {
  units: string[]
  results: AverageDamageResult[]
}

export interface AverageDamageResult {
  save: number
  values: { string: number }
}
