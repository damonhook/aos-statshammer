import { Characteristic as C } from 'common'
import DiceValue from 'models/diceValue'
import { choiceOption, numberOption } from 'utils/abilityUtils'

import BaseAbility from './BaseWeaponAbility'

interface BonusParams {
  characteristic: C
  bonus: number | string | DiceValue
}

export default class Bonus extends BaseAbility {
  static displayName = 'Bonus'
  static description = 'Add {bonus} for {characteristic}'
  static availableCharacteristics = [C.ATTACKS, C.TO_HIT, C.TO_WOUND, C.REND, C.DAMAGE]

  bonus: DiceValue

  constructor({ characteristic, bonus }: BonusParams) {
    super({ characteristic })
    this.bonus = DiceValue.parse(bonus)
  }

  static get options() {
    return {
      characteristic: choiceOption({ items: this.availableCharacteristics }),
      bonus: numberOption({ defaultVal: 1, allowDice: true }),
    }
  }
}
