import { Weapon, WeaponParams } from './weapon'

export interface UnitParams {
  id?: string
  name: string
  weapons: (WeaponParams | Weapon)[]
}

export class Unit {
  id: string
  name: string
  weapons: Weapon[]

  constructor({ id, name, weapons }: UnitParams) {
    this.id = id ?? name
    this.name = name
    this.weapons = weapons.map(w => (w instanceof Weapon ? w : new Weapon(w)))
  }
}
