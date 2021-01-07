import { TargetModifierLookup, TargetModifierData } from './targetModifiers'

export interface TargetParams {
  save?: number | null
  modifiers?: TargetModifierData
}

export class Target {
  save: number
  modifiers: TargetModifierLookup

  constructor({ save, modifiers = [] }: TargetParams) {
    this.save = save ? save : 7
    this.modifiers = new TargetModifierLookup(modifiers)
  }
}
