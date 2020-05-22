import AverageDamageProcessor from '../processors/averageDamageProcessor';
import MaxDamageProcessor from '../processors/maxDamageProcessor';
import SimulationProcessor from '../processors/simulationProcessor';
import type { IUnitSimulation, TUnitSimulationBucket, TUnitSimulationMetrics } from '../types/models/unit';
import { range } from '../utils/mathUtils';
import type Target from './target';
import WeaponProfile from './weaponProfile';

type TFreqMap = { [damage: number]: number };

/**
 * A class representing a single AoS Unit
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
   * @param target The target to calculate the damage against
   */
  averageDamage(target: Target): number {
    return this.weaponProfiles.reduce(
      (acc, profile) => acc + new AverageDamageProcessor(profile, target).getAverageDamage(),
      0,
    );
  }

  /**
   * Calculate the maximum damage this unit could do
   */
  maxDamage(): number {
    return this.weaponProfiles.reduce(
      (acc, profile) => acc + new MaxDamageProcessor(profile).getMaxDamage(),
      0,
    );
  }

  runSimulations(target: Target, numSimulations = 1000): IUnitSimulation {
    const max = this.maxDamage();
    const mean = this.averageDamage(target);

    let variance = 0;
    const counts: TFreqMap = {};
    [...Array(numSimulations)].forEach(() => {
      const result = this.weaponProfiles.reduce<number>((acc, profile) => {
        const sim = new SimulationProcessor(profile, target);
        const simResult = sim.simulate();
        return acc + simResult;
      }, 0);
      variance += (result - mean) ** 2;
      counts[result] = counts[result] ? counts[result] + 1 : 1;
    });
    variance /= numSimulations;
    const standardDeviation = Math.sqrt(variance);

    const metrics = {
      max: Number(max.toFixed(2)),
      mean: Number(mean.toFixed(2)),
      variance: Number(variance.toFixed(2)),
      standardDeviation: Number((standardDeviation ?? 0).toFixed(2)),
    };

    const buckets = this.convertCountsToBuckets(counts, metrics, numSimulations);

    return { buckets, metrics };
  }

  private convertCountsToBuckets(
    counts: TFreqMap,
    metrics: TUnitSimulationMetrics,
    numSimulations: number,
  ): TUnitSimulationBucket[] {
    const { max } = metrics;

    const buckets = Object.keys(counts)
      .map(Number)
      .sort((x, y) => x - y)
      .map((damage) => ({
        damage,
        count: counts[damage],
        probability: parseFloat(((counts[damage] * 100) / numSimulations).toFixed(2)),
      }));

    const sampleMax = Math.max(...Object.keys(counts).map(Number));
    const step = Math.max(Math.floor(((max - sampleMax) / max) * 10), 1);
    [...range(sampleMax + 1, max, step)].forEach((i) => {
      buckets.push({ damage: i, count: 0, probability: 0 });
    });
    if (sampleMax < max) {
      buckets.push({ damage: max, count: 0, probability: 0 });
    }
    buckets.push({ damage: max + 1, count: 0, probability: 0 });

    return buckets;
  }
}

export default Unit;
