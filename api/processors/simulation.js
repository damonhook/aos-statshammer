import { D6 } from '../models/dice';
import { Characteristics as C } from '../constants';
import { getMean } from '../utils';

class Simulation {
  constructor(profile, target) {
    this.profile = profile;
    this.target = target;
  }

  runSimulations(numSimulations = 1000) {
    const results = [...Array(numSimulations)].map(() => this.simulate());
    return {
      results,
      metrics: {
        mean: getMean(results),
      },
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
      const leaderAttacks = numLeaders * leaderProfile.getAttacks();
      leaderDamage += [...Array(leaderAttacks)].reduce((acc) => (
        acc + leaderSim.resolveHitRoll()
      ), 0);
    }
    totalAttacks += numModels * this.profile.getAttacks();
    return [...Array(totalAttacks)].reduce((acc) => acc + this.resolveHitRoll(), 0) + leaderDamage;
  }

  resolveHitRoll() {
    const hitRoll = this.performReroll(C.TO_HIT, D6.roll());
    if (hitRoll >= this.profile.getToHit()) {
      return this.resolveWoundRoll();
    }
    return 0;
  }

  resolveWoundRoll() {
    const woundRoll = this.performReroll(C.TO_WOUND, D6.roll());
    if (woundRoll >= this.profile.getToWound()) {
      return this.resolveSaveRoll();
    }
    return 0;
  }

  resolveSaveRoll() {
    const saveRoll = D6.roll();
    const save = this.target.getSaveAfterRend(this.profile.getRend());
    if (saveRoll < save) {
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
      if (rerollModifier && rerollModifier.allowedReroll(roll)) {
        return D6.roll();
      }
    }
    return roll;
  }
}

export default Simulation;
