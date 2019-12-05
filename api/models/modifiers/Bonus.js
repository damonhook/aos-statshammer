import { Characteristics as C } from './../../constants';
import BaseModifier from './BaseModifier';

export default class Bonus extends BaseModifier {
  constructor({ characteristic, bonus }) {
    super({ characteristic });
    this.bonus = bonus;
  }

  static get name() {
    return 'Bonus';
  }

  static get description() {
    return 'Add {bonus} for {characteristic}';
  }

  static get availableCharacteristics() {
    return [C.ATTACKS, C.TO_HIT, C.TO_WOUND, C.REND, C.DAMAGE];
  }

  static get options() {
    return {
      ...super.options,
      bonus: {
        type: 'number',
        default: 1,
      },
    };
  }

  resolve(owner) {
    return this.bonus;
  }
}
