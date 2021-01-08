import type { ModifierDefinition } from 'models/schema'

export default class BaseTargetModifier {
  static displayName = ''
  static description = ''

  constructor(data: any) {}

  static get options() {
    return {}
  }

  static get metadata(): ModifierDefinition {
    return {
      id: this.name.toLowerCase(),
      name: this.displayName,
      description: this.description,
      options: this.options,
    }
  }
}
