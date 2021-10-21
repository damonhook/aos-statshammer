import { Characteristic as C } from 'common'

import BaseAbility from './BaseWeaponAbility'
import Bonus from './Bonus'
import ConditionalBonus from './ConditionalBonus'
import Exploding from './Exploding'
import LeaderBonus from './LeaderBonus'
import MortalWounds from './MortalWounds'
import Reroll from './Reroll'
import RerollFailed from './RerollFailed'
import RerollOnes from './RerollOnes'

export type WeaponAbilityData = (BaseAbility | { type: string; options: any })[]

export class WeaponAbilityList<T extends BaseAbility> extends Array<T> {
  public get(characteristic: C): T | undefined {
    return this.find(m => m.characteristic == characteristic)
  }

  public getAll(characteristic: C): T[] {
    return this.filter(m => m.characteristic == characteristic)
  }
}

export class WeaponAbilityLookup {
  rerollOnes: WeaponAbilityList<RerollOnes>
  rerollFailed: WeaponAbilityList<RerollFailed>
  reroll: WeaponAbilityList<Reroll>
  bonus: WeaponAbilityList<Bonus>
  leaderBonus: WeaponAbilityList<LeaderBonus>
  exploding: WeaponAbilityList<Exploding>
  mortalWounds: WeaponAbilityList<MortalWounds>
  conditionalBonus: WeaponAbilityList<ConditionalBonus>

  constructor(data: WeaponAbilityData) {
    this.rerollOnes = this.findAbilityOfType(data, RerollOnes)
    this.rerollFailed = this.findAbilityOfType(data, RerollFailed)
    this.reroll = this.findAbilityOfType(data, Reroll)
    this.bonus = this.findAbilityOfType(data, Bonus)
    this.leaderBonus = this.findAbilityOfType(data, LeaderBonus)
    this.exploding = this.findAbilityOfType(data, Exploding)
    this.mortalWounds = this.findAbilityOfType(data, MortalWounds)
    this.conditionalBonus = this.findAbilityOfType(data, ConditionalBonus)
  }

  private findAbilityOfType<T extends BaseAbility>(
    data: WeaponAbilityData,
    abilityClass: new (data: any) => T
  ): WeaponAbilityList<T> {
    const targetId = abilityClass.name.toLowerCase()
    const list = new WeaponAbilityList<T>()
    data.forEach(d => {
      if (d instanceof BaseAbility) {
        if (d instanceof abilityClass) list.push(d)
      } else if (d?.type.toLowerCase().replace(/_/g, '') === targetId && 'options' in d) {
        list.push(new abilityClass(d.options))
      }
    })
    return list
  }

  public items(): BaseAbility[] {
    const items: BaseAbility[] = []
    for (const attribute in this) {
      items.push(...(this[attribute] as any))
    }
    return items
  }

  public static get availableAbilities(): typeof BaseAbility[] {
    return [RerollOnes, RerollFailed, Reroll, Bonus, LeaderBonus, Exploding, MortalWounds, ConditionalBonus]
  }
}
