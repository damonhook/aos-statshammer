import { rollOption } from 'utils/abilityUtils'

import BaseTargetAbility from './BaseTargetAbility'

export default class TargetMortalNegate extends BaseTargetAbility {
  static displayName = 'Target Mortal Wound Negate'
  static description = 'Negate mortal wounds on a roll of {on}+'

  on: number

  constructor({ on = 6 }) {
    super({})
    this.on = Number(on)
  }

  static get options() {
    return {
      on: rollOption({ defaultVal: 6 }),
    }
  }
}
