import { Characteristic as C } from '../../constants';
import { numberOption } from '../../utils/modifierUtils';
import DiceValue from '../diceValue';
import type WeaponProfile from '../weaponProfile';
import BaseModifier from './BaseModifier';
import Bonus from './Bonus';

export default class LeaderBonus extends BaseModifier {
  ['constructor']: typeof LeaderBonus;
  numLeaders: number;
  bonus: DiceValue;

  constructor({ characteristic, numLeaders = 1, bonus = 1 }) {
    super({ characteristic });
    this.numLeaders = Number(numLeaders);
    this.bonus = DiceValue.parse(bonus);
  }

  static get displayName() {
    return 'Leader Bonus';
  }

  static get description() {
    return 'Add {bonus} for {characteristic} to the leader of this unit ({numLeaders} leaders)';
  }

  static get availableCharacteristics() {
    return [C.ATTACKS, C.TO_HIT, C.TO_WOUND, C.REND, C.DAMAGE];
  }

  static get options() {
    return {
      ...super.options,
      bonus: numberOption({ defaultVal: 1, allowDice: true }),
      numLeaders: numberOption({ defaultVal: 1 }),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolve(owner: WeaponProfile) {
    return this.numLeaders * this.getBonus();
  }

  getBonus() {
    return this.bonus.average;
  }

  getAsBonusModifier() {
    return new Bonus({ characteristic: this.characteristic, bonus: this.bonus });
  }
}
