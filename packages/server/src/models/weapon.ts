import { WeaponAbilityData, WeaponAbilityList, WeaponAbilityLookup } from 'abilities/weapon'
import Bonus from 'abilities/weapon/Bonus'
import ConditionalBonus from 'abilities/weapon/ConditionalBonus'

import DiceValue from './diceValue'

export interface WeaponParams {
  numModels: number
  attacks: number | string | DiceValue
  toHit: number
  toWound: number
  rend: number
  damage: number | string | DiceValue
  abilities?: WeaponAbilityData
}

export class Weapon {
  numModels: number
  attacks: DiceValue
  toHit: number
  toWound: number
  rend: number
  damage: DiceValue
  abilities: WeaponAbilityLookup

  constructor({ numModels, attacks, toHit, toWound, rend, damage, abilities = [] }: WeaponParams) {
    this.numModels = Number(numModels)
    this.attacks = DiceValue.parse(attacks)
    this.toHit = Number(toHit)
    this.toWound = Number(toWound)
    this.rend = Number(rend)
    this.damage = DiceValue.parse(damage)
    this.abilities = new WeaponAbilityLookup(abilities)
  }

  public getLeaderWeapon(): Weapon {
    const abilities = this.abilities.items()
    const numLeaders = this.abilities.leaderBonus.length ? this.abilities.leaderBonus[0].numLeaders : 0
    abilities.push(
      ...this.abilities.leaderBonus.map(
        ability => new Bonus({ characteristic: ability.characteristic, bonus: ability.bonus })
      )
    )
    const weapon = new Weapon({
      numModels: numLeaders,
      attacks: this.attacks,
      toHit: this.toHit,
      toWound: this.toWound,
      rend: this.rend,
      damage: this.damage,
      abilities,
    })
    weapon.abilities.leaderBonus = new WeaponAbilityList()
    return weapon
  }

  public getConditionalBonusWeapon(ability: ConditionalBonus): Weapon {
    const abilities = this.abilities.items().filter(a => a !== ability)
    abilities.push(new Bonus({ characteristic: ability.bonusToCharacteristic, bonus: ability.bonus }))
    return new Weapon({
      numModels: this.numModels,
      attacks: this.attacks,
      toHit: this.toHit,
      toWound: this.toWound,
      rend: this.rend,
      damage: this.damage,
      abilities,
    })
  }
}
