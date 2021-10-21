// import type { Replace } from './helpers'

export type AbilityOptions = { [name: string]: string | number | boolean }

export interface Ability {
  id: string
  type: string
  options: AbilityOptions
  disabled?: boolean
}

export interface WeaponData {
  id?: string
  name?: string
  numModels: number
  attacks: number | string
  toHit: number
  toWound: number
  rend: number
  damage: number | string
  abilities: Ability[]
  disabled?: boolean
}

export interface Weapon extends WeaponData {
  id: string // ID is no longer optional
}

export interface UnitData {
  id?: string
  name: string
  weapons: WeaponData[]
}

export interface Unit extends UnitData {
  id: string // ID is no longer optional
  weapons: Weapon[]
}

// Using Replace
// export type AbilityData = Replace<Ability, { id?: string }>
// export type weaponData = Replace<weapon, { id?: string; abilities: AbilityData[] }>
// export type UnitData = Replace<
//   Unit,
//   {
//     id?: string
//     weapons: weaponData[]
//   }
// >
