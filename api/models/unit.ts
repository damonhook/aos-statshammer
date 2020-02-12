import Average from '../processors/average';
import MaxDamageProcessor from '../processors/maxDamageProcessor';
import Simulation from '../processors/simulation';
import { getMetrics } from '../utils/StatsUtils';
import Target from './target';
import WeaponProfile from './weaponProfile';

/**
 * A class representing a single unit
 */
class Unit {
  name: string;
  weaponProfiles: WeaponProfile[];

  /**
   * @param name The name of the unit
   * @param weaponProfiles The list of weapon profiles belonging to the unit
   */
  constructor(name: string, weaponProfiles: any) {
    this.name = name;
    this.weaponProfiles = weaponProfiles.map(profile => {
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
   * @param target The target to calculate the damage against
   */
  averageDamage(target: Target): number {
    return this.weaponProfiles.reduce(
      (acc, profile) => acc + new Average(profile, target).getAverageDamage(),
      0,
    );
  }

  runSimulations(target: Target, numSimulations = 1000, includeOutcomes = true) {
    const results = [...Array(numSimulations)].map(() =>
      this.weaponProfiles.reduce((acc, profile) => {
        const sim = new Simulation(profile, target);
        const simResult = sim.simulate();
        return acc + simResult;
      }, 0),
    );

    const counts = results.reduce<{ [damage: number]: any }>((acc, n) => {
      acc[n] = acc[n] ? acc[n] + 1 : 1;
      return acc;
    }, {});

    const buckets = Object.keys(counts)
      .sort((x, y) => Number(x) - Number(y))
      .map(damage => ({
        damage,
        count: counts[damage],
        probability: parseFloat(((counts[damage] * 100) / numSimulations).toFixed(2)),
      }));

    const data = includeOutcomes ? { results } : {};

    return {
      ...data,
      buckets,
      metrics: getMetrics(results),
    };
  }

  maxDamage(): number {
    return this.weaponProfiles.reduce(
      (acc, profile) => acc + new MaxDamageProcessor(profile).getMaxDamage(),
      0,
    );
  }
}

export default Unit;
