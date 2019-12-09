export class Dice {
  constructor(sides) {
    this.sides = Number(sides);
  }

  get average() {
    return (this.sides + 1) / 2;
  }

  getProbability(target) {
    let numerator = this.sides - target + 1;
    numerator = Math.min(Math.max(numerator, 0), this.sides);
    return numerator / this.sides;
  }

  getInverseProbability(target) {
    return 1 - this.getProbability(target);
  }
}

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
  return Number(val);
};

export const D3 = new Dice(3);
export const D6 = new Dice(6);

export { Dice as default };
