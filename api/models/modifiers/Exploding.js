import { Characteristics as C } from './../../constants';
import { D6 } from './../../models/dice';
import BaseModifier from './BaseModifier';

export default class Exploding extends BaseModifier {
  constructor({ on = 6, extraHits = 1, unmodified = true }) {
    super({ characteristic: C.TO_HIT });
    this.on = on;
    this.extraHits = extraHits;
    this.unmodified = unmodified;
  }

  static get name() {
    return 'Exploding';
  }

  static get description() {
    return '{unmodified} rolls of {on} for {characteristic} result in {extraHits} extra';
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
      extraHits: {
        type: 'number',
        default: '1',
      },
      unmodified: {
        type: 'boolean',
        default: true,
      },
    };
  }

  resolve(owner) {
    return D6.getProbability(this.on) * this.extraHits;
  }
}
