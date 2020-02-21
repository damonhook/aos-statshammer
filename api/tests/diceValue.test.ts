import assert from 'assert';

import { D3, D6 } from '../models/dice';
import DiceValue from '../models/diceValue';

describe('DiceValue', () => {
  describe('DiceValue.average', () => {
    it('should return correct average (D3)', () => {
      assert.equal(new DiceValue([D3]).average, 2);
    });
    it('should return correct average (D6)', () => {
      assert.equal(new DiceValue([D6]).average, 3.5);
    });
    it('should return correct average (2D6)', () => {
      assert.equal(new DiceValue([D6, D6]).average, 7);
    });
    it('should return correct average (D3+1)', () => {
      assert.equal(new DiceValue([D3, 1]).average, 3);
    });
    it('should return correct average (2D6+2)', () => {
      assert.equal(new DiceValue([D6, D6, 2]).average, 9);
    });
    it('should return correct average (2D6+D3+2)', () => {
      assert.equal(new DiceValue([D6, D6, D3, 2]).average, 11);
    });
    it('should return correct average (2D6-D3+2)', () => {
      assert.equal(new DiceValue([D6, D6, 2], [D3]).average, 7);
    });
    it('should return correct average (2D6-2)', () => {
      assert.equal(new DiceValue([D6, D6], [2]).average, 5);
    });
  });

  describe('DiceValue.parse', () => {
    it('should return correct parsed DiceValue (D3)', () => {
      const target = new DiceValue([D3]).average;
      assert.equal(DiceValue.parse('D3').average, target);
      assert.equal(DiceValue.parse('d3').average, target);
    });
    it('should return correct parsed DiceValue (D6)', () => {
      const target = new DiceValue([D6]).average;
      assert.equal(DiceValue.parse('D6').average, target);
      assert.equal(DiceValue.parse('d6').average, target);
    });
    it('should return correct parsed DiceValue (2D6)', () => {
      const target = new DiceValue([D6, D6]).average;
      assert.equal(DiceValue.parse('2D6').average, target);
      assert.equal(DiceValue.parse('2d6').average, target);
      assert.equal(DiceValue.parse('D6 + D6').average, target);
      assert.equal(DiceValue.parse('D6+d6').average, target);
    });
    it('should return correct parsed DiceValue (2D6+2)', () => {
      const target = new DiceValue([D6, D6, 2]).average;
      assert.equal(DiceValue.parse('2D6+2').average, target);
      assert.equal(DiceValue.parse('2d6 + 2').average, target);
      assert.equal(DiceValue.parse('2 + D6 + D6').average, target);
      assert.equal(DiceValue.parse('D6+d6+2').average, target);
      assert.equal(DiceValue.parse('D6+D6+1+1').average, target);
    });
    it('should return correct parsed DiceValue (2D6+D3+1)', () => {
      const target = new DiceValue([D6, D6, D3, 1]).average;
      assert.equal(DiceValue.parse('2D6+D3+1').average, target);
      assert.equal(DiceValue.parse('d6+d6+d3+1').average, target);
      assert.equal(DiceValue.parse('D6 + D6 + D3 + 1').average, target);
      assert.equal(DiceValue.parse('1+d3+D6+d6').average, target);
    });
    it('should return correct parsed DiceValue (2D6+D3-1)', () => {
      const target = new DiceValue([D6, D6, D3, 1]).average;
      assert.equal(DiceValue.parse('2D6+D3+1').average, target);
      assert.equal(DiceValue.parse('d6+d6+d3+1').average, target);
      assert.equal(DiceValue.parse('D6 + D6 + D3 + 1').average, target);
      assert.equal(DiceValue.parse('1+d3+D6+d6').average, target);
    });
    it('should return correct parsed DiceValue (2D6-D3+1)', () => {
      const target = new DiceValue([D6, D6, 1], [D3]).average;
      assert.equal(DiceValue.parse('2D6-D3+1').average, target);
      assert.equal(DiceValue.parse('d6+d6-d3+1').average, target);
      assert.equal(DiceValue.parse('D6 + D6 - D3 + 1').average, target);
      assert.equal(DiceValue.parse('1-d3+D6+d6').average, target);
    });
  });
});
