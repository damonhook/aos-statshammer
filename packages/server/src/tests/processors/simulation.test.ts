import { ProcessorSaveResults } from 'common'
import { round, times } from 'lodash'
import UnitSimulationProcessor from 'processors/simulationProcessor'
import { combineResults, createResults } from 'utils/processorUtils'

import { getAverageDamageTheories } from './theories/averageDamageTheories'

expect.extend({
  toBeWithinDeviation(received: number, expected: number, deviation: number = 0.1) {
    const diff = Math.abs(received - expected)
    const diffDeviation = diff / Math.max(received, expected)
    if (diffDeviation <= deviation) {
      return {
        message: () => `Expected ${received} not to be within a deviation of ${deviation} of ${expected}`,
        pass: true,
      }
    } else {
      return {
        message: () => `Expected ${received} to be within a deviation of ${deviation} of ${expected}`,
        pass: false,
      }
    }
  },
})

describe('Simulations Processor', () => {
  const simLimit = 3000
  const theories = getAverageDamageTheories()

  theories.forEach(({ unit, results }) => {
    describe(unit.name, () => {
      const processor = new UnitSimulationProcessor(unit)
      let sums: ProcessorSaveResults = createResults()
      times(simLimit, () => {
        sums = combineResults(sums, processor.simulateDamage())
      })

      results.forEach(({ save, expected }) => {
        const displaySave = save && save < 7 ? `${save}+` : '-'

        it(`Average damage against a save of ${displaySave} is ±${expected}`, () => {
          expect(sums[save]).not.toBeUndefined()
          const average = round(sums[save] / simLimit, 3)
          expect(average).toBeWithinDeviation(expected)
        })
      })
    })
  })
})
