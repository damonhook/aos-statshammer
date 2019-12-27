import { TargetModifierManager, TARGET_MODIFIERS as m } from './targetModifiers';
import { D6 } from './dice';

/**
 * A class used as a target for calculating average damage
 */
class Target {
  /**
   * @param {int} save The targets base save
   * @param {object[]} modifiers The array of modifiers the target has
   */
  constructor(save, modifiers = []) {
    this.save = Number(save);
    this.modifiers = new TargetModifierManager(modifiers);
  }

  /**
   * Get the targets save after rend has been applied
   * @param {int} rend The amount of rend the attack has
   */
  getSave(rend = null) {
    if (this.save) {
      let { save } = this;
      if (rend) save += rend;
      if (save > 6) return null;
      return Math.max(save, 2);
    }
    return null;
  }

  resolveSave(profile) {
    const save = this.getSave(profile.getRend());
    if (save === null) return 0;
    let saved = D6.getProbability(save);
    saved += this.resolveRerolls(profile);
    return Math.min(saved, 1);
  }

  resolveFNP(profile) {
    const saved = this.resolveModifier(profile, m.TARGET_FNP);
    return saved;
  }

  resolveModifier(profile, modifier) {
    const mod = this.modifiers.getModifier(modifier);
    if (mod) return mod.resolve(profile, this);
    return 0;
  }

  resolveRerolls(profile) {
    const mod = this.modifiers.getRerollModifier();
    if (mod) return mod.resolve(profile, this);
    return 0;
  }

  resolveStackableModifier(profile, modifier) {
    const modList = this.modifiers.getStackableModifier(modifier);
    if (modList && modList.length) {
      return modList.reduce((acc, mod) => acc + mod.resolve(profile, this), 0);
    }
    return 0;
  }
}

export default Target;
