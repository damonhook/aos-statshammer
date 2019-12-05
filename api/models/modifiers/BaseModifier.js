import { getCharacteristic } from './../../constants';

export default class BaseModifier {
  constructor({ characteristic }) {
    const c = getCharacteristic(characteristic);
    this.characteristic = c;
  }

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
    const characteristic = {
      type: 'choice',
      items: this.availableCharacteristics,
    };
    if (this.availableCharacteristics.length === 1) {
      [characteristic.default] = this.availableCharacteristics;
    }
    return { characteristic };
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
      if (typeof options[key] === 'object' && options[key].value != null) acc[key] = options[key].value;
      return acc;
    }, {});
    return new this(cleanData);
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  resolve(owner) {
    throw new Error('Resolve method not implemented');
  }
}
