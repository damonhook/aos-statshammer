export default class BaseTargetModifier {
  static displayName = ''
  static description = ''

  constructor(data: any) {}

  static get options() {
    return {}
  }

  static get metadata() {
    return {
      name: this.displayName,
      description: this.description,
      options: this.options,
    }
  }
}
