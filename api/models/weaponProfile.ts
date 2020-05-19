import { Characteristic as C, Characteristic } from '../constants';
import DiceValue from './diceValue';
import ModifierManager, { MODIFIERS as m } from './modifiers';
import type BaseModifier from './modifiers/BaseModifier';
import type LeaderBonus from './modifiers/LeaderBonus';

/**
 * A class representing a single weapon profile belonging to a unit
 */
class WeaponProfile {
  numModels: number;
  attacks: DiceValue;
  toHit: number;
  toWound: number;
  rend: number;
  damage: DiceValue;
  modifiers: ModifierManager;

  constructor(
    numModels: number,
    attacks: number | string | DiceValue,
    toHit: number,
    toWound: number,
    rend: number,
    damage: number | string | DiceValue,
    modifiers: BaseModifier[] = [],
  ) {
    this.numModels = Number(numModels);
    this.attacks = DiceValue.parse(attacks);
    this.toHit = Number(toHit);
    this.toWound = Number(toWound);
    this.rend = Number(rend);
    this.damage = DiceValue.parse(damage);
    this.modifiers = new ModifierManager(modifiers);
  }

  /**
   * Get the number of attacks for the profile
   * @param unmodified Whether you want the unmodified characteristic or not
   * @param roll Whether the roll or use average
   */
  getAttacks(unmodified = false, roll = false): number {
    let attacks = roll ? this.attacks.roll() : this.attacks.average;
    if (!unmodified) attacks += this.resolveStackableModifier(m.BONUS, C.ATTACKS, roll);
    return Math.max(attacks, 1);
  }

  /**
   * Get the to hit target for the profile
   * @param unmodified Whether you want the unmodified characteristic or not
   */
  getToHit(unmodified = false, roll = false): number {
    let { toHit } = this;
    if (!unmodified) toHit -= this.resolveStackableModifier(m.BONUS, C.TO_HIT, roll);
    return Math.min(Math.max(toHit, 2), 6);
  }

  /**
   * Get the to wound target for the profile
   * @param unmodified Whether you want the unmodified characteristic or not
   */
  getToWound(unmodified = false, roll = false): number {
    let { toWound } = this;
    if (!unmodified) toWound -= this.resolveStackableModifier(m.BONUS, C.TO_WOUND, roll);
    return Math.min(Math.max(toWound, 2), 6);
  }

  /**
   * Get the amount of rend for the profile
   * @param unmodified Whether you want the unmodified characteristic or not
   */
  getRend(unmodified = false, roll = false): number {
    let { rend } = this;
    if (!unmodified) rend += this.resolveStackableModifier(m.BONUS, C.REND, roll);
    return Math.max(rend, 0);
  }

  /**
   * Get the damage for the profile
   * @param unmodified Whether you want the unmodified characteristic or not
   * @param roll Whether the roll or use average
   */
  getDamage(unmodified = false, roll = false): number {
    let damage = roll ? this.damage.roll() : this.damage.average;
    if (!unmodified) damage += this.resolveStackableModifier(m.BONUS, C.DAMAGE, roll);
    return Math.max(damage, 1);
  }

  /**
   * Get a characteristic for this profile
   * @param characteristic The characteristic to get
   * @param unmodified Whether you want the unmodified characteristic or not
   */
  getCharacteristic(characteristic: Characteristic, unmodified = false, roll = false): number {
    switch (characteristic) {
      case C.ATTACKS:
        return this.getAttacks(unmodified, roll);
      case C.TO_HIT:
        return this.getToHit(unmodified, roll);
      case C.TO_WOUND:
        return this.getToWound(unmodified, roll);
      case C.REND:
        return this.getRend(unmodified, roll);
      case C.DAMAGE:
        return this.getDamage(unmodified, roll);
      default:
        return 0;
    }
  }

  /**
   * Attempt to resolve a modifier of a given type and characteristic (if one exists)
   * @param modifier The modifier class to attempt to resolve
   * @param characteristic The characteristic the modifier must belong to
   */
  resolveModifier(modifier: typeof BaseModifier, characteristic: Characteristic): number {
    const mod = this.modifiers.getModifier(modifier, characteristic);
    if (mod) return mod.resolve(this);
    return 0;
  }

  /**
   * Attempt to resolve the reroll modifiers for a characteristic (if one exists)
   * @param characteristic The characteristic the modifier must belong to
   */
  resolveRerolls(characteristic: Characteristic): number {
    const mod = this.modifiers.getRerollModifier(characteristic);
    if (mod) return mod.resolve(this);
    return 0;
  }

  /**
   * Attempt to resolve a stackable modifier of a given type and characteristic (if one exists)
   * @param modifier The modifier class to attempt to resolve
   * @param characteristic The characteristic the modifier must belong to
   */
  resolveStackableModifier(
    modifier: typeof BaseModifier,
    characteristic: Characteristic,
    roll = false,
  ): number {
    const modList = this.modifiers.getStackableModifier(modifier, characteristic);
    if (modList && modList.length) {
      // @ts-ignore
      return modList.reduce((acc, mod) => acc + mod.resolve(this, roll), 0);
    }
    return 0;
  }

  /**
   * Get a new Profile based on this one (used for conditional modifiers
   * that cause branches in logic)
   * @param]} excludeModifiers An array of modifiers to exclude from the new profile
   * @param]} extraModifiers An array of modifiers to add to the new profile
   */
  getSplitProfile(excludeModifiers: BaseModifier[], extraModifiers: BaseModifier[]): WeaponProfile {
    const newProfile = new WeaponProfile(
      this.numModels,
      this.attacks,
      this.toHit,
      this.toWound,
      this.rend,
      this.damage,
      this.modifiers.modifiers.filter((mod) => !excludeModifiers.includes(mod)),
    );
    extraModifiers.forEach((mod) => {
      newProfile.modifiers.addModifier(mod);
    });
    return newProfile;
  }

  /**
   * Get the list of Leader specific modifiers (if any exist)
   */
  getLeaderModifiers(): LeaderBonus[] {
    const modList: LeaderBonus[] = [];
    m.LEADER_BONUS.availableCharacteristics.forEach((c) => {
      const mod = this.modifiers.getModifier(m.LEADER_BONUS, c);
      if (mod) modList.push(mod);
    });
    return modList;
  }
}

export default WeaponProfile;
