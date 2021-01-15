import { WeaponProfile, WeaponProfileParams } from './weaponProfile'

export interface UnitParams {
  id: string
  name: string
  weaponProfiles: WeaponProfileParams[]
}

export class Unit {
  id: string
  name: string
  weaponProfiles: WeaponProfile[]

  constructor({ id, name, weaponProfiles }: UnitParams) {
    this.id = id
    this.name = name
    // this.weaponProfiles = weaponProfiles.map(w => (w instanceof WeaponProfile ? w : new WeaponProfile(w)))
    this.weaponProfiles = weaponProfiles.map(w => new WeaponProfile(w))
  }
}
