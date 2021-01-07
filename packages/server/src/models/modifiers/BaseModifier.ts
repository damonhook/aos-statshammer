import { choiceOption } from 'utils/modifierUtils'
import { Characteristic as C } from 'common'

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

  protected static get options() {
    return {
      characteristic: choiceOption({ items: this.availableCharacteristics }),
    }
  }

  protected static get metadata() {
    return {
      name: this.displayName,
      description: this.description,
      options: this.options,
    }
  }
}
