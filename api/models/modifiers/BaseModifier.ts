import { getCharacteristic, Characteristics } from '../../constants';
import { choiceOption } from '../../utils/ModifierOptions';

export default class BaseModifier {
  ['constructor']: typeof BaseModifier;
  characteristic: Characteristics;

  constructor({ characteristic }) {
    const c = getCharacteristic(characteristic);
    if (!this.constructor.availableCharacteristics.includes(c)) {
      throw new Error(`Invalid characteristic provided to ${this.constructor.name} (${characteristic})`);
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

  // eslint-disable-next-line no-unused-vars
  resolve(owner) {
    throw new Error('Resolve method not implemented');
  }
}
