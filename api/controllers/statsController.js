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

const buildProbability = ({ save, ...unitResults }) => {
  const probabilities = {};
  const metrics = { mean: {}, median: {}, max: {} };
  Object.keys(unitResults).forEach((name) => {
    unitResults[name].buckets.forEach(({ damage, probability }) => {
      if (probabilities[damage] == null) probabilities[damage] = {};
      probabilities[damage][name] = probability;
    });
    metrics.mean[name] = unitResults[name].metrics.mean;
    metrics.median[name] = unitResults[name].metrics.median;
    metrics.max[name] = unitResults[name].metrics.max;
  });
  const buckets = Object.keys(probabilities).sort((x, y) => x - y).map((damage) => ({
    damage, ...probabilities[damage],
  }));
  return { save, buckets, metrics };
};

export const simulateUnitsForSave = ({
  units, save, numSimulations = 1000, includeOutcomes = false,
}) => {
  const unitList = units.map(({ name, weapon_profiles }) => new Unit(name, weapon_profiles));
  const target = new Target(save);
  const results = unitList.reduce((acc, unit) => {
    acc[unit.name] = unit.runSimulations(target, numSimulations, includeOutcomes);
    return acc;
  }, { save: save ? save.toString() : 'None' });
  const probabilities = buildProbability(results);

  return {
    results,
    probabilities,
    units: unitList,
  };
};

export const simulateUnits = ({ units, numSimulations = 1000, includeOutcomes = false }) => {
  const unitList = units.map(({ name, weapon_profiles }) => new Unit(name, weapon_profiles));
  const data = SAVES.reduce((acc, save) => {
    const saveData = simulateUnitsForSave({
      units, save, numSimulations, includeOutcomes,
    });
    return {
      results: [...acc.results, saveData.results],
      probabilities: [...acc.probabilities, saveData.probabilities],
    };
  }, { results: [], probabilities: [] });

  return {
    ...data,
    units: unitList,
  };
};
