import assert from 'assert';

import { Dice } from '../models/dice';
import { round } from './utils/runners';

describe('Dice', () => {
  describe('Average', () => {
    it('should return correct average (D3)', () => {
      assert.equal(new Dice(3).average, 2);
    });
    it('should return correct average (D6)', () => {
      assert.equal(new Dice(6).average, 3.5);
    });
    it('should return correct average (D12)', () => {
      assert.equal(new Dice(12).average, 6.5);
    });
    it('should return correct average (D20)', () => {
      assert.equal(new Dice(20).average, 10.5);
    });
  });

  describe('Probability', () => {
    it('should return correct probability for 1+ roll for D3', () => {
      assert.equal(round(new Dice(3).getProbability(1)), 1);
    });
    it('should return correct probability for 2+ roll for D3', () => {
      assert.equal(round(new Dice(3).getProbability(2)), 0.667);
    });
    it('should return correct probability for 3+ roll for D3', () => {
      assert.equal(round(new Dice(3).getProbability(3)), 0.333);
    });
    it('should return correct probability for 1+ roll for D6', () => {
      assert.equal(round(new Dice(6).getProbability(1)), 1);
    });
    it('should return correct probability for 4+ roll for D6', () => {
      assert.equal(round(new Dice(6).getProbability(4)), 0.5);
    });
    it('should return correct probability for 6+ roll for D6', () => {
      assert.equal(round(new Dice(6).getProbability(6)), 0.167);
    });
  });

  describe('Inverse Probability', () => {
    it('should return correct probability for < 1 roll for D3', () => {
      assert.equal(round(new Dice(3).getInverseProbability(1)), 0);
    });
    it('should return correct probability for < 2 roll for D3', () => {
      assert.equal(round(new Dice(3).getInverseProbability(2)), 0.333);
    });
    it('should return correct probability for < 3 roll for D3', () => {
      assert.equal(round(new Dice(3).getInverseProbability(3)), 0.667);
    });
    it('should return correct probability for < 1 roll for D6', () => {
      assert.equal(round(new Dice(6).getInverseProbability(1)), 0);
    });
    it('should return correct probability for < 4 roll for D6', () => {
      assert.equal(round(new Dice(6).getInverseProbability(4)), 0.5);
    });
    it('should return correct probability for < 6 roll for D6', () => {
      assert.equal(round(new Dice(6).getInverseProbability(6)), 0.833);
    });
  });

  describe('Parse', () => {
    it('should return correct parsed Dice (D3)', () => {
      const parsedUpper = Dice.parse('D3');
      assert.equal(parsedUpper instanceof Dice, true);
      assert.equal((parsedUpper as Dice).sides, 3);

      const parsedLower = Dice.parse('d3');
      assert.equal(parsedLower instanceof Dice, true);
      assert.equal((parsedLower as Dice).sides, 3);
    });
    it('should return correct parsed Dice (D6)', () => {
      const parsedUpper = Dice.parse('D6');
      assert.equal(parsedUpper instanceof Dice, true);
      assert.equal((parsedUpper as Dice).sides, 6);

      const parsedLower = Dice.parse('d6');
      assert.equal(parsedLower instanceof Dice, true);
      assert.equal((parsedLower as Dice).sides, 6);
    });
    it('should return correct parsed Dice (2)', () => {
      const parsedNum = Dice.parse('2');
      assert.equal(typeof parsedNum, 'number');
      assert.equal(Number(parsedNum), 2);
    });
  });
});
