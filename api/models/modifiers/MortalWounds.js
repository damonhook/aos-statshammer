import { Characteristics as C } from '../../constants';
import { D6, Dice, parseDice } from '../dice';
import BaseModifier from './BaseModifier';

export default class MortalWounds extends BaseModifier {
  constructor({
    on = 6, mortalWounds = 1, unmodified = true, inAddition = false,
  }) {
    super({ characteristic: C.TO_HIT });
    this.on = Number(on);
    this.mortalWounds = parseDice(mortalWounds);
    this.unmodified = Boolean(unmodified);
    this.inAddition = Boolean(inAddition);
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
        default: 1,
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
    let numHits = D6.getProbability(this.on);
    const rerollModifier = owner.modifiers.getRerollModifier(this.characteristic);
    if (rerollModifier) {
      numHits += rerollModifier.numRerolls(owner) * D6.getProbability(this.on);
    }
    return numHits;
  }

  getMortalWounds() {
    if (this.mortalWounds instanceof Dice) {
      return this.mortalWounds.average;
    }
    return this.mortalWounds;
  }
}
