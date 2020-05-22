import { SAVES } from '../constants';
import Target from '../models/target';
import Unit from '../models/unit';
import type { IUnitSimulation } from '../types/models';
import type { ICompareResponse } from '../types/responses/compare';
import type {
  ISimulationResult,
  ISimulationsForSaveResponse,
  ISimulationsResponse,
  TMetrics,
  TProbabilityResult,
} from '../types/responses/simulations';

type TMappedResult = {
  save: number;
  results: { [name: string]: IUnitSimulation };
};

interface ISimulateForSaveRequest {
  units: any;
  save: number;
  target: any;
  numSimulations?: number;
}

export type TMappedProbabilities = {
  [damage: number]: { [name: string]: number };
};

export default class StatsController {
  /**
   * Compare the average damage of these units. Used by `api/compare`
   */
  compareUnits({ units, target }): ICompareResponse {
    const unitList: Unit[] = units.map(({ name, weapon_profiles }) => new Unit(name, weapon_profiles));
    const results = SAVES.map((save) => {
      const targetClass = new Target(save, target ? target.modifiers : []);
      return unitList.reduce(
        (acc, unit) => {
          acc[unit.name] = Number(unit.averageDamage(targetClass).toFixed(2));
          return acc;
        },
        { save: save ?? 0 },
      );
    });

    return { results };
  }

  simulateUnits({ units, target, numSimulations = 1000 }): ISimulationsResponse {
    return SAVES.reduce<ISimulationsResponse>(
      (acc, save) => {
        const saveData = this.simulateUnitsForSave({
          units,
          save,
          target,
          numSimulations,
        });
        return { results: [...acc.results, saveData.results] };
      },
      { results: [] },
    );
  }

  simulateUnitsForSave({
    units,
    save,
    target,
    numSimulations = 1000,
  }: ISimulateForSaveRequest): ISimulationsForSaveResponse {
    const unitList: Unit[] = units.map(({ name, weapon_profiles }) => new Unit(name, weapon_profiles));
    const targetClass = new Target(save, target ? target.modifiers : []);
    const data = unitList.reduce<TMappedResult>(
      (acc, unit) => {
        acc.results[unit.name] = unit.runSimulations(targetClass, numSimulations);
        return acc;
      },
      { save: save ?? 0, results: {} },
    );
    return { results: this.buildSimulationResult(data) };
  }

  private buildSimulationResult(data: TMappedResult): ISimulationResult {
    const unitNames = Object.keys(data.results);
    const metrics = this.buildSimulationMetrics(data);
    const maxDamage = Math.max(...Object.keys(metrics.max).map((name) => metrics.max[name]));
    const mappedProbabilities = Object.keys(data.results).reduce<TMappedProbabilities>((acc, name) => {
      data.results[name].buckets.forEach(({ damage, probability }) => {
        if (damage > maxDamage) return;
        if (acc[damage] == null) acc[damage] = {};
        acc[damage][name] = probability;
      });
      return acc;
    }, {});

    const discrete = this.buildDiscreteProbabilities(mappedProbabilities);
    const cumulative = this.buildCumulativeProbabilities(mappedProbabilities, unitNames, metrics);
    return { save: data.save, discrete, cumulative, metrics };
  }

  private buildSimulationMetrics(data: TMappedResult): TMetrics {
    const initial: TMetrics = { mean: {}, max: {}, variance: {}, standardDeviation: {} };
    const metrics = Object.keys(initial);
    return Object.keys(data.results).reduce<TMetrics>((acc, name) => {
      metrics.forEach((metric) => {
        acc[metric][name] = data.results[name].metrics[metric];
      });
      return acc;
    }, initial);
  }

  private buildDiscreteProbabilities(probabilities: TMappedProbabilities): TProbabilityResult[] {
    return Object.keys(probabilities)
      .map(Number)
      .sort((x, y) => x - y)
      .map((damage) => ({ damage, ...probabilities[damage] }));
  }

  private buildCumulativeProbabilities(
    probabilities: TMappedProbabilities,
    unitNames: string[],
    metrics: TMetrics,
  ): TProbabilityResult[] {
    const maxDamage = Math.max(...Object.keys(probabilities).map((n) => Number(n)));
    const sums = unitNames.reduce((acc, name) => ({ ...acc, [name]: 0 }), {});
    const cumulative = [...Array(maxDamage)].map((_, damage) => {
      const map = probabilities[damage] ?? {};
      return unitNames.reduce(
        (acc, name) => {
          sums[name] += map[name] ?? 0;
          if (sums[name] >= 100 || damage > metrics.max[name]) {
            sums[name] = 100;
          }
          return { ...acc, [name]: Number(sums[name].toFixed(2)) };
        },
        { damage },
      );
    });
    return [...cumulative, unitNames.reduce((acc, name) => ({ ...acc, [name]: 100 }), { damage: maxDamage })];
  }
}
