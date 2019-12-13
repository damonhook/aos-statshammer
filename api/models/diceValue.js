import { Dice, parseDice } from './dice';

export class DiceValue {
  constructor(items) {
    const dice = [];
    const constants = [];
    items.forEach((item) => {
      if (item instanceof Dice) dice.push(item);
      else if (!Number.isNaN(Number(item))) constants.push(Number(item));
      else throw new Error(`Invalid item ${item} passed to DiceValue`);
    });
    this.dice = dice;
    this.constants = constants;
  }

  /** The average of this dice value */
  get average() {
    const diceAverage = this.dice.reduce((acc, die) => acc + die.average, 0);
    const constants = this.constants.reduce((acc, c) => acc + c, 0);
    return diceAverage + constants;
  }
}

export const parseDiceValue = (val) => {
  if (val instanceof DiceValue) {
    return val;
  }
  let items = String(val).split(/\+/);
  items = items.reduce((acc, item) => {
    const i = item.trim();
    const multiDiceMatch = i.match(/^(\d+)([dD]\d+)$/);
    if (multiDiceMatch && multiDiceMatch[1] && multiDiceMatch[2]) {
      acc.push(...[...Array(Number(multiDiceMatch[1]))].map(() => parseDice(multiDiceMatch[2])));
    } else {
      acc.push(parseDice(i));
    }
    return acc;
  }, []);
  return new DiceValue(items);
};
