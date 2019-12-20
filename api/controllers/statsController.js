import Unit from '../models/unit';
import Target from '../models/target';
import { SAVES } from '../constants';

/**
 * Compare the average damage of these units
 * @param {object} param0 An object containing the units to fetch
 */
export const compareUnits = ({ units }) => {
  const unitList = units.map(({ name, weapon_profiles }) => new Unit(name, weapon_profiles));
  const results = SAVES.map((save) => {
    const target = new Target(save);
    return unitList.reduce((acc, unit) => {
      acc[unit.name] = parseFloat(unit.averageDamage(target).toFixed(2));
      return acc;
    }, { save: save ? save.toString() : 'None' });
  });

  return {
    results,
    units: unitList,
  };
};

const buildProbabilities = (results) => results.map(({ save, ...unitResults }) => {
  const probabilities = {};
  const metrics = { mean: {}, max: {} };
  Object.keys(unitResults).forEach((name) => {
    unitResults[name].buckets.forEach(({ damage, probability }) => {
      if (probabilities[damage] == null) probabilities[damage] = {};
      probabilities[damage][name] = probability;
    });
    metrics.mean[name] = unitResults[name].metrics.mean;
    metrics.max[name] = unitResults[name].metrics.max;
  });
  const buckets = Object.keys(probabilities).sort((x, y) => x - y).map((damage) => ({
    damage, ...probabilities[damage],
  }));
  return { save, buckets, metrics };
});

export const simulateUnits = ({ units, numSimulations = 1000, includeOutcomes = false }) => {
  const unitList = units.map(({ name, weapon_profiles }) => new Unit(name, weapon_profiles));
  const results = SAVES.map((save) => {
    const target = new Target(save);
    return unitList.reduce((acc, unit) => {
      acc[unit.name] = unit.runSimulations(target, numSimulations, includeOutcomes);
      return acc;
    }, { save: save ? save.toString() : 'None' });
  });
  const probabilities = buildProbabilities(results);

  return {
    results,
    probabilities,
    units: unitList,
  };
};
