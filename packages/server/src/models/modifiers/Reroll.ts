import { Characteristic as C } from 'common'
import { choiceOption } from 'utils/modifierUtils'

import BaseModifier from './BaseModifier'

export default class Reroll extends BaseModifier {
  static displayName = 'Reroll'
  static description = 'Reroll rolls {characteristic}'
  static availableCharacteristics = [C.TO_HIT, C.TO_WOUND]

  protected static get options() {
    return {
      characteristic: choiceOption({ items: this.availableCharacteristics }),
    }
  }
}
