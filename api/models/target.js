class Target {
  constructor(save) {
    this.save = parseInt(save);
  }

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
