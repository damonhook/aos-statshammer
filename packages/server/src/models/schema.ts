import { ModifierDefinition } from 'types/modifiers'
import { SimulationResult } from 'types/simulations'

import type { UnitParams } from './unit'

// === Modifiers ===

export interface ModifiersRequest {}

export interface ModifiersResponse {
  modifiers: ModifierDefinition[]
  targetModifiers: ModifierDefinition[]
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
  displaySave: string
  values: { [name: string]: number }
}

// === Simulations ===

export interface SimulationsRequest {
  units: UnitParams[]
  limit?: number
}

export interface SimulationsResponse {
  units: { [id: string]: string }
  results: SimulationResult[]
}
