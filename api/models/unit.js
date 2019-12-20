import WeaponProfile from './weaponProfile';
import Simulation from '../processors/simulation';
import { getMetrics } from '../utils';

/**
 * A class representing a single unit
 */
class Unit {
  /**
   * @param {string} name The name of the unit
   * @param {WeaponProfile[]} weaponProfiles The list of weapon profiles belonging to the unit
   */
  constructor(name, weaponProfiles) {
    this.name = name;
    this.weaponProfiles = weaponProfiles.map((profile) => {
      if (profile instanceof WeaponProfile) return profile;
      return new WeaponProfile(
        profile.num_models,
        profile.attacks,
        profile.to_hit,
        profile.to_wound,
        profile.rend,
        profile.damage,
        profile.modifiers,
      );
    });
  }

  /**
   * Calculate the average damage this unit would do against a particular target
   * @param {Target} target The target to calculate the damage against
   */
  averageDamage(target) {
    return this.weaponProfiles.reduce((acc, profile) => (acc + profile.averageDamage(target)), 0);
  }

  runSimulations(target, numSimulations = 1000, includeOutcomes = true) {
    const results = [...Array(numSimulations)].map(() => (
      this.weaponProfiles.reduce((acc, profile) => {
        const sim = new Simulation(profile, target);
        const simResult = sim.simulate();
        return acc + simResult;
      }, 0)
    ));

    let buckets = results.reduce((acc, n) => {
      acc[n] = acc[n] ? acc[n] + 1 : 1;
      return acc;
    }, {});

    buckets = Object.keys(buckets).sort((x, y) => x - y).map((damage) => ({
      damage,
      count: buckets[damage],
      probability: parseFloat(((buckets[damage] * 100) / numSimulations).toFixed(2)),
    }));

    const data = includeOutcomes ? { results } : {};

    return {
      ...data,
      buckets,
      metrics: getMetrics(results),
    };
  }
}

export default Unit;
