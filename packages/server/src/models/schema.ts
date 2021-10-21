import { AbilityDefinition } from 'types/ability'
import { SimulationResult } from 'types/simulations'

import { TargetParams } from './target'
import type { UnitParams } from './unit'

// === Abilities ===

export interface AbilitiesRequest {}

export interface AbilitiesResponse {
  weapon: AbilityDefinition[]
  target: AbilityDefinition[]
}

// === Comparison ===

export interface CompareRequest {
  units: UnitParams[]
  target?: TargetParams
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
  target?: TargetParams
  limit?: number
}

export interface SimulationsResponse {
  units: { [id: string]: string }
  results: SimulationResult[]
}
