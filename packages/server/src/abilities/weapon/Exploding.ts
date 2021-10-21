import { Characteristic as C } from 'common'
import DiceValue from 'models/diceValue'
import { booleanOption, choiceOption, numberOption, rollOption } from 'utils/abilityUtils'

import BaseAbility from './BaseWeaponAbility'

interface ExplodingParams {
  characteristic: C
  on?: number
  extraHits?: number | string
  unmodified?: boolean
}

export default class Exploding extends BaseAbility {
  static displayName = 'Exploding'
  static description = '{unmodified} rolls of {on}+ {characteristic} result in {extraHits} additional'
  static availableCharacteristics = [C.TO_HIT, C.TO_WOUND]

  on: number
  extraHits: DiceValue
  unmodified: boolean

  constructor({ characteristic, on = 6, extraHits = 1, unmodified = true }: ExplodingParams) {
    super({ characteristic })
    this.on = Number(on)
    this.extraHits = DiceValue.parse(extraHits)
    this.unmodified = Boolean(unmodified)
  }

  static get options() {
    return {
      characteristic: choiceOption({ items: this.availableCharacteristics }),
      on: rollOption({ defaultVal: 6 }),
      extraHits: numberOption({ defaultVal: 1, allowDice: true }),
      unmodified: booleanOption({ defaultVal: true }),
    }
  }
}
