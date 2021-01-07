import { Characteristic as C } from 'common'
import { numberOption } from 'utils/modifierUtils'
import DiceValue from '../diceValue'
import BaseModifier from './BaseModifier'

interface BonusParams {
  characteristic: C
  bonus: number | string | DiceValue
}

export default class Bonus extends BaseModifier {
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
      ...BaseModifier.options,
      bonus: numberOption({ defaultVal: 1, allowDice: true }),
    }
  }
}
