import { Characteristic as C } from 'common'
import { choiceOption } from 'utils/abilityUtils'

import BaseAbility from './BaseWeaponAbility'

export default class RerollFailed extends BaseAbility {
  static displayName = 'Reroll Failed'
  static description = 'Reroll Failed rolls {characteristic}'
  static availableCharacteristics = [C.TO_HIT, C.TO_WOUND]

  protected static get options() {
    return {
      characteristic: choiceOption({ items: this.availableCharacteristics }),
    }
  }
}
