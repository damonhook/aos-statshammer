import { SAVES } from 'common'
import { ModifierLookup } from 'models/modifiers'
import type {
  AverageDamageResult,
  CompareRequest,
  CompareResponse,
  ModifiersRequest,
  ModifiersResponse,
} from 'models/schema'
import { Target } from 'models/target'
import { TargetModifierLookup } from 'models/targetModifiers'
import AverageDamageProcessor from 'processors/averageDamageProcessor'

import { Unit } from './models/unit'

export default class AosController {
  public getModifiers({}: ModifiersRequest): ModifiersResponse {
    return {
      modifiers: ModifierLookup.availableModifiers.map(mod => mod.metadata),
      targetModifiers: TargetModifierLookup.availableModifiers.map(mod => mod.metadata),
    }
  }

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
        return { ...acc, [unit.id]: Math.round(value * 1000) / 1000 }
      }, {} as { string: number })
      const displaySave = target.save && target.save <= 6 ? `${target.save}+` : `-`
      results.push({ save: target.save, displaySave, values })
    })
    return {
      units: units.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {}),
      results: results,
    }
  }
}
