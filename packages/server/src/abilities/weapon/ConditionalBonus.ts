import { Characteristic as C } from 'common'
import DiceValue from 'models/diceValue'
import { booleanOption, choiceOption, numberOption, rollOption } from 'utils/abilityUtils'

import BaseAbility from './BaseWeaponAbility'

interface ConditionalBonusParams {
  characteristic: C
  on?: number
  bonus?: number
  unmodified?: boolean
  bonusToCharacteristic: C
}

export default class ConditionalBonus extends BaseAbility {
  static displayName = 'Conditional Bonus'
  static description = `{unmodified} rolls of {on}+ {characteristic} result in a bonus
  of {bonus} to {bonusToCharacteristic}`
  static availableCharacteristics = [C.TO_HIT, C.TO_WOUND]
  static availableBonusToCharacteristics = [C.TO_WOUND, C.REND, C.DAMAGE]

  on: number
  bonus: DiceValue
  unmodified: boolean
  bonusToCharacteristic: C

  constructor({
    characteristic,
    on = 6,
    bonus = 1,
    unmodified = true,
    bonusToCharacteristic,
  }: ConditionalBonusParams) {
    super({ characteristic })

    this.on = Number(on)
    this.bonus = DiceValue.parse(bonus)
    this.unmodified = Boolean(unmodified)

    const self = <typeof ConditionalBonus>this.constructor
    if (!self.availableBonusToCharacteristics.includes(bonusToCharacteristic)) {
      throw new Error(`Invalid 'bonusToCharacteristic' provided to ${self.name} (${characteristic})`)
    }
    this.bonusToCharacteristic = bonusToCharacteristic
  }

  static get options() {
    return {
      characteristic: choiceOption({ items: this.availableCharacteristics }),
      on: rollOption({ defaultVal: 6 }),
      bonus: numberOption({ defaultVal: 1, allowDice: true }),
      unmodified: booleanOption({ defaultVal: true }),
      bonusToCharacteristic: choiceOption({ items: this.availableBonusToCharacteristics }),
    }
  }
}
