import { Characteristics as C, getCharacteristic } from '../../constants';
import { parseDice, D6 } from '../dice';
import {
  numberOption, booleanOption, rollOption, choiceOption,
} from './ModifierOptions';
import BaseModifier from './BaseModifier';
import Bonus from './Bonus';

export default class ConditionalBonus extends BaseModifier {
  constructor({
    characteristic, on = 6, bonus = 1, unmodified = true, bonusToCharacteristic,
  }) {
    super({ characteristic });
    this.on = Number(on);
    this.bonus = parseDice(bonus);
    this.unmodified = Boolean(unmodified);

    const c = getCharacteristic(bonusToCharacteristic);
    if (!this.constructor.availableBonusToCharacteristics.includes(c)) {
      throw new Error(
        `Invalid 'bonusToCharacteristic' provided to ${this.constructor.name} (${characteristic})`,
      );
    }
    this.bonusToCharacteristic = c;
  }

  static get name() {
    return 'Conditional Bonus';
  }

  static get description() {
    return '{unmodified} rolls of {on} for {characteristic} result in a bonus of {bonus} to {bonusToCharacteristic}';
  }

  static get availableCharacteristics() {
    return [C.TO_HIT, C.TO_WOUND];
  }

  static get availableBonusToCharacteristics() {
    return [C.TO_WOUND, C.REND, C.DAMAGE];
  }

  static get options() {
    return {
      ...super.options,
      on: rollOption({ defaultVal: 6 }),
      bonus: numberOption({ defaultVal: 1, allowDice: true }),
      unmodified: booleanOption({ defaultVal: true }),
      bonusToCharacteristic: choiceOption({ items: this.availableBonusToCharacteristics }),
    };
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  resolve(owner) {
    let numHits = D6.getProbability(this.on);
    const rerollModifier = owner.modifiers.getRerollModifier(this.characteristic);
    if (rerollModifier) {
      numHits += rerollModifier.numRerolls(owner) * D6.getProbability(this.on);
    }
    return numHits;
  }

  getAsBonusModifier() {
    return new Bonus({ characteristic: this.bonusToCharacteristic, bonus: this.bonus });
  }
}
