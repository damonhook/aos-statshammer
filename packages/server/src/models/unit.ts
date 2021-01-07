import { WeaponProfile, WeaponProfileParams } from './weaponProfile'

export interface UnitParams {
  name: string
  weaponProfiles: (WeaponProfile | WeaponProfileParams)[]
}

export class Unit {
  name: string
  weaponProfiles: WeaponProfile[]

  constructor({ name, weaponProfiles }: UnitParams) {
    this.name = name
    this.weaponProfiles = weaponProfiles.map(w => (w instanceof WeaponProfile ? w : new WeaponProfile(w)))
  }
}
