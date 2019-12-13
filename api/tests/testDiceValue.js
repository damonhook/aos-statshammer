/* eslint-disable no-undef */
import assert from 'assert';
import DiceValue from '../models/diceValue';
import { D3, D6 } from '../models/dice';

describe('DiceValue', () => {
  describe('Average', () => {
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
  });

  describe('Parse', () => {
    it('should return correct parsed DiceValue (D3)', () => {
      assert.equal(DiceValue.parse('D3').average, new DiceValue([D3]).average);
      assert.equal(DiceValue.parse('d3').average, new DiceValue([D3]).average);
    });
    it('should return correct parsed DiceValue (D6)', () => {
      assert.equal(DiceValue.parse('D6').average, new DiceValue([D6]).average);
      assert.equal(DiceValue.parse('d6').average, new DiceValue([D6]).average);
    });
    it('should return correct parsed DiceValue (2D6)', () => {
      assert.equal(DiceValue.parse('2D6').average, new DiceValue([D6, D6]).average);
      assert.equal(DiceValue.parse('2d6').average, new DiceValue([D6, D6]).average);
      assert.equal(DiceValue.parse('D6 + D6').average, new DiceValue([D6, D6]).average);
      assert.equal(DiceValue.parse('D6+d6').average, new DiceValue([D6, D6]).average);
    });
    it('should return correct parsed DiceValue (2D6+2)', () => {
      assert.equal(DiceValue.parse('2D6+2').average, new DiceValue([D6, D6, 2]).average);
      assert.equal(DiceValue.parse('2d6 + 2').average, new DiceValue([D6, D6, 2]).average);
      assert.equal(DiceValue.parse('2 + D6 + D6').average, new DiceValue([D6, D6, 2]).average);
      assert.equal(DiceValue.parse('D6+d6+2').average, new DiceValue([D6, D6, 2]).average);
      assert.equal(DiceValue.parse('D6+D6+1+1').average, new DiceValue([D6, D6, 2]).average);
    });
    it('should return correct parsed DiceValue (2D6+D3+1)', () => {
      assert.equal(DiceValue.parse('2D6+D3+1').average, new DiceValue([D6, D6, D3, 1]).average);
      assert.equal(DiceValue.parse('d6+d6+d3+1').average, new DiceValue([D6, D6, D3, 1]).average);
      assert.equal(DiceValue.parse('D6 + D6 + D3 + 1').average, new DiceValue([D6, D6, D3, 1]).average);
      assert.equal(DiceValue.parse('1+d3+D6+d6').average, new DiceValue([D6, D6, D3, 1]).average);
    });
  });
});
