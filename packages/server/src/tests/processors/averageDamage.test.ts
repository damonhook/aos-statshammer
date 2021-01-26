import { round } from 'lodash'
import { Target } from 'models/target'
import { Unit } from 'models/unit'
import UnitAverageProcessor from 'processors/averageDamageProcessor'

import * as Death from './units/death'
import * as Order from './units/order'

interface Theory {
  unit: Unit
  results: { save: number; expected: number }[]
}

describe('Average Damage Processor', () => {
  const orderTheories: Theory[] = [
    {
      unit: Order.KurnothHunters,
      results: [
        { save: 2, expected: 5.296 },
        { save: 3, expected: 7.222 },
        { save: 4, expected: 9.148 },
        { save: 5, expected: 11.074 },
        { save: 6, expected: 13.0 },
        { save: 7, expected: 13.0 },
      ],
    },
    // {
    //   unit: Order.Gotrek,
    //   results: [
    //     { save: 2, expected: 11.778 },
    //     { save: 3, expected: 14.148 },
    //     { save: 4, expected: 16.519 },
    //     { save: 5, expected: 18.889 },
    //     { save: 6, expected: 18.889 },
    //     { save: 7, expected: 18.889 },
    //   ],
    // },
  ]
  const deathTheories: Theory[] = [
    {
      unit: Death.ChainraspHorde,
      results: [
        { save: 2, expected: 0.875 },
        { save: 3, expected: 1.75 },
        { save: 4, expected: 2.625 },
        { save: 5, expected: 3.5 },
        { save: 6, expected: 4.375 },
        { save: 7, expected: 5.25 },
      ],
    },
    // {
    //   unit: Death.SpiritHosts,
    //   results: [
    //     { save: 2, expected: 4.5 },
    //     { save: 3, expected: 4.25 },
    //     { save: 4, expected: 4 },
    //     { save: 5, expected: 3.75 },
    //     { save: 6, expected: 3.5 },
    //     { save: 7, expected: 3.25 },
    //   ],
    // },
    {
      unit: Death.MortekGuard,
      results: [
        { save: 2, expected: 2.935 },
        { save: 3, expected: 4.403 },
        { save: 4, expected: 5.87 },
        { save: 5, expected: 7.338 },
        { save: 6, expected: 8.806 },
        { save: 7, expected: 8.806 },
      ],
    },
    {
      unit: Death.NecropolisStalkers,
      results: [
        { save: 2, expected: 2.481 },
        { save: 3, expected: 3.556 },
        { save: 4, expected: 4.63 },
        { save: 5, expected: 5.704 },
        { save: 6, expected: 6.444 },
        { save: 7, expected: 6.444 },
      ],
    },
    {
      unit: Death.NecropolisStalkersPrecision,
      results: [
        { save: 2, expected: 6.444 },
        { save: 3, expected: 8.426 },
        { save: 4, expected: 10.407 },
        { save: 5, expected: 11.889 },
        { save: 6, expected: 11.889 },
        { save: 7, expected: 11.889 },
      ],
    },
  ]
  const theories: Theory[] = [...orderTheories, ...deathTheories]

  theories.forEach(({ unit, results }) => {
    describe(unit.name, () => {
      results.forEach(({ save, expected }) => {
        const displaySave = save && save < 7 ? `${save}+` : '-'
        it(`Average damage against a save of ${displaySave} is ${expected}`, () => {
          const target = new Target({ save })
          const processor = new UnitAverageProcessor(unit, target)
          const output = processor.calculateAverageDamage()
          expect(round(output, 3)).toEqual(expected)
        })
      })
    })
  })
})

4.5
4.25
4
3.75
3.5
3.25
