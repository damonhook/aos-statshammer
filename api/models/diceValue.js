import { Dice } from './dice';

/**
 * A class used to represent a combination of Dice and Constants (e.g: D3, 2D6, D6+2, etc.)
 */
class DiceValue {
  /**
   * @param {[Dice,Number]} items
   */
  constructor(items) {
    const dice = [];
    let additions = 0;
    items.forEach((item) => {
      if (item instanceof Dice) dice.push(item);
      else if (!Number.isNaN(Number(item))) additions += Number(item);
      else throw new Error(`Invalid item ${item} passed to DiceValue`);
    });
    this.dice = dice;
    this.additions = additions;
  }

  /**
   * The average of this dice value (combination of the average of each dice,
   * summed with the additions)
   * */
  get average() {
    return this.dice.reduce((acc, die) => acc + die.average, 0) + this.additions;
  }

  /**
   * Build a `DiceValue` class by parsing a value
   * @param {string|DiceValue|int|float} val The value to parse
   */
  static parse(val) {
    if (val instanceof this) return val;
    let items = String(val).split(/\+/);
    items = items.reduce((acc, item) => {
      const i = item.trim();
      const multiDiceMatch = i.match(/^(\d+)([dD]\d+)$/);
      if (multiDiceMatch && multiDiceMatch[1] && multiDiceMatch[2]) {
        acc.push(...[...Array(Number(multiDiceMatch[1]))].map(() => Dice.parse(multiDiceMatch[2])));
      } else {
        acc.push(Dice.parse(i));
      }
      return acc;
    }, []);
    return new this(items);
  }
}

export { DiceValue as default };
