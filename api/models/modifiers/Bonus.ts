import { Characteristic as C } from '../../constants';
import { numberOption } from '../../utils/modifierUtils';
import DiceValue from '../diceValue';
import type WeaponProfile from '../weaponProfile';
import BaseModifier from './BaseModifier';

export default class Bonus extends BaseModifier {
  ['constructor']: typeof Bonus;
  bonus: DiceValue;

  constructor({ characteristic, bonus }) {
    super({ characteristic });
    this.bonus = DiceValue.parse(bonus);
  }

  static get displayName() {
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
