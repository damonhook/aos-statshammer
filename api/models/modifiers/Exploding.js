import { Characteristics as C } from '../../constants';
import { D6, Dice, parseDice } from '../dice';
import { numberOption, booleanOption, rollOption } from './ModifierOptions';
import BaseModifier from './BaseModifier';

export default class Exploding extends BaseModifier {
  constructor({
    characteristic, on = 6, extraHits = 1, unmodified = true,
  }) {
    super({ characteristic });
    this.on = Number(on);
    this.extraHits = parseDice(extraHits);
    this.unmodified = Boolean(unmodified);
  }

  static get name() {
    return 'Exploding';
  }

  static get description() {
    return '{unmodified} rolls of {on} for {characteristic} result in {extraHits} additional';
  }

  static get availableCharacteristics() {
    return [C.TO_HIT, C.TO_WOUND];
  }

  static get options() {
    return {
      ...super.options,
      on: rollOption({ defaultVal: 6 }),
      extraHits: numberOption({ defaultVal: 1, allowDice: true }),
      unmodified: booleanOption({ defaultVal: true }),
    };
  }

  // eslint-disable-next-line no-unused-vars
  resolve(owner) {
    return D6.getProbability(this.on) * this.getExtraHits();
  }

  getExtraHits() {
    if (this.extraHits instanceof Dice) {
      return this.extraHits.average;
    }
    return this.extraHits;
  }
}
