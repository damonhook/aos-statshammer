import { round } from 'lodash'
import { Target } from 'models/target'
import UnitAverageProcessor from 'processors/averageDamageProcessor'

import { getAverageDamageTheories } from './theories/averageDamageTheories'

describe('Average Damage Processor', () => {
  const theories = getAverageDamageTheories()
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
