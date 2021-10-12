import { rollOption } from 'utils/modifierUtils'

import BaseTargetModifier from './BaseTargetModifier'

export default class TargetWard extends BaseTargetModifier {
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
