/* eslint-disable no-undef */
import assert from 'assert';
import Target from '../models/target';

export const SAVES = [0, 6, 5, 4, 3, 2];

export const round = (number) => Math.round(number * 1000) / 1000;

export const repeat = (results) => SAVES.map((save, index) => (
  { save, result: results[index] }
));

const runTest = (unit, save, result) => {
  it(`should return correct damage (${save} save, ${result} damage)`, () => {
    const target = new Target(save);
    assert.equal(round(unit.averageDamage(target)), result);
  });
};

export const testUnit = (unit, results) => {
  repeat(results).forEach(({ save, result }) => {
    runTest(unit, save, result);
  });
};
