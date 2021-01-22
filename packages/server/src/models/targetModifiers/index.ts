import BaseTargetModifier from './BaseTargetModifier'
import TargetEthereal from './TargetEthereal'
import TargetFeelNoPain from './TargetFeelNoPain'
import TargetMortalNegate from './TargetMortalNegate'
import TargetReroll from './TargetReroll'
import TargetRerollFailed from './TargetRerollFailed'
import TargetRerollOnes from './TargetRerollOnes'

export type TargetModifierData = (BaseTargetModifier | { type: string; options: any })[]

export class TargetModifierList<T extends BaseTargetModifier> extends Array<T> {
  public get(): T | undefined {
    return this.length > 0 ? this[0] : undefined
  }
  public getAll(): T[] {
    return this
  }
}

export class TargetModifierLookup {
  reroll: TargetModifierList<TargetReroll>
  rerollFailed: TargetModifierList<TargetRerollFailed>
  rerollOnes: TargetModifierList<TargetRerollOnes>
  fnp: TargetModifierList<TargetFeelNoPain>
  mortalNegate: TargetModifierList<TargetMortalNegate>
  ethereal: TargetModifierList<TargetEthereal>

  constructor(data: TargetModifierData) {
    this.reroll = this.findModifiersOfType(data, TargetReroll)
    this.rerollFailed = this.findModifiersOfType(data, TargetRerollFailed)
    this.rerollOnes = this.findModifiersOfType(data, TargetRerollOnes)
    this.fnp = this.findModifiersOfType(data, TargetFeelNoPain)
    this.mortalNegate = this.findModifiersOfType(data, TargetMortalNegate)
    this.ethereal = this.findModifiersOfType(data, TargetEthereal)
  }

  private findModifiersOfType<T extends BaseTargetModifier>(
    data: TargetModifierData,
    modifierClass: new (data: any) => T
  ): TargetModifierList<T> {
    const targetId = modifierClass.name.toLowerCase()
    return data.reduce<TargetModifierList<T>>((acc, d) => {
      if (d instanceof BaseTargetModifier) {
        if (d instanceof modifierClass) acc.push(d)
      } else if (d?.type.toLowerCase().replace(/_/g, '') === targetId && 'options' in d) {
        acc.push(new modifierClass(d.options))
      }
      return acc
    }, new TargetModifierList<T>())
  }

  public items(): BaseTargetModifier[] {
    const items: BaseTargetModifier[] = []
    for (const attribute in this) {
      items.push(...(this[attribute] as any))
    }
    return items
  }

  public static get availableModifiers(): typeof BaseTargetModifier[] {
    return [
      TargetReroll,
      TargetRerollFailed,
      TargetRerollOnes,
      TargetFeelNoPain,
      TargetMortalNegate,
      TargetEthereal,
    ]
  }
}
