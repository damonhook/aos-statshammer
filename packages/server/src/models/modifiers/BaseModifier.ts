import { choiceOption } from 'utils/modifierUtils'
import { Characteristic as C } from 'common'
import type { ModifierDefinition } from 'models/schema'

interface BaseModifierParams {
  characteristic: C
}

export default class BaseModifier {
  static displayName = ''
  static description = ''
  static availableCharacteristics: C[] = []

  characteristic: C

  constructor({ characteristic }: BaseModifierParams) {
    const self = <typeof BaseModifier>this.constructor
    if (!self.availableCharacteristics.includes(characteristic)) {
      throw new Error(`Invalid characteristic provided to ${self.name} (${characteristic})`)
    }
    this.characteristic = characteristic
  }

  protected static get options(): object {
    throw new Error('Not Implemented!')
  }

  public static get metadata(): ModifierDefinition {
    return {
      id: this.name.toLowerCase(),
      name: this.displayName,
      description: this.description,
      options: this.options,
    }
  }
}
