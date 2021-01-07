import DiceValue from './diceValue'
import { ModifierLookup, ModifierData, ModifierList } from './modifiers'
import Bonus from './modifiers/Bonus'
import ConditionalBonus from './modifiers/ConditionalBonus'

export interface WeaponProfileParams {
  numModels: number
  attacks: number | string | DiceValue
  toHit: number
  toWound: number
  rend: number
  damage: number | string | DiceValue
  modifiers?: ModifierData
}

export class WeaponProfile {
  numModels: number
  attacks: DiceValue
  toHit: number
  toWound: number
  rend: number
  damage: DiceValue
  modifiers: ModifierLookup

  constructor({ numModels, attacks, toHit, toWound, rend, damage, modifiers = [] }: WeaponProfileParams) {
    this.numModels = Number(numModels)
    this.attacks = DiceValue.parse(attacks)
    this.toHit = Number(toHit)
    this.toWound = Number(toWound)
    this.rend = Number(rend)
    this.damage = DiceValue.parse(damage)
    this.modifiers = new ModifierLookup(modifiers)
  }

  public getLeaderProfile(): WeaponProfile {
    const modifiers = this.modifiers.items()
    const numLeaders = this.modifiers.leaderBonus.length ? this.modifiers.leaderBonus[0].numLeaders : 0
    modifiers.push(
      ...this.modifiers.leaderBonus.map(
        mod => new Bonus({ characteristic: mod.characteristic, bonus: mod.bonus })
      )
    )
    const profile = new WeaponProfile({
      numModels: numLeaders,
      attacks: this.attacks,
      toHit: this.toHit,
      toWound: this.toWound,
      rend: this.rend,
      damage: this.damage,
      modifiers,
    })
    profile.modifiers.leaderBonus = new ModifierList()
    return profile
  }

  public getConditionalBonusProfile(modifier: ConditionalBonus): WeaponProfile {
    const modifiers = this.modifiers.items().filter(mod => mod !== modifier)
    modifiers.push(new Bonus({ characteristic: modifier.bonusToCharacteristic, bonus: modifier.bonus }))
    return new WeaponProfile({
      numModels: this.numModels,
      attacks: this.attacks,
      toHit: this.toHit,
      toWound: this.toWound,
      rend: this.rend,
      damage: this.damage,
      modifiers,
    })
  }
}
