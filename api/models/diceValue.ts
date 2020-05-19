import { Dice } from './dice';

/**
 * A class used to represent a combination of Dice and Constants (e.g: D3, 2D6, D6+2, etc.)
 */
class DiceValue {
  additions: (Dice | number)[];
  subtractions: (Dice | number)[];

  constructor(additions: (Dice | number)[] = [], subtractions: (Dice | number)[] = []) {
    const validateItem = (item: Dice | number) => {
      if (!(item instanceof Dice) && Number.isNaN(Number(item))) {
        throw new Error('Invalid Dice / Number provided to DiceValue');
      }
    };

    additions.forEach(validateItem);
    subtractions.forEach(validateItem);

    this.additions = additions;
    this.subtractions = subtractions;
  }

  /**
   * The average of this dice value (combination of the average of each dice,
   * summed with the additions)
   * */
  get average(): number {
    const averageAdditions = this.additions.reduce<number>(
      (acc, item) => (item instanceof Dice ? acc + item.average : acc + Number(item)),
      0,
    );
    const averageSubtractions = this.subtractions.reduce<number>(
      (acc, item) => (item instanceof Dice ? acc + item.average : acc + Number(item)),
      0,
    );
    return averageAdditions - averageSubtractions;
  }

  /**
   * Get the maximum of this dice value
   */
  get max(): number {
    const maxAdditions = this.additions.reduce<number>(
      (acc, item) => (item instanceof Dice ? acc + item.sides : acc + Number(item)),
      0,
    );
    const minSubtractions = this.subtractions.reduce<number>(
      (acc, item) => (item instanceof Dice ? acc + 1 : acc + Number(item)),
      0,
    );
    return maxAdditions - minSubtractions;
  }

  /** Roll the this dice value (combination of dice rolls summed with additions) */
  roll(): number {
    const rolledAdditions = this.additions.reduce<number>(
      (acc, item) => (item instanceof Dice ? acc + item.roll() : acc + Number(item)),
      0,
    );
    const rolledSubtractions = this.subtractions.reduce<number>(
      (acc, item) => (item instanceof Dice ? acc + item.roll() : acc + Number(item)),
      0,
    );
    return rolledAdditions - rolledSubtractions;
  }

  /**
   * Build a `DiceValue` class by parsing a value
   */
  static parse(val: string | Dice | DiceValue | number): DiceValue {
    if (val instanceof this) return val;
    if (val instanceof Dice) return new this([val]);
    const additions: (Dice | number)[] = [];
    const subtractions: (Dice | number)[] = [];
    const items = String(val)
      .replace(/\s/g, '')
      .split(/(?=[+-])/g)
      .filter((item) => item);
    items.forEach((item) => {
      const acc = item.charAt(0) === '-' ? subtractions : additions;
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
