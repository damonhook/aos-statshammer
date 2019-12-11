/* eslint-disable no-underscore-dangle */
import { ModifierManager, MODIFIERS as m } from './modifiers';
import { Characteristics as C } from '../constants';
import { D6, Dice, parseDice } from './dice';


class WeaponProfile {
  constructor(numModels, attacks, toHit, toWound, rend, damage, modifiers = []) {
    this.numModels = Number(numModels);
    this.attacks = parseDice(attacks);
    this.toHit = Number(toHit);
    this.toWound = Number(toWound);
    this.rend = Number(rend);
    this.damage = parseDice(damage);
    this.modifiers = new ModifierManager(modifiers);
  }

  getAttacks(unmodified = false) {
    let { attacks } = this;
    if (attacks instanceof Dice) {
      attacks = attacks.average;
    }
    if (!unmodified) attacks += this.resolveStackableModifier(m.BONUS, C.ATTACKS);
    return attacks;
  }

  getToHit(unmodified = false) {
    let { toHit } = this;
    if (!unmodified) toHit -= this.resolveStackableModifier(m.BONUS, C.TO_HIT);
    return Math.min(Math.max(toHit, 2), 6);
  }

  getToWound(unmodified = false) {
    let { toWound } = this;
    if (!unmodified) toWound -= this.resolveStackableModifier(m.BONUS, C.TO_WOUND);
    return Math.min(Math.max(toWound, 2), 6);
  }

  getRend(unmodified = false) {
    let { rend } = this;
    if (!unmodified) rend += this.resolveStackableModifier(m.BONUS, C.REND);
    return Math.max(rend, 0);
  }

  getDamage(unmodified = false) {
    let { damage } = this;
    if (damage instanceof Dice) damage = damage.average;
    else damage = Number(damage);

    if (!unmodified) damage += this.resolveStackableModifier(m.BONUS, C.DAMAGE);
    return Math.max(damage, 0);
  }

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

  averageDamage(target) {
    let totalAttacks = this.numModels * this.getAttacks();
    totalAttacks += this.resolveModifier(m.LEADER_EXTRA_ATTACKS, C.ATTACKS);
    return this.resolveHits(target, totalAttacks, 0);
  }

  resolveHits(target, attacks, damage = 0) {
    let hits = attacks * D6.getProbability(this.getToHit());
    let extraDamage = 0;
    hits += attacks * this.resolveRerolls(C.TO_HIT);
    hits += attacks * this.resolveModifier(m.EXPLODING, C.TO_HIT);

    const mwModifier = this.modifiers.getModifier(m.MORTAL_WOUNDS, C.TO_HIT);
    if (mwModifier) {
      const mortalHits = attacks * mwModifier.resolve(this);
      extraDamage += mortalHits * mwModifier.getMortalWounds();
      hits -= !mwModifier.inAddition ? mortalHits : 0;
    }

    return this.resolveWounds(target, hits, damage + extraDamage);
  }

  resolveWounds(target, hits, damage = 0) {
    let wounds = hits * D6.getProbability(this.getToWound());
    let extraDamage = 0;
    wounds += (hits * this.resolveRerolls(C.TO_WOUND));
    wounds += (hits * this.resolveModifier(m.EXPLODING, C.TO_WOUND));

    const mwModifier = this.modifiers.getModifier(m.MORTAL_WOUNDS, C.TO_WOUND);
    if (mwModifier) {
      const mortalToWounds = hits * mwModifier.resolve(this);
      extraDamage += mortalToWounds * mwModifier.getMortalWounds();
      wounds -= !mwModifier.inAddition ? mortalToWounds : 0;
    }

    const cbModifier = this.modifiers.getModifier(m.CONDITIONAL_BONUS, C.TO_WOUND);
    if (cbModifier) {
      const newProfile = new WeaponProfile(
        this.numModels,
        this.attacks,
        this.toHit,
        this.toWound,
        this.rend,
        this.damage,
        this.modifiers.modifiers.filter((mod) => mod !== cbModifier),
      );
      newProfile.modifiers.addModifier(cbModifier.getAsBonusModifier());
      const cbModWounds = hits * cbModifier.resolve(this);
      extraDamage += this.resolveSaves(target, cbModWounds, damage + extraDamage);
      wounds -= cbModWounds;
    }

    return this.resolveSaves(target, wounds, damage + extraDamage);
  }

  resolveSaves(target, wounds, damage = 0) {
    const save = target.getSaveAfterRend(this.getRend());
    const saves = save ? (wounds * D6.getProbability(save)) : 0;
    const successful = wounds - saves;
    return this.resolveDamage(target, successful, damage);
  }

  resolveDamage(target, successful, damage = 0) {
    const damagePerSuccessful = this.getDamage();
    return damage + (successful * damagePerSuccessful);
  }

  resolveModifier(modifier, characteristic) {
    const mod = this.modifiers.getModifier(modifier, characteristic);
    if (mod) return mod.resolve(this);
    return 0;
  }

  resolveRerolls(characteristic) {
    const mod = this.modifiers.getRerollModifier(characteristic);
    if (mod) return mod.resolve(this);
    return 0;
  }

  resolveStackableModifier(modifier, characteristic) {
    const modList = this.modifiers.getStackableModifier(modifier, characteristic);
    if (modList && modList.length) return modList.reduce((acc, mod) => acc + mod.resolve(this), 0);
    return 0;
  }
}

export default WeaponProfile;
