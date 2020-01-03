import { D6 } from './dice';
import { TARGET_MODIFIERS as t, TargetModifierManager } from './targetModifiers';
import BaseTargetModifier from './targetModifiers/BaseTargetModifier';
import { ITarget, IWeaponProfile } from './../types/models';
import WeaponProfile from './weaponProfile';

/**
 * A class used as a target for calculating average damage
 */
class Target implements ITarget {
  save: number;
  modifiers: TargetModifierManager;

  constructor(save = 0, modifiers: BaseTargetModifier[] = []) {
    this.save = save ? Number(save) : 0;
    this.modifiers = new TargetModifierManager(modifiers);
  }

  /**
   * Get the targets save after rend has been applied
   */
  getSave(rend: number = null) {
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

  resolveSave(profile: WeaponProfile) {
    const save = this.getSave(profile.getRend());
    if (save === null) return 0;
    let saved = D6.getProbability(save);
    saved += this.resolveRerolls(profile);
    return Math.min(saved, 1);
  }

  resolveMortalSave(profile: WeaponProfile) {
    return this.resolveChainedModifier(profile, t.TARGET_MORTAL_NEGATE);
  }

  resolveFNP(profile: WeaponProfile) {
    return this.resolveChainedModifier(profile, t.TARGET_FNP);
  }

  resolveModifier(profile: WeaponProfile, modifier) {
    const mod = this.modifiers.getModifier(modifier);
    if (mod) return mod.resolve(profile, this);
    return 0;
  }

  resolveRerolls(profile: WeaponProfile) {
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
      const result = mods.reduce((acc, mod) => acc + (1 - acc) * mod.resolve(profile, this), 0);
      return Math.min(result, 1);
    }
    return 0;
  }
}

export default Target;
