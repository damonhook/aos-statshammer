import { Characteristics as C } from '../../constants';
import { numberOption } from './ModifierOptions';
import { Dice, parseDice } from '../dice';
import BaseModifier from './BaseModifier';

export default class LeaderExtraAttacks extends BaseModifier {
  constructor({ numLeaders = 1, bonus = 1 }) {
    super({ characteristic: C.ATTACKS });
    this.numLeaders = Number(numLeaders);
    this.bonus = parseDice(bonus);
  }

  static get name() {
    return 'Leader Extra Attacks';
  }

  static get description() {
    return 'Add {bonus} attacks to the leader of this unit ({numLeaders} leaders)';
  }

  static get availableCharacteristics() {
    return [C.ATTACKS];
  }

  static get options() {
    return {
      bonus: numberOption({ defaultVal: 1, allowDice: true }),
      numLeaders: numberOption({ defaultVal: 1 }),
    };
  }

  // eslint-disable-next-line no-unused-vars
  resolve(owner) {
    return this.numLeaders * this.getBonus();
  }

  getBonus() {
    if (this.bonus instanceof Dice) {
      return this.bonus.average;
    }
    return this.bonus;
  }
}
