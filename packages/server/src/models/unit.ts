import { WeaponProfile, WeaponProfileParams } from './weaponProfile'

export interface UnitParams {
  id?: string
  name: string
  weaponProfiles: (WeaponProfileParams | WeaponProfile)[]
}

export class Unit {
  id: string
  name: string
  weaponProfiles: WeaponProfile[]

  constructor({ id, name, weaponProfiles }: UnitParams) {
    this.id = id ?? name
    this.name = name
    this.weaponProfiles = weaponProfiles.map(w => (w instanceof WeaponProfile ? w : new WeaponProfile(w)))
  }
}
