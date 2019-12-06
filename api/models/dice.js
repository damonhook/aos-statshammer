export class Dice {
  constructor(sides) {
    this.sides = sides;
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
    const newTarget = this.sides - target + 2;
    return this.getProbability(newTarget);
  }
}

export const parseDice = (val) => ((val instanceof Dice) ? val : Number(val));

export const D3 = new Dice(3);
export const D6 = new Dice(6);

export { Dice as default };
