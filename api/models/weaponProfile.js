/* eslint-disable no-underscore-dangle */
import { ModifierManager, MODIFIERS as m } from './modifiers';
import { Characteristics as C } from '../constants';
import { D6 } from './dice';
import DiceValue from './diceValue';

/**
 * A class representing a single weapon profile belonging to a unit
 */
class WeaponProfile {
  /**
   * @param {int} numModels The number of models that have this profile
   * @param {int|DiceValue} attacks The number of attacks per model
   * @param {int} toHit The amount you have to roll >= to hit
   * @param {int} toWound The amount you have to roll >= to wound
   * @param {int} rend The amount of rend the profile has
   * @param {int|DiceValue} damage The amount of damage per wound this profile does
   * @param {object[]} modifiers The array of modifiers the profile has
   */
  constructor(numModels, attacks, toHit, toWound, rend, damage, modifiers = []) {
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
   * @param {bool} unmodified Whether you want the unmodified characteristic or not
   */
  getAttacks(unmodified = false) {
    let attacks = this.attacks.average;
    if (!unmodified) attacks += this.resolveStackableModifier(m.BONUS, C.ATTACKS);
    return Math.max(attacks, 1);
  }

  /**
   * Get the to hit target for the profile
   * @param {bool} unmodified Whether you want the unmodified characteristic or not
   */
  getToHit(unmodified = false) {
    let { toHit } = this;
    if (!unmodified) toHit -= this.resolveStackableModifier(m.BONUS, C.TO_HIT);
    return Math.min(Math.max(toHit, 2), 6);
  }

  /**
   * Get the to wound target for the profile
   * @param {bool} unmodified Whether you want the unmodified characteristic or not
   */
  getToWound(unmodified = false) {
    let { toWound } = this;
    if (!unmodified) toWound -= this.resolveStackableModifier(m.BONUS, C.TO_WOUND);
    return Math.min(Math.max(toWound, 2), 6);
  }

  /**
   * Get the amount of rend for the profile
   * @param {bool} unmodified Whether you want the unmodified characteristic or not
   */
  getRend(unmodified = false) {
    let { rend } = this;
    if (!unmodified) rend += this.resolveStackableModifier(m.BONUS, C.REND);
    return Math.max(rend, 0);
  }

  /**
   * Get the damage for the profile
   * @param {bool} unmodified Whether you want the unmodified characteristic or not
   */
  getDamage(unmodified = false) {
    let damage = this.damage.average;
    if (!unmodified) damage += this.resolveStackableModifier(m.BONUS, C.DAMAGE);
    return Math.max(damage, 1);
  }

  /**
   * Get a characteristic for this profile
   * @param {Characteritic} characteristic The characteristic to get
   * @param {bool} unmodified Whether you want the unmodified characteristic or not
   */
  getCharacteristic(characteristic, unmodified = false) {
    switch (characteristic) {
      case C.ATTACKS:
        return this.getAttacks(unmodified);
      case C.TO_HIT:
        return this.getToHit(unmodified);
      case C.TO_WOUND:
        return this.getToWound(unmodified);
      case C.REND:
        return this.getRend(unmodified);
      case C.DAMAGE:
        return this.getDamage(unmodified);
      default:
        return 0;
    }
  }

  /**
   * Calculate the average damage that this profile will do against a given target
   * @param {Target} target The target to calculate against
   */
  averageDamage(target) {
    let { numModels } = this;
    let totalAttacks = 0;

    const leaderModifiers = this.getLeaderModifiers();
    let leaderDamage = 0;
    if (leaderModifiers && leaderModifiers.length) {
      if (leaderModifiers.length === 1 && leaderModifiers[0].characteristic === C.ATTACKS) {
        totalAttacks += leaderModifiers[0].resolve(this);
      } else {
        const { numLeaders } = leaderModifiers[0];
        numModels = Math.max(numModels - numLeaders, 0);
        const leaderProfile = this.getSplitProfile(
          leaderModifiers, leaderModifiers.map((mod) => mod.getAsBonusModifier()),
        );
        leaderProfile.numModels = numLeaders;
        leaderDamage += leaderProfile.averageDamage(target);
      }
    }

    totalAttacks += numModels * this.getAttacks();
    return this.resolveHits(target, totalAttacks, 0) + leaderDamage;
  }

  /**
   * Calculate the average damage that this profile will do against a given target (Hit Phase)
   * @param {Target} target The target to calculate against
   * @param {float} attacks The number of attacks that have been done so far
   */
  resolveHits(target, attacks) {
    let hits = attacks * D6.getProbability(this.getToHit());
    hits += attacks * this.resolveRerolls(C.TO_HIT);
    hits += attacks * this.resolveModifier(m.EXPLODING, C.TO_HIT);

    const mwModifier = this.modifiers.getModifier(m.MORTAL_WOUNDS, C.TO_HIT);
    let mortalDamage = 0;
    if (mwModifier) {
      const mortalHits = attacks * mwModifier.resolve(this);
      mortalDamage += mortalHits * mwModifier.getMortalWounds();
      hits -= !mwModifier.inAddition ? mortalHits : 0;
    }

    const cbModifier = this.modifiers.getModifier(m.CONDITIONAL_BONUS, C.TO_HIT);
    let splitDamage = 0;
    if (cbModifier) {
      const newProfile = this.getSplitProfile([cbModifier], [cbModifier.getAsBonusModifier()]);
      const cbModHits = attacks * cbModifier.resolve(this);
      splitDamage = newProfile.resolveWounds(target, cbModHits);
      hits -= cbModHits;
    }

    return this.resolveWounds(target, hits) + mortalDamage + splitDamage;
  }

  /**
   * Calculate the average damage that this profile will do against a given target (Wound Phase)
   * @param {Target} target The target to calculate against
   * @param {float} hits The number of hits that have been done so far
   */
  resolveWounds(target, hits) {
    let wounds = hits * D6.getProbability(this.getToWound());
    wounds += (hits * this.resolveRerolls(C.TO_WOUND));
    wounds += (hits * this.resolveModifier(m.EXPLODING, C.TO_WOUND));

    const mwModifier = this.modifiers.getModifier(m.MORTAL_WOUNDS, C.TO_WOUND);
    let mortalDamage = 0;
    if (mwModifier) {
      const mortalToWounds = hits * mwModifier.resolve(this);
      mortalDamage += mortalToWounds * mwModifier.getMortalWounds();
      wounds -= !mwModifier.inAddition ? mortalToWounds : 0;
    }

    const cbModifier = this.modifiers.getModifier(m.CONDITIONAL_BONUS, C.TO_WOUND);
    let splitDamage = 0;
    if (cbModifier) {
      const newProfile = this.getSplitProfile([cbModifier], [cbModifier.getAsBonusModifier()]);
      const cbModWounds = hits * cbModifier.resolve(this);
      splitDamage = newProfile.resolveSaves(target, cbModWounds);
      wounds -= cbModWounds;
    }

    return this.resolveSaves(target, wounds) + mortalDamage + splitDamage;
  }

  /**
   * Calculate the average damage that this profile will do against a given target (Save Phase)
   * @param {Target} target The target to calculate against
   * @param {float} wounds The number of wounds that have been done so far
   */
  resolveSaves(target, wounds) {
    const save = target.getSaveAfterRend(this.getRend());
    const saves = save ? (wounds * D6.getProbability(save)) : 0;
    const successful = wounds - saves;
    return this.resolveDamage(target, successful);
  }

  /**
   * Calculate the average damage that this profile will do against a given target (Damage Phase)
   * @param {Target} target The target to calculate against
   * @param {float} successful The number of successful wounds that have been done so far
   */
  resolveDamage(target, successful) {
    const damagePerSuccessful = this.getDamage();
    return successful * damagePerSuccessful;
  }

  /**
   * Attempt to resolve a modifier of a given type and characteristic (if one exists)
   * @param {BaseModifier} modifier The modifier class to attempt to resolve
   * @param {Characteristic} characteristic The characteristic the modifier must belong to
   */
  resolveModifier(modifier, characteristic) {
    const mod = this.modifiers.getModifier(modifier, characteristic);
    if (mod) return mod.resolve(this);
    return 0;
  }

  /**
   * Attempt to resolve the reroll modifiers for a characteristic (if one exists)
   * @param {Characteristic} characteristic The characteristic the modifier must belong to
   */
  resolveRerolls(characteristic) {
    const mod = this.modifiers.getRerollModifier(characteristic);
    if (mod) return mod.resolve(this);
    return 0;
  }

  /**
   * Attempt to resolve a stackable modifier of a given type and characteristic (if one exists)
   * @param {BaseModifier} modifier The modifier class to attempt to resolve
   * @param {Characteristic} characteristic The characteristic the modifier must belong to
   */
  resolveStackableModifier(modifier, characteristic) {
    const modList = this.modifiers.getStackableModifier(modifier, characteristic);
    if (modList && modList.length) return modList.reduce((acc, mod) => acc + mod.resolve(this), 0);
    return 0;
  }

  /**
   * Get a new Profile based on this one (used for conditional modifiers
   * that cause branches in logic)
   * @param {BaseModifier[]} excludeModifiers An array of modifiers to exclude from the new profile
   * @param {BaseModifier[]} extraModifiers An array of modifiers to add to the new profile
   */
  getSplitProfile(excludeModifiers, extraModifiers) {
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
  getLeaderModifiers() {
    const modList = [];
    m.LEADER_BONUS.availableCharacteristics.forEach((c) => {
      const mod = this.modifiers.getModifier(m.LEADER_BONUS, c);
      if (mod) modList.push(mod);
    });
    return modList;
  }
}

export default WeaponProfile;
