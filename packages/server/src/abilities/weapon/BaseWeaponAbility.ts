import { Characteristic as C } from 'common'
import type { AbilityDefinition } from 'types/ability'

interface BaseAbilityParams {
  characteristic: C
}

export default class BaseAbility {
  static displayName = ''
  static description = ''
  static availableCharacteristics: C[] = []

  characteristic: C

  constructor({ characteristic }: BaseAbilityParams) {
    const self = <typeof BaseAbility>this.constructor
    if (!self.availableCharacteristics.includes(characteristic)) {
      throw new Error(`Invalid characteristic provided to ${self.name} (${characteristic})`)
    }
    this.characteristic = characteristic
  }

  protected static get options(): Record<string, unknown> {
    throw new Error('Not Implemented!')
  }

  public static get metadata(): AbilityDefinition {
    return {
      id: this.name.toLowerCase(),
      name: this.displayName,
      description: this.description,
      options: this.options,
    }
  }
}
