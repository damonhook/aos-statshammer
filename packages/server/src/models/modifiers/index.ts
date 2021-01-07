import type { Characteristic as C } from 'common'

import BaseModifier from './BaseModifier'
import Bonus from './Bonus'
import ConditionalBonus from './ConditionalBonus'
import Exploding from './Exploding'
import LeaderBonus from './LeaderBonus'
import MortalWounds from './MortalWounds'
import Reroll from './Reroll'
import RerollFailed from './RerollFailed'
import RerollOnes from './RerollOnes'

export type ModifierData = (BaseModifier | { id: string; options: any })[]

export class ModifierList<T extends BaseModifier> extends Array<T> {
  public get(characteristic: C): T | undefined {
    return this.find(m => m.characteristic == characteristic)
  }

  public getAll(characteristic: C): T[] {
    return this.filter(m => m.characteristic == characteristic)
  }
}

export class ModifierLookup {
  rerollOnes: ModifierList<RerollOnes>
  rerollFailed: ModifierList<RerollFailed>
  reroll: ModifierList<Reroll>
  bonus: ModifierList<Bonus>
  leaderBonus: ModifierList<LeaderBonus>
  exploding: ModifierList<Exploding>
  mortalWounds: ModifierList<MortalWounds>
  conditionalBonus: ModifierList<ConditionalBonus>

  constructor(data: ModifierData) {
    this.rerollOnes = this.findModifiersOfType(data, RerollOnes)
    this.rerollFailed = this.findModifiersOfType(data, RerollFailed)
    this.reroll = this.findModifiersOfType(data, Reroll)
    this.bonus = this.findModifiersOfType(data, Bonus)
    this.leaderBonus = this.findModifiersOfType(data, LeaderBonus)
    this.exploding = this.findModifiersOfType(data, Exploding)
    this.mortalWounds = this.findModifiersOfType(data, MortalWounds)
    this.conditionalBonus = this.findModifiersOfType(data, ConditionalBonus)
  }

  private findModifiersOfType<T extends BaseModifier>(
    data: ModifierData,
    modifierClass: new (data: any) => T
  ): ModifierList<T> {
    const target_id = modifierClass.name.toLowerCase()
    return data.reduce((acc, d) => {
      if (d instanceof BaseModifier) {
        if (d instanceof modifierClass) acc.push(d)
      } else if (d?.id.toLowerCase().replace(/_/g, '') === target_id && 'options' in d) {
        acc.push(new modifierClass(d.options))
      }
      return acc
    }, new ModifierList<T>())
  }

  public items(): BaseModifier[] {
    const items: BaseModifier[] = []
    for (const attribute in this) {
      items.push(...(this[attribute] as any))
    }
    return items
  }

  public static get availableModifiers(): typeof BaseModifier[] {
    return [RerollOnes, RerollFailed, Reroll, Bonus, LeaderBonus, Exploding, MortalWounds, ConditionalBonus]
  }
}
