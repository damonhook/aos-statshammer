import { Characteristics as C } from './../../constants';
import { D6, Dice } from './../../models/dice';
import BaseModifier from './BaseModifier';

export default class MortalWounds extends BaseModifier {
  constructor({
    on = 6, mortalWounds = 1, unmodified = true, inAddition = false,
  }) {
    super({ characteristic: C.TO_HIT });
    this.on = on;
    this.mortalWounds = mortalWounds;
    this.unmodified = unmodified;
    this.inAddition = inAddition;
  }

  static get name() {
    return 'Mortal Wounds';
  }

  static get description() {
    return '{unmodified} rolls of {on} for {characteristic} result in {mortalWounds} {inAddition}';
  }

  static get availableCharacteristics() {
    return [C.TO_HIT];
  }

  static get options() {
    return {
      ...super.options,
      on: {
        type: 'number',
        default: 6,
      },
      mortalWounds: {
        type: 'number',
        default: 6,
      },
      unmodified: {
        type: 'boolean',
        default: true,
      },
      inAddition: {
        type: 'boolean',
        default: false,
      },
    };
  }

  resolve(owner) {
    return D6.getProbability(this.on);
  }

  getMortalWounds() {
    if (this.mortalWounds instanceof Dice) {
      return this.mortalWounds.average;
    }
    return this.mortalWounds;
  }
}
