/* eslint-disable no-undef */
import assert from 'assert';
import Target from '../models/target';

export const SAVES = [0, 6, 5, 4, 3, 2];

export const round = number => Math.round(number * 1000) / 1000;

export const repeat = results => SAVES.map((save, index) => ({ save, result: results[index] }));

export const assertCloseEnough = (actual, expected, deviation = 0.05) => {
  const diff = Math.abs(actual - expected);
  const diffDeviation = diff / Math.max(actual, expected);
  assert.equal(diffDeviation <= deviation, true, `${actual} is not within ${deviation} of ${expected}`);
};

export const testUnit = (unit, results) => {
  repeat(results).forEach(({ save, result }) => {
    it(`should return correct damage (${save} save, ${result} damage)`, () => {
      const target = new Target(save);
      assert.equal(round(unit.averageDamage(target)), result);
    });
  });
};

export const testSimulation = (unit, results) => {
  repeat(results).forEach(({ save, result }) => {
    it(`should return correct mean damage (${save} save, ${result} damage, 5% variance)`, () => {
      const target = new Target(save);
      assertCloseEnough(unit.runSimulations(target, 3000).metrics.mean, result);
    });
  });
};
