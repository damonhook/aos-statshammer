import UnitAverageProcessor from 'processors/averageDamageProcessor'

import { getAverageDamageTheories } from './theories/averageDamageTheories'

describe('Average Damage Processor', () => {
  const theories = getAverageDamageTheories()

  theories.forEach(({ unit, results }) => {
    describe(unit.name, () => {
      const processor = new UnitAverageProcessor(unit)
      const output = processor.calculateAverageDamage()

      results.forEach(({ save, expected }) => {
        const displaySave = save && save < 7 ? `${save}+` : '-'
        it(`Average damage against a save of ${displaySave} is ${expected}`, () => {
          expect(output[save]).not.toBeUndefined()
          expect(output[save]).toEqual(expected)
        })
      })
    })
  })
})
