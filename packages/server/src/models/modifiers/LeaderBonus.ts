import { Characteristic as C } from 'common'
import { choiceOption, numberOption } from 'utils/modifierUtils'

import DiceValue from '../diceValue'
import BaseModifier from './BaseModifier'

interface LeaderBonusParams {
  characteristic: C
  numLeaders?: number
  bonus?: number | string
}

export default class LeaderBonus extends BaseModifier {
  static displayName = 'Leader Bonus'
  static description = 'Add {bonus} for {characteristic} to the leader of this unit ({numLeaders} leaders)'
  static availableCharacteristics = [C.ATTACKS, C.TO_HIT, C.TO_WOUND, C.REND, C.DAMAGE]

  numLeaders: number
  bonus: DiceValue

  constructor({ characteristic, numLeaders = 1, bonus = 1 }: LeaderBonusParams) {
    super({ characteristic })
    this.numLeaders = Number(numLeaders)
    this.bonus = DiceValue.parse(bonus)
  }

  static get options() {
    return {
      characteristic: choiceOption({ items: this.availableCharacteristics }),
      bonus: numberOption({ defaultVal: 1, allowDice: true }),
      numLeaders: numberOption({ defaultVal: 1 }),
    }
  }
}
