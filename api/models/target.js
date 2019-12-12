/**
 * A class used as a target for calculating average damage
 */
class Target {
  /**
   * @param {int} save The targets base save
   */
  constructor(save) {
    this.save = Number(save);
  }

  /**
   * Get the targets save after rend has been applied
   * @param {int} rend The amount of rend the attack has
   */
  getSaveAfterRend(rend = null) {
    if (this.save) {
      let { save } = this;
      if (rend) save += rend;
      if (save > 6) return null;
      return Math.max(save, 2);
    }
    return null;
  }
}

export default Target;
