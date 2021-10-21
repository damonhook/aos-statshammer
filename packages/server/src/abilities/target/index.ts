import BaseTargetAbility from './BaseTargetAbility'
import TargetEthereal from './TargetEthereal'
import TargetMortalNegate from './TargetMortalNegate'
import TargetReroll from './TargetReroll'
import TargetRerollFailed from './TargetRerollFailed'
import TargetRerollOnes from './TargetRerollOnes'
import TargetWard from './TargetWard'

export type TargetAbilityData = (BaseTargetAbility | { type: string; options: any })[]

export class TargetAbilityList<T extends BaseTargetAbility> extends Array<T> {
  public get(): T | undefined {
    return this.length > 0 ? this[0] : undefined
  }
  public getAll(): T[] {
    return this
  }
}

export class TargetAbilityLookup {
  reroll: TargetAbilityList<TargetReroll>
  rerollFailed: TargetAbilityList<TargetRerollFailed>
  rerollOnes: TargetAbilityList<TargetRerollOnes>
  fnp: TargetAbilityList<TargetWard>
  mortalNegate: TargetAbilityList<TargetMortalNegate>
  ethereal: TargetAbilityList<TargetEthereal>

  constructor(data: TargetAbilityData) {
    this.reroll = this.findAbilitiesOfType(data, TargetReroll)
    this.rerollFailed = this.findAbilitiesOfType(data, TargetRerollFailed)
    this.rerollOnes = this.findAbilitiesOfType(data, TargetRerollOnes)
    this.fnp = this.findAbilitiesOfType(data, TargetWard)
    this.mortalNegate = this.findAbilitiesOfType(data, TargetMortalNegate)
    this.ethereal = this.findAbilitiesOfType(data, TargetEthereal)
  }

  private findAbilitiesOfType<T extends BaseTargetAbility>(
    data: TargetAbilityData,
    abilityClass: new (data: any) => T
  ): TargetAbilityList<T> {
    const targetId = abilityClass.name.toLowerCase()
    return data.reduce<TargetAbilityList<T>>((acc, d) => {
      if (d instanceof BaseTargetAbility) {
        if (d instanceof abilityClass) acc.push(d)
      } else if (d?.type.toLowerCase().replace(/_/g, '') === targetId && 'options' in d) {
        acc.push(new abilityClass(d.options))
      }
      return acc
    }, new TargetAbilityList<T>())
  }

  public items(): BaseTargetAbility[] {
    const items: BaseTargetAbility[] = []
    for (const attribute in this) {
      items.push(...(this[attribute] as any))
    }
    return items
  }

  public static get availableAbilities(): typeof BaseTargetAbility[] {
    return [
      TargetReroll,
      TargetRerollFailed,
      TargetRerollOnes,
      TargetWard,
      TargetMortalNegate,
      TargetEthereal,
    ]
  }
}
