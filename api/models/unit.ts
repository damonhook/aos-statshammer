import Average from '../processors/average';
import MaxDamageProcessor from '../processors/maxDamageProcessor';
import Simulation from '../processors/simulation';
import { range } from '../utils/mathUtils';
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

  maxDamage(): number {
    return this.weaponProfiles.reduce(
      (acc, profile) => acc + new MaxDamageProcessor(profile).getMaxDamage(),
      0,
    );
  }

  runSimulations(target: Target, numSimulations = 1000) {
    const max = this.maxDamage();
    const mean = this.averageDamage(target);

    let variance = 0;
    const counts: { [damage: number]: number } = {};
    [...Array(numSimulations)].forEach(() => {
      const result = this.weaponProfiles.reduce<number>((acc, profile) => {
        const sim = new Simulation(profile, target);
        const simResult = sim.simulate();
        return acc + simResult;
      }, 0);
      variance += (result - mean) ** 2;
      counts[result] = counts[result] ? counts[result] + 1 : 1;
    });
    variance /= numSimulations;

    const buckets = Object.keys(counts)
      .map(Number)
      .sort((x, y) => x - y)
      .map(damage => ({
        damage,
        count: counts[damage],
        probability: parseFloat(((counts[damage] * 100) / numSimulations).toFixed(2)),
      }));

    const sampleMax = Math.max(...Object.keys(counts).map(Number));
    const step = Math.max(Math.floor(((max - sampleMax) / max) * 10), 1);
    [...range(sampleMax + 1, max, step)].forEach(i => {
      buckets.push({ damage: i, count: 0, probability: 0 });
    });
    buckets.push({ damage: max, count: 0, probability: 0 });

    return {
      buckets,
      metrics: {
        max,
        mean,
        variance,
        standardDeviation: Math.sqrt(variance),
      },
    };
  }
}

export default Unit;
