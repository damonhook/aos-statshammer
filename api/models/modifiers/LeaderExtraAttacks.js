import { Characteristics as C } from '../../constants';
import BaseModifier from './BaseModifier';

export default class LeaderExtraAttacks extends BaseModifier {
  constructor({ numLeaders = 1, bonus = 1 }) {
    super({ characteristic: C.ATTACKS });
    this.numLeaders = Number(numLeaders);
    this.bonus = Number(bonus);
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
      bonus: {
        type: 'number',
        default: 1,
      },
      numLeaders: {
        type: 'number',
        default: 1,
      },
    };
  }

  resolve(owner) {
    return this.numLeaders * this.bonus;
  }
}
