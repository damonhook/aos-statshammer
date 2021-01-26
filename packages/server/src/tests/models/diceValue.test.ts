import { D3, D6 } from 'models/dice'
import DiceValue from 'models/diceValue'

describe('DiceValue Model', () => {
  describe('Average', () => {
    const theories = [
      { model: new DiceValue([3]), expected: 3 },
      { model: new DiceValue([D3]), expected: 2 },
      { model: new DiceValue([D6]), expected: 3.5 },
      { model: new DiceValue([D3, 1]), expected: 3 },
      { model: new DiceValue([D6, D6]), expected: 7 },
      { model: new DiceValue([D6, D6, 2]), expected: 9 },
      { model: new DiceValue([D6, D6, D3, 2]), expected: 11 },
      { model: new DiceValue([D6, D6, 2], [D3]), expected: 7 },
      { model: new DiceValue([D6, D6], [2]), expected: 5 },
    ]
    theories.forEach(({ model, expected }) => {
      it(`${model} should have an average of ${expected}`, () => {
        expect(model.average).toEqual(expected)
      })
    })
  })

  describe('Max', () => {
    const theories = [
      { model: new DiceValue([3]), expected: 3 },
      { model: new DiceValue([D3]), expected: 3 },
      { model: new DiceValue([D6]), expected: 6 },
      { model: new DiceValue([D3, 1]), expected: 4 },
      { model: new DiceValue([D6, D6]), expected: 12 },
      { model: new DiceValue([D6, D6, 2]), expected: 14 },
      { model: new DiceValue([D6, D6, D3, 2]), expected: 17 },
      { model: new DiceValue([D6, D6, 2], [D3]), expected: 13 },
      { model: new DiceValue([D6, D6], [2]), expected: 10 },
    ]
    theories.forEach(({ model, expected }) => {
      it(`${model} should have a max of ${expected}`, () => {
        expect(model.max).toEqual(expected)
      })
    })
  })

  describe('Parse', () => {
    const theories = [
      { input: 3, expected: new DiceValue([3]) },
      { input: 'D3', expected: new DiceValue([D3]) },
      { input: 'd6', expected: new DiceValue([D6]) },
      { input: 'D3 + 1', expected: new DiceValue([D3, 1]) },
      { input: 'D6+d6', expected: new DiceValue([D6, D6]) },
      { input: 'D6 + D6 + 2', expected: new DiceValue([D6, D6, 2]) },
      { input: '2D6 + D3 + 2', expected: new DiceValue([D6, D6, D3, 2]) },
      { input: '2D6 + 2 - D3', expected: new DiceValue([D6, D6, 2], [D3]) },
      { input: 'D6 - 2 + D6', expected: new DiceValue([D6, D6], [2]) },
    ]
    theories.forEach(({ input, expected }) => {
      it(`Parsing ${input} results in ${expected}`, () => {
        expect(DiceValue.parse(input)).toEqual(expected)
      })
    })
  })
})
