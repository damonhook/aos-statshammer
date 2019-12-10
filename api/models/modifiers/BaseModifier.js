import { getCharacteristic } from '../../constants';
import { choiceOption } from './ModifierOptions';

export default class BaseModifier {
  constructor({ characteristic }) {
    const c = getCharacteristic(characteristic);
    if (!this.constructor.availableCharacteristics.includes(c)) {
      throw new Error(`Invalid characteristic provided to ${this.constructor.name}`);
    }
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
    return {
      characteristic: choiceOption({ items: this.availableCharacteristics }),
    };
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
