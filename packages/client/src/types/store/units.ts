import { Modifier } from '../modifierInstance'

export interface WeaponProfile {
  id: string
  name?: string
  numModels: number
  attacks: number | string
  toHit: number
  toWound: number
  rend: number
  damage: number | string
  modifiers: Modifier[]
  disabled?: boolean
}

export interface Unit {
  id: string
  name: string
  weaponProfiles: WeaponProfile[]
}

export type WeaponProfileParams = Omit<WeaponProfile, 'id'>
export type UnitParams = Omit<Unit, 'id' | 'weaponProfiles'> & { weaponProfiles: WeaponProfileParams[] }
export type NameMapping = { [id: string]: string }

interface UnitsStore {
  items: Unit[]
}

export default UnitsStore
