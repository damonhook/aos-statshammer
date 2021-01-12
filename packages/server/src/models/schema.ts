import type { UnitParams } from './unit'

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
