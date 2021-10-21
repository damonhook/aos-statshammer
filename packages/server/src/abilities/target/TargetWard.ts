import { rollOption } from 'utils/abilityUtils'

import BaseTargetAbility from './BaseTargetAbility'

export default class TargetWard extends BaseTargetAbility {
  static displayName = 'Target Ward Save'
  static description = 'Ignore wounds and mortal wounds on a roll of {on}+ (ward save)'

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
