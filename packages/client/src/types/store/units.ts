export interface Modifier {
  id: string
  type: string
  options: { [name: string]: string | number | boolean }
}

export interface WeaponProfile {
  id: string
  numModels: number
  attacks: number | string
  toHit: number
  toWound: number
  rend: number
  damage: number | string
  modifiers: Modifier[]
}

export interface Unit {
  id: string
  name: string
  weaponProfiles: WeaponProfile[]
}

export type WeaponProfileParams = Omit<WeaponProfile, 'id'>
export type UnitParams = Omit<Unit, 'id' | 'weaponProfiles'> & { weaponProfiles: WeaponProfileParams[] }

interface UnitsStore {
  items: Unit[]
}

export default UnitsStore
