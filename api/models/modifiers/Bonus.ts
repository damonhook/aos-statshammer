import { Characteristic as C } from '../../constants';
import DiceValue from '../diceValue';
import { numberOption } from '../../utils/ModifierOptions';
import BaseModifier from './BaseModifier';
import WeaponProfile from '../weaponProfile';

export default class Bonus extends BaseModifier {
  ['constructor']: typeof Bonus;
  bonus: DiceValue;

  constructor({ characteristic, bonus }) {
    super({ characteristic });
    this.bonus = DiceValue.parse(bonus);
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

  resolve(owner: WeaponProfile, roll = false) {
    return roll ? this.bonus.roll() : this.bonus.average;
  }
}
