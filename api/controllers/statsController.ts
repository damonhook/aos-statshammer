import { SAVES } from '../constants';
import Target from '../models/target';
import Unit from '../models/unit';

/**
 * Compare the average damage of these units
 */
export const compareUnits = ({ units, target }) => {
  const unitList: Unit[] = units.map(({ name, weapon_profiles }) => new Unit(name, weapon_profiles));
  const results = SAVES.map(save => {
    const targetClass = new Target(save, target ? target.modifiers : []);
    return unitList.reduce(
      (acc, unit) => {
        acc[unit.name] = parseFloat(unit.averageDamage(targetClass).toFixed(2));
        return acc;
      },
      { save: save ? save.toString() : 'None' },
    );
  });

  return {
    results,
    units: unitList,
  };
};

const buildCumulative = (probabilities: any, unitNames: string[], metrics: any) => {
  const maxDamage = Math.max(...Object.keys(probabilities).map(n => Number(n)));
  const sums = unitNames.reduce((acc, name) => ({ ...acc, [name]: 0 }), {});
  const cumulative = [...Array(maxDamage + 1)].map((_, damage) => {
    const map = probabilities[damage] ?? {};
    return unitNames.reduce(
      (acc, name) => {
        const val = map[name] ?? 0;
        sums[name] += val;
        if (sums[name] >= 100 || damage > metrics.max[name]) {
          sums[name] = 100;
        }
        return { ...acc, [name]: Number(sums[name].toFixed(2)) };
      },
      { damage },
    );
  });
  return [
    ...cumulative,
    unitNames.reduce((acc, name) => ({ ...acc, [name]: 100 }), { damage: maxDamage + 1 }),
  ];
};

const buildProbability = ({ save, ...unitResults }) => {
  const probabilities = {};
  const metrics = { mean: {}, median: {}, max: {} };
  Object.keys(unitResults).forEach(name => {
    unitResults[name].buckets.forEach(({ damage, probability }) => {
      if (probabilities[damage] == null) probabilities[damage] = {};
      probabilities[damage][name] = probability;
    });
    metrics.mean[name] = unitResults[name].metrics.mean;
    metrics.median[name] = unitResults[name].metrics.median;
    metrics.max[name] = unitResults[name].metrics.max;
  });
  const buckets = Object.keys(probabilities)
    .sort((x, y) => Number(x) - Number(y))
    .map(damage => ({
      damage: Number(damage),
      ...probabilities[damage],
    }));
  const cumulative = buildCumulative(probabilities, Object.keys(unitResults), metrics);
  return {
    save,
    buckets,
    cumulative,
    metrics,
  };
};

export const simulateUnitsForSave = ({
  units,
  save,
  target,
  numSimulations = 1000,
  includeOutcomes = false,
}) => {
  const unitList: Unit[] = units.map(({ name, weapon_profiles }) => new Unit(name, weapon_profiles));
  const targetClass = new Target(save, target ? target.modifiers : []);
  const results = unitList.reduce(
    (acc, unit) => {
      acc[unit.name] = unit.runSimulations(targetClass, numSimulations, includeOutcomes);
      return acc;
    },
    { save: save ? save.toString() : 'None' },
  );
  const probabilities = buildProbability(results);

  return {
    results,
    probabilities,
    units: unitList,
  };
};

export const simulateUnits = ({ units, target, numSimulations = 1000, includeOutcomes = false }) => {
  const unitList = units.map(({ name, weapon_profiles }) => new Unit(name, weapon_profiles));
  const data = SAVES.reduce(
    (acc, save) => {
      const saveData = simulateUnitsForSave({
        units,
        save,
        target,
        numSimulations,
        includeOutcomes,
      });
      return {
        results: [...acc.results, saveData.results],
        probabilities: [...acc.probabilities, saveData.probabilities],
      };
    },
    { results: [], probabilities: [] },
  );

  return {
    ...data,
    units: unitList,
  };
};
