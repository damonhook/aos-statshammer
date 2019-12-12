/**
 * A class used to represent a dice value (e.g: D3, D6)
 */
export class Dice {
  /**
   * @param {number} sides The number of sides for the dice
   */
  constructor(sides) {
    this.sides = Number(sides);
  }

  /** The average of this dice */
  get average() {
    return (this.sides + 1) / 2;
  }

  /**
   * Get the probability of rolling a value >= to the `target`
   * @param {int} target The target to roll >= to
   */
  getProbability(target) {
    let numerator = this.sides - target + 1;
    numerator = Math.min(Math.max(numerator, 0), this.sides);
    return numerator / this.sides;
  }

  /**
   * Get the probability of rolling a value < than the `target`
   * @param {int} target The target to roll < than
   */
  getInverseProbability(target) {
    return 1 - this.getProbability(target);
  }
}

/**
 * Get a `Dice` class or `Number` for a given value
 * @param {string|Dice|int|float} val The value to parse
 */
export const parseDice = (val) => {
  if (val instanceof Dice) {
    return val;
  }
  if (typeof val === 'string') {
    const match = val.match(/^[dD](\d+)$/);
    if (match && match[1]) {
      return new Dice(match[1]);
    }
  }
  const num = Number(val);
  if (Number.isNaN(num)) {
    throw new Error('Invalid Value or Dice');
  }
  return num;
};

/** A 3 sided dice */
export const D3 = new Dice(3);
/** A 6 sided dice */
export const D6 = new Dice(6);

export { Dice as default };
