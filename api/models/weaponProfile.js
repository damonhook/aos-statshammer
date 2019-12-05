/* eslint-disable no-underscore-dangle */
import { ModifierManager, MODIFIERS as m } from './modifiers';
import { Characteristics as C } from './../constants';
import { D6, Dice, parseDice } from './dice';


class WeaponProfile {
  constructor(numModels, attacks, toHit, toWound, rend, damage, modifiers = []) {
    this.numModels = parseInt(numModels);
    this.attacks = parseInt(attacks);
    this.toHit = parseInt(toHit);
    this.toWound = parseInt(toWound);
    this.rend = parseInt(rend);
    this.damage = parseDice(damage);
    this.modifiers = new ModifierManager(modifiers);
  }

  getAttacks(unmodified = false) {
    let { attacks } = this;
    if (!unmodified) attacks += this.resolveModifier(m.BONUS, C.ATTACKS);
    return attacks;
  }

  getToHit(unmodified = false) {
    let { toHit } = this;
    if (!unmodified) toHit += this.resolveModifier(m.BONUS, C.TO_HIT);
    return Math.min(Math.max(toHit, 2), 6);
  }

  getToWound(unmodified = false) {
    let { toWound } = this;
    if (!unmodified) toWound += this.resolveModifier(m.BONUS, C.TO_WOUND);
    return Math.min(Math.max(toWound, 2), 6);
  }

  getRend(unmodified = false) {
    let { rend } = this;
    if (!unmodified) rend += this.resolveModifier(m.BONUS, C.REND);
    return Math.max(rend, 0);
  }

  getDamage(unmodified = false) {
    let { damage } = this;
    if (damage instanceof Dice) damage = damage.average
    else damage = parseInt(damage)

    if (!unmodified) damage += this.resolveModifier(m.BONUS, C.DAMAGE);
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
    totalAttacks += this.resolveModifier(m.LEADER_EXTRA_ATTACKS, C.ATTACKS)
    const avgDamage = this.resolveHits(target, 0);
    return avgDamage * totalAttacks;
  }

  resolveHits(target, damage = 0) {
    let hits = D6.getProbability(this.getToHit());
    hits += this.resolveRerolls(C.TO_HIT);
    hits += this.resolveModifier(m.EXPLODING, C.TO_HIT);

    const mwModifier = this.modifiers.getModifier(m.MORTAL_WOUNDS, C.TO_HIT)
    if (mwModifier) {
      const mortalHits = mwModifier.resolve(this);
      damage += mortalHits * mwModifier.getMortalWounds();
      hits -= !mwModifier.inAddition ? mortalHits : 0;
    }

    return this.resolveWounds(target, hits, damage);
  }

  resolveWounds(target, hits, damage = 0) {
    let wounds = hits * D6.getProbability(this.getToWound());
    wounds += this.resolveRerolls(C.TO_WOUND);
    return this.resolveSaves(target, wounds, damage);
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
    const m = this.modifiers.getModifier(modifier, characteristic);
    if (m) return m.resolve(this);
    return 0;
  }

  resolveRerolls(characteristic) {
    const m = this.modifiers.getRerollModifier(characteristic);
    if (m) return m.resolve(this);
    return 0;
  }
}

export default WeaponProfile;