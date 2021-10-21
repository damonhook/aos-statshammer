import { Characteristic as C } from 'common'
import DiceValue from 'models/diceValue'
import { booleanOption, choiceOption, numberOption, rollOption } from 'utils/abilityUtils'

import BaseAbility from './BaseWeaponAbility'

interface MortalWoundsParams {
  characteristic: C
  on?: number
  mortalWounds: number | string
  unmodified?: boolean
  inAddition?: boolean
}

export default class MortalWounds extends BaseAbility {
  static displayName = 'Mortal Wounds'
  static description = `{unmodified} rolls of {on}+ {characteristic} result
  in {mortalWounds} mortal wounds {inAddition}`
  static availableCharacteristics = [C.TO_HIT, C.TO_WOUND]

  on: number
  mortalWounds: DiceValue
  unmodified: boolean
  inAddition: boolean

  constructor({
    characteristic,
    on = 6,
    mortalWounds,
    unmodified = true,
    inAddition = false,
  }: MortalWoundsParams) {
    super({ characteristic })
    this.on = Number(on)
    this.mortalWounds = DiceValue.parse(mortalWounds)
    this.unmodified = Boolean(unmodified)
    this.inAddition = Boolean(inAddition)
  }

  static get options() {
    return {
      characteristic: choiceOption({ items: this.availableCharacteristics }),
      on: rollOption({ defaultVal: 6 }),
      mortalWounds: numberOption({ defaultVal: 1, allowDice: true }),
      unmodified: booleanOption({ defaultVal: true }),
      inAddition: booleanOption({ defaultVal: false }),
    }
  }
}
