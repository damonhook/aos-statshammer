import { Characteristics as C } from '../../constants';
import { Dice, parseDice } from '../dice';
import { numberOption } from './ModifierOptions';
import BaseModifier from './BaseModifier';

export default class Bonus extends BaseModifier {
  constructor({ characteristic, bonus }) {
    super({ characteristic });
    this.bonus = parseDice(bonus);
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
      bonus: numberOption({ defaultVal: 1, allowDice: true }),
    };
  }

  // eslint-disable-next-line no-unused-vars
  resolve(owner) {
    if (this.bonus instanceof Dice) {
      return this.bonus.average;
    }
    return this.bonus;
  }
}
