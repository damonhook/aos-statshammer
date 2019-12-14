import { Dice } from './dice';

/**
 * A class used to represent a combination of Dice and Constants (e.g: D3, 2D6, D6+2, etc.)
 */
class DiceValue {
  /**
   * @param {[Dice,Number]} items
   */
  constructor(additions = [], subtractions = []) {
    const validateItem = (item) => {
      if (!(item instanceof Dice) && Number.isNaN(Number(item))) {
        throw new Error('Invalid Dice / Number provided to DiceValue');
      }
    };

    additions.forEach(validateItem);
    subtractions.forEach(validateItem);

    this.additions = additions;
    this.subtractions = subtractions;
    if (this.average < 0) {
      throw new Error('You cannot have a negative average');
    }
  }

  /**
   * The average of this dice value (combination of the average of each dice,
   * summed with the additions)
   * */
  get average() {
    const averageAditions = this.additions.reduce((acc, item) => (
      (item instanceof Dice) ? acc + item.average : acc + Number(item)
    ), 0);
    const averageSubtractions = this.subtractions.reduce((acc, item) => (
      (item instanceof Dice) ? acc + item.average : acc + Number(item)
    ), 0);
    return averageAditions - averageSubtractions;
  }

  /**
   * Build a `DiceValue` class by parsing a value
   * @param {string|DiceValue|int|float} val The value to parse
   */
  static parse(val) {
    if (val instanceof this) return val;
    if (val instanceof Dice) return new this([val]);
    const additions = [];
    const subtractions = [];
    const items = String(val).replace(/\s/g, '').split(/(?=[+-])/g).filter((item) => item);
    items.forEach((item) => {
      const acc = (item.charAt(0) === '-') ? subtractions : additions;
      const val = item.replace(/^[+-]/, '');
      const multiDiceMatch = val.match(/^(\d+)([dD]\d+)$/);
      if (multiDiceMatch && multiDiceMatch[1] && multiDiceMatch[2]) {
        acc.push(...[...Array(Number(multiDiceMatch[1]))].map(() => Dice.parse(multiDiceMatch[2])));
      } else {
        acc.push(Dice.parse(val));
      }
    });
    return new this(additions, subtractions);
  }
}

export { DiceValue as default };
