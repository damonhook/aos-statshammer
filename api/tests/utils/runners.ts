import Unit from 'api/models/unit';
import assert from 'assert';

import Target from '../../models/target';

export const SAVES = [0, 6, 5, 4, 3, 2];

export const round = (number: number) => Math.round(number * 1000) / 1000;

export const repeat = (results: number[]) => SAVES.map((save, index) => ({ save, result: results[index] }));

export const assertCloseEnough = (actual: number, expected: number, deviation = 0.1) => {
  const diff = Math.abs(actual - expected);
  const diffDeviation = diff / Math.max(actual, expected);
  assert.equal(diffDeviation <= deviation, true, `${actual} is not within ${deviation} of ${expected}`);
};

export const testUnit = (unit: Unit, results: number[]) => {
  repeat(results).forEach(({ save, result }) => {
    it(`should return correct damage (${save} save, ${result} damage)`, () => {
      const target = new Target(save);
      assert.equal(round(unit.averageDamage(target)), result);
    });
  });
};

export const testSimulation = (unit: Unit, results: number[]) => {
  repeat(results).forEach(({ save, result }) => {
    it(`should return correct mean damage (${save} save, ${result} damage, 5% variance)`, () => {
      const target = new Target(save);
      assertCloseEnough(unit.runSimulations(target, 3000).metrics.mean, result);
    });
  });
};
