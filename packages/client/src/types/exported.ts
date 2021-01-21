import { UnitParams } from './store/units'

export interface ExportedUnitData {
  metadata: ExportedUnitMetadata
  unit: ExportedUnit
}

export interface ExportedUnitMetadata {
  version?: string
  timestamp?: string
}

export type ExportedUnit = UnitParams

// === Legacy ===

/* eslint-disable camelcase */

export interface LegacyExportedUnit {
  uuid: string
  name: string
  weapon_profiles: LegacyExportedWeaponProfileData[]
}

export interface LegacyExportedWeaponProfileData {
  uuid: string
  active?: boolean
  num_models: string | number
  attacks: string | number
  to_hit: string | number
  to_wound: string | number
  rend: string | number
  damage: string | number
  modifiers?: LegacyExportedModifierData[]
}

export interface LegacyExportedModifierData {
  id: string
  options: { [name: string]: string | number | boolean }
}
