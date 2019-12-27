export default class BaseTargetModifier {
  static get name() {
    return null;
  }

  static get description() {
    return null;
  }

  static get availableCharacteristics() {
    return [];
  }

  static get options() {
    return {};
  }

  static get metadata() {
    return {
      name: this.name,
      description: this.description,
      options: this.options,
    };
  }

  static parse(data) {
    if (!this.options || this.options === {}) return new this();
    const options = (data || {}).options || {};
    const cleanData = Object.keys(options || {}).reduce((acc, key) => {
      if (options[key] != null) acc[key] = options[key];
      return acc;
    }, {});
    return new this(cleanData);
  }

  // eslint-disable-next-line no-unused-vars
  resolve(owner) {
    throw new Error('Resolve method not implemented');
  }
}
