import { Characteristic as C } from '../../constants';
import { D6 } from '../dice';
import DiceValue from '../diceValue';
import { numberOption, booleanOption, rollOption } from '../../utils/ModifierOptions';
import BaseModifier from './BaseModifier';
import WeaponProfile from '../weaponProfile';

export default class Exploding extends BaseModifier {
  ['constructor']: typeof Exploding;
  on: number;
  extraHits: DiceValue;
  unmodified: boolean;

  constructor({ characteristic, on = 6, extraHits = 1, unmodified = true }) {
    super({ characteristic });
    this.on = Number(on);
    this.extraHits = DiceValue.parse(extraHits);
    this.unmodified = Boolean(unmodified);
  }

  static get displayName() {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolve(owner: WeaponProfile) {
    return D6.getProbability(this.on) * this.getExtra();
  }

  getExtra(roll = false) {
    return roll ? this.extraHits.roll() : this.extraHits.average;
  }
}
