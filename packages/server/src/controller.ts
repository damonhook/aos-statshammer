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
import UnitAverageProcessor from 'processors/averageDamageProcessor'
import UnitMaxProcessor from 'processors/maxDamageProcessor'
import UnitSimulationProcessor from 'processors/simulationProcessor'
import {
  transformToCumulative,
  transformToDiscrete,
  transformToSimulationResult,
} from 'transformers/probabilities'
import { Metric, SimulationResult, UnitResultsLookup, UnitSimulationData } from 'types/simulations'

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

    const maxLookup = units.reduce<{ [id: string]: number }>(
      (acc, unit) => ({
        ...acc,
        [unit.id]: new UnitMaxProcessor(unit).calculateMaxDamage(),
      }),
      {}
    )

    const results: SimulationResult[] = []
    targets.forEach(target => {
      const unitResults: UnitResultsLookup = {}
      units.forEach(unit => {
        const metrics: Metric = { max: maxLookup[unit.id], average: this.getAverageDamage(unit, target) }
        const simResults = this.runSimulations(unit, target, limit)
        const discrete = transformToDiscrete(simResults)
        const cumulative = transformToCumulative(simResults)
        unitResults[unit.id] = { discrete, cumulative, metrics }
      })
      results.push(transformToSimulationResult(unitResults, target.save, this.getDisplaySave(target.save)))
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
    const processor = new UnitAverageProcessor(unit, target)
    return _.round(processor.calculateAverageDamage(), 3)
  }

  private runSimulations(unit: Unit, target: Target, limit: number) {
    const results: UnitSimulationData = {}
    _.times(limit, () => {
      const processor = new UnitSimulationProcessor(unit, target)
      const value = processor.simulateDamage()
      if (results[value]) results[value] += 1
      else results[value] = 1
    })
    return results
  }
}
