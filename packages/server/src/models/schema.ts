import type { UnitParams } from './unit'

// === Modifiers ===

export interface ModifiersRequest {}

export interface ModifierDefinition {
  id: string
  name: string
  description: string
  options: object
}

export interface ModifiersResponse {
  modifiers: ModifierDefinition[]
  target_modifiers: ModifierDefinition[]
}

// === Comparison ===

export interface CompareRequest {
  units: UnitParams[]
}

export interface CompareResponse {
  units: { [id: string]: string }
  results: AverageDamageResult[]
}

export interface AverageDamageResult {
  save: number
  values: { string: number }
}

// === Simulations ===

export interface SimulationsRequest {
  units: UnitParams[]
  limit?: number
}

export interface SimulationsResponse {
  units: { [id: string]: string }
  results: SumulationResult[]
}

export interface SumulationResult {
  save: number
  discrete: { string: number }[]
  cumulative: { string: number }[]
  metrics: { string: Metric }
}

export interface Metric {
  max: number
  average: number
}
