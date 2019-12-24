import { D6 } from '../models/dice';
import { Characteristics as C } from '../constants';
import { getMetrics } from '../utils';
import { MODIFIERS as m } from '../models/modifiers';

class Simulation {
  constructor(profile, target) {
    this.profile = profile;
    this.target = target;
  }

  runSimulations(numSimulations = 1000) {
    const results = [...Array(numSimulations)].map(() => this.simulate());
    return {
      results,
      metrics: getMetrics(results),
    };
  }

  simulate() {
    let { numModels } = this.profile;
    let totalAttacks = 0;

    const leaderModifiers = this.profile.getLeaderModifiers();
    let leaderDamage = 0;
    if (leaderModifiers && leaderModifiers.length) {
      const { numLeaders } = leaderModifiers[0];
      numModels = Math.max(numModels - numLeaders, 0);
      const leaderProfile = this.profile.getSplitProfile(
        leaderModifiers, leaderModifiers.map((mod) => mod.getAsBonusModifier()),
      );
      leaderProfile.numModels = numLeaders;
      const leaderSim = new Simulation(leaderProfile, this.target);
      const leaderAttacks = numLeaders * leaderProfile.getAttacks(false, true);
      leaderDamage += [...Array(leaderAttacks)].reduce((acc) => (
        acc + leaderSim.resolveHitRoll()
      ), 0);
    }
    totalAttacks += numModels * this.profile.getAttacks(false, true);
    return [...Array(totalAttacks)].reduce((acc) => acc + this.resolveHitRoll(), 0) + leaderDamage;
  }

  resolveHitRoll() {
    const hitRoll = this.performReroll(C.TO_HIT, D6.roll());
    if (hitRoll >= this.profile.getToHit()) {
      const explodingModifier = this.profile.modifiers.getModifier(m.EXPLODING, C.TO_HIT);
      if (explodingModifier && hitRoll >= explodingModifier.on) {
        return [...Array(explodingModifier.getExtra(true) + 1)].reduce((acc) => (
          acc + this.resolveWoundRoll()
        ), 0);
      }

      const mwModifier = this.profile.modifiers.getModifier(m.MORTAL_WOUNDS, C.TO_HIT);
      let mortalDamage = 0;
      if (mwModifier && hitRoll >= mwModifier.on) {
        mortalDamage = mwModifier.getMortalWounds(true);
        if (!mwModifier.inAddition) return mortalDamage;
      }

      const cbModifier = this.profile.modifiers.getModifier(m.CONDITIONAL_BONUS, C.TO_HIT);
      if (cbModifier && hitRoll >= cbModifier.on) {
        const splitProfile = this.profile.getSplitProfile(
          [cbModifier], [cbModifier.getAsBonusModifier()],
        );
        const splitSimulation = new Simulation(splitProfile, this.target);
        return splitSimulation.resolveWoundRoll() + mortalDamage;
      }

      return this.resolveWoundRoll() + mortalDamage;
    }
    return 0;
  }

  resolveWoundRoll() {
    const woundRoll = this.performReroll(C.TO_WOUND, D6.roll());
    if (woundRoll >= this.profile.getToWound()) {
      const explodingModifier = this.profile.modifiers.getModifier(m.EXPLODING, C.TO_WOUND);
      if (explodingModifier && woundRoll >= explodingModifier.on) {
        return [...Array(explodingModifier.getExtra(true) + 1)].reduce((acc) => (
          acc + this.resolveSaveRoll()
        ), 0);
      }

      const mwModifier = this.profile.modifiers.getModifier(m.MORTAL_WOUNDS, C.TO_WOUND);
      let mortalDamage = 0;
      if (mwModifier && woundRoll >= mwModifier.on) {
        mortalDamage = mwModifier.getMortalWounds(true);
        if (!mwModifier.inAddition) return mortalDamage;
      }

      const cbModifier = this.profile.modifiers.getModifier(m.CONDITIONAL_BONUS, C.TO_WOUND);
      if (cbModifier && woundRoll >= cbModifier.on) {
        const splitProfile = this.profile.getSplitProfile(
          [cbModifier], [cbModifier.getAsBonusModifier()],
        );
        const splitSimulation = new Simulation(splitProfile, this.target);
        return splitSimulation.resolveSaveRoll() + mortalDamage;
      }

      return this.resolveSaveRoll() + mortalDamage;
    }
    return 0;
  }

  resolveSaveRoll() {
    const saveRoll = D6.roll();
    const save = this.target.getSaveAfterRend(this.profile.getRend());
    if (!save || saveRoll < save) {
      return this.resolveDamage();
    }
    return 0;
  }

  resolveDamage() {
    return this.profile.getDamage();
  }

  performReroll(characteristic, roll) {
    if (roll < this.profile.getCharacteristic(characteristic)) {
      const rerollModifier = this.profile.modifiers.getRerollModifier(characteristic);
      if (rerollModifier && rerollModifier.allowedReroll(this.profile, roll)) {
        return D6.roll();
      }
    }
    return roll;
  }
}

export default Simulation;
