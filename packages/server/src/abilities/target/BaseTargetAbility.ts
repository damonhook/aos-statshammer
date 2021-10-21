import type { AbilityDefinition } from 'types/ability'

export default class BaseTargetAbility {
  static displayName = ''
  static description = ''

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  constructor(data: any) {}

  static get options() {
    return {}
  }

  static get metadata(): AbilityDefinition {
    return {
      id: this.name.toLowerCase(),
      name: this.displayName,
      description: this.description,
      options: this.options,
    }
  }
}
