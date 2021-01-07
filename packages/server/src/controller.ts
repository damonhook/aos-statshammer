import type { AverageDamageResult, CompareRequest, CompareResponse } from 'models/schema'
import { Unit } from './models/unit'
import AverageDamageProcessor from 'processors/averageDamageProcessor'
import { SAVES } from 'common'
import { Target } from 'models/target'

export default class AosController {
  public compareUnits({ units: data }: CompareRequest): CompareResponse {
    const units = data.map(d => new Unit(d))
    const targets = SAVES.map(save => new Target({ save }))
    const results: AverageDamageResult[] = []
    targets.forEach(target => {
      const values = units.reduce((acc, unit) => {
        const value = unit.weaponProfiles.reduce((sum, profile) => {
          const processor = new AverageDamageProcessor(profile, target)
          return sum + processor.calculateAverageDamage()
        }, 0)
        return { ...acc, [unit.name]: Math.round(value * 1000) / 1000 }
      }, {} as { string: number })
      results.push({ save: target.save, values })
    })
    return {
      units: units.map(u => u.name),
      results: results,
    }
  }
}
