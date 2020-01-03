import { Characteristics as C } from '../../constants';
import { D6 } from '../dice';
import DiceValue from '../diceValue';
import BaseModifier from './BaseModifier';
import { numberOption, booleanOption, rollOption } from '../../utils/ModifierOptions';

export default class MortalWounds extends BaseModifier {
  ['constructor']: typeof MortalWounds;
  on: number;
  mortalWounds: DiceValue;
  unmodified: boolean;
  inAddition: boolean;

  constructor({ characteristic, on = 6, mortalWounds = 1, unmodified = true, inAddition = false }) {
    super({ characteristic });
    this.on = Number(on);
    this.mortalWounds = DiceValue.parse(mortalWounds);
    this.unmodified = Boolean(unmodified);
    this.inAddition = Boolean(inAddition);
  }

  static get name() {
    return 'Mortal Wounds';
  }

  static get description() {
    return '{unmodified} rolls of {on}+ for {characteristic} result in {mortalWounds} mortal wounds {inAddition}';
  }

  static get availableCharacteristics() {
    return [C.TO_HIT, C.TO_WOUND];
  }

  static get options() {
    return {
      ...super.options,
      on: rollOption({ defaultVal: 6 }),
      mortalWounds: numberOption({ defaultVal: 1, allowDice: true }),
      unmodified: booleanOption({ defaultVal: true }),
      inAddition: booleanOption({ defaultVal: false }),
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

  getMortalWounds(roll = false) {
    return roll ? this.mortalWounds.roll() : this.mortalWounds.average;
  }
}
