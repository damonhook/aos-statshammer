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

  resolveSaves(target, wounds) {
    const save = target.getSaveAfterRend(this.getRend());
    const saves = save ? (wounds * D6.getProbability(save)) : 0;
    const successful = wounds - saves;
    return this.resolveDamage(target, successful);
  }

  resolveDamage(target, successful) {
    const damagePerSuccessful = this.getDamage();
    return successful * damagePerSuccessful;
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
