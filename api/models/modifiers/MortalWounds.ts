import { Characteristic as C } from '../../constants';
import { booleanOption, numberOption, rollOption } from '../../utils/modifierUtils';
import { D6 } from '../dice';
import DiceValue from '../diceValue';
import type WeaponProfile from '../weaponProfile';
import BaseModifier from './BaseModifier';

export default class MortalWounds extends BaseModifier {
  ['constructor']: typeof MortalWounds;
  on: number;
  mortalWounds: DiceValue;
  unmodified: boolean;
  inAddition: boolean;

  constructor({ characteristic, on = 6, mortalWounds, unmodified = true, inAddition = false }) {
    super({ characteristic });
    this.on = Number(on);
    this.mortalWounds = DiceValue.parse(mortalWounds);
    this.unmodified = Boolean(unmodified);
    this.inAddition = Boolean(inAddition);
  }

  static get displayName() {
    return 'Mortal Wounds';
  }

  static get description() {
    return `{unmodified} rolls of {on}+ for {characteristic} result
    in {mortalWounds} mortal wounds {inAddition}`;
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

  resolve(owner: WeaponProfile) {
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
