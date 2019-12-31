import { TargetModifierManager, TARGET_MODIFIERS as t } from './targetModifiers';
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
      if (!this.modifiers.getModifier(t.TARGET_ETHEREAL)) {
        if (rend) save += rend;
      }
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

  resolveMortalSave(profile) {
    return this.resolveChainedModifier(profile, t.TARGET_MORTAL_NEGATE);
  }

  resolveFNP(profile) {
    return this.resolveChainedModifier(profile, t.TARGET_FNP);
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

  resolveChainedModifier(profile, modifier) {
    const mods = this.modifiers.getStackableModifier(modifier);
    if (mods && mods.length) {
      const result = mods.reduce((acc, mod) => (
        acc + ((1 - acc) * mod.resolve(profile, this))
      ), 0);
      return Math.min(result, 1);
    }
    return 0;
  }
}

export default Target;
