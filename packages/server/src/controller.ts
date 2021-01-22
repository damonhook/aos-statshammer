import { SAVES } from 'common'
import _ from 'lodash'
import { ModifierLookup } from 'models/modifiers'
import type {
  AverageDamageResult,
  CompareRequest,
  CompareResponse,
  ModifiersRequest,
  ModifiersResponse,
  SimulationsRequest,
  SimulationsResponse,
} from 'models/schema'
import { Target } from 'models/target'
import { TargetModifierLookup } from 'models/targetModifiers'
import AverageDamageProcessor from 'processors/averageDamageProcessor'
import MaxDamageProcessor from 'processors/maxDamageProcessor'
import SimulationProcessor from 'processors/simulationProcessor'
import {
  transformToCumulative,
  transformToDiscrete,
  transformToSumulationResult,
} from 'transformers/probabilities'
import { Metric, SumulationResult, UnitResultsLookup, UnitSimulationData } from 'types/simulations'

import { Unit } from './models/unit'

export default class AosController {
  public getModifiers({}: ModifiersRequest): ModifiersResponse {
    return {
      modifiers: ModifierLookup.availableModifiers.map(mod => mod.metadata),
      targetModifiers: TargetModifierLookup.availableModifiers.map(mod => mod.metadata),
    }
  }

  public compareUnits(request: CompareRequest): CompareResponse {
    const units = request.units.map(d => new Unit(d))
    const targets = SAVES.map(save => new Target({ save }))
    const results: AverageDamageResult[] = []
    targets.forEach(target => {
      const values = units.reduce<{ [x: string]: number }>((acc, unit) => {
        return { ...acc, [unit.id]: this.getAverageDamage(unit, target) }
      }, {})
      results.push({ save: target.save, displaySave: this.getDisplaySave(target.save), values })
    })
    return {
      units: units.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {}),
      results: results,
    }
  }

  public simulateUnits(request: SimulationsRequest): SimulationsResponse {
    const units = request.units.map(d => new Unit(d))
    const targets = SAVES.map(save => new Target({ save }))
    const limit = request.limit ?? 5

    const maxLookup = units.reduce<{ [id: string]: number }>((acc, unit) => {
      const max = unit.weaponProfiles.reduce((sum, profile) => {
        const processor = new MaxDamageProcessor(profile)
        return sum + processor.calculateMaxDamage()
      }, 0)
      acc[unit.id] = max
      return acc
    }, {})

    const results: SumulationResult[] = []
    targets.forEach(target => {
      const unitResults: UnitResultsLookup = {}
      units.forEach(unit => {
        const metrics: Metric = { max: maxLookup[unit.id], average: this.getAverageDamage(unit, target) }
        const simResults = this.runSimulations(unit, target, limit)
        const discrete = transformToDiscrete(simResults)
        const cumulative = transformToCumulative(simResults)
        unitResults[unit.id] = { discrete, cumulative, metrics }
      })
      results.push(transformToSumulationResult(unitResults, target.save, this.getDisplaySave(target.save)))
    })

    return {
      units: units.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {}),
      results: results,
    }
  }

  private getDisplaySave(save: number) {
    return save && save <= 6 ? `${save}+` : `-`
  }

  private getAverageDamage(unit: Unit, target: Target) {
    const value = unit.weaponProfiles.reduce((sum, profile) => {
      const processor = new AverageDamageProcessor(profile, target)
      return sum + processor.calculateAverageDamage()
    }, 0)
    return Math.round(value * 1000) / 1000
  }

  private runSimulations(unit: Unit, target: Target, limit: number) {
    const results: UnitSimulationData = {}
    _.times(limit, () => {
      const value = unit.weaponProfiles.reduce((acc, profile) => {
        const processor = new SimulationProcessor(profile, target)
        return acc + processor.simulateDamage()
      }, 0)
      if (results[value]) results[value] += 1
      else results[value] = 1
    })
    return results
  }
}
