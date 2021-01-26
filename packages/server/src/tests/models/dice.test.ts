import { round } from 'lodash'
import { Dice } from 'models/dice'

describe('Dice Model', () => {
  describe('Average', () => {
    const theories = [
      { sides: 3, expected: 2 },
      { sides: 6, expected: 3.5 },
      { sides: 12, expected: 6.5 },
      { sides: 20, expected: 10.5 },
    ]
    theories.forEach(({ sides, expected }) => {
      it(`D${sides} should have an average of ${expected}`, () => {
        expect(new Dice(sides).average).toEqual(expected)
      })
    })
  })

  describe('Probability', () => {
    const theories = [
      { sides: 3, target: 1, expected: 1 },
      { sides: 3, target: 2, expected: 0.667 },
      { sides: 3, target: 3, expected: 0.333 },
      { sides: 6, target: 0, expected: 1 },
      { sides: 6, target: 1, expected: 1 },
      { sides: 6, target: 4, expected: 0.5 },
      { sides: 6, target: 6, expected: 0.167 },
      { sides: 6, target: 7, expected: 0 },
    ]
    theories.forEach(({ sides, target, expected }) => {
      it(`Probability of rolling a ${target}+ on a D${sides} should be ${expected}`, () => {
        const output = new Dice(sides).getProbability(target)
        expect(round(output, 3)).toEqual(expected)
      })
    })
  })

  describe('Inverse Probability', () => {
    const theories = [
      { sides: 3, target: 1, expected: 0 },
      { sides: 3, target: 2, expected: 0.333 },
      { sides: 3, target: 3, expected: 0.667 },
      { sides: 6, target: 0, expected: 0 },
      { sides: 6, target: 1, expected: 0 },
      { sides: 6, target: 4, expected: 0.5 },
      { sides: 6, target: 6, expected: 0.833 },
      { sides: 6, target: 7, expected: 1 },
    ]
    theories.forEach(({ sides, target, expected }) => {
      it(`Probability of rolling < ${target} on a D${sides} should be ${expected}`, () => {
        const output = new Dice(sides).getInverseProbability(target)
        expect(round(output, 3)).toEqual(expected)
      })
    })
  })

  describe('Parse', () => {
    const theories = [
      { input: 'D3', expected: new Dice(3) },
      { input: 'd3', expected: new Dice(3) },
      { input: 'D6', expected: new Dice(6) },
      { input: 'd6', expected: new Dice(6) },
      { input: '2', expected: 2 },
      { input: 6, expected: 6 },
    ]
    theories.forEach(({ input, expected }) => {
      it(`Parsing ${input} results in ${expected}`, () => {
        expect(Dice.parse(input)).toEqual(expected)
      })
    })
  })
})
