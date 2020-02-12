import { Characteristic as C, getCharacteristic } from '../../constants';
import { booleanOption, choiceOption, numberOption, rollOption } from '../../utils/ModifierOptions';
import { D6 } from '../dice';
import DiceValue from '../diceValue';
import WeaponProfile from '../weaponProfile';
import BaseModifier from './BaseModifier';
import Bonus from './Bonus';

export default class ConditionalBonus extends BaseModifier {
  ['constructor']: typeof ConditionalBonus;
  on: number;
  bonus: DiceValue;
  unmodified: boolean;
  bonusToCharacteristic: C;

  constructor({ characteristic, on = 6, bonus = 1, unmodified = true, bonusToCharacteristic }) {
    super({ characteristic });
    this.on = Number(on);
    this.bonus = DiceValue.parse(bonus);
    this.unmodified = Boolean(unmodified);

    const c = getCharacteristic(bonusToCharacteristic);
    if (!this.constructor.availableBonusToCharacteristics.includes(c)) {
      throw new Error(
        `Invalid 'bonusToCharacteristic' provided to ${this.constructor.name} (${characteristic})`,
      );
    }
    this.bonusToCharacteristic = c;
  }

  static get displayName() {
    return 'Conditional Bonus';
  }

  static get description() {
    return `{unmodified} rolls of {on} for {characteristic} result in a bonus
    of {bonus} to {bonusToCharacteristic}`;
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

  resolve(owner: WeaponProfile) {
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
