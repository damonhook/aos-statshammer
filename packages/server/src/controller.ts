import { ProcessorSaveResults, Saves } from 'common'
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
import { TargetModifierLookup } from 'models/targetModifiers'
import UnitAverageProcessor from 'processors/averageDamageProcessor'
import UnitMaxProcessor from 'processors/maxDamageProcessor'
import UnitSimulationProcessor from 'processors/simulationProcessor'
import {
  transformToCumulative,
  transformToDiscrete,
  transformToSimulationResult,
} from 'transformers/probabilities'
import { Metric, SimResultsData, SimulationResult, UnitResultsLookup } from 'types/simulations'

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
    const targetModifiers = request.target?.modifiers
      ? new TargetModifierLookup(request.target.modifiers)
      : undefined

    // Generate the average damage for each unit (put into a lookup object)
    const lookup: { [id: string]: ProcessorSaveResults } = {}
    units.forEach(unit => {
      lookup[unit.id] = new UnitAverageProcessor(unit, targetModifiers).calculateAverageDamage()
    })

    // Convert the lookup object into the list of results (by save)
    const results = Saves.map<AverageDamageResult>(save => {
      const saveResults: { [id: string]: number } = {}
      Object.entries(lookup).forEach(([id, values]) => {
        saveResults[id] = values[save]
      })
      return { save: save, displaySave: this.getDisplaySave(save), values: saveResults }
    })

    return {
      units: units.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {}),
      results: results,
    }
  }

  public simulateUnits(request: SimulationsRequest): SimulationsResponse {
    const units = request.units.map(d => new Unit(d))
    const targetModifiers = request.target?.modifiers
      ? new TargetModifierLookup(request.target.modifiers)
      : undefined
    const limit = request.limit ?? 5

    // Generate the lookups for each unit
    const maxLookup: { [id: string]: number } = {}
    const averageLookup: { [id: string]: ProcessorSaveResults } = {}
    const simLookup: { [id: string]: SimResultsData } = {}
    units.forEach(unit => {
      maxLookup[unit.id] = new UnitMaxProcessor(unit).calculateMaxDamage()
      averageLookup[unit.id] = new UnitAverageProcessor(unit, targetModifiers).calculateAverageDamage()
      simLookup[unit.id] = this.runSimulations(unit, limit, targetModifiers)
    })

    // Convert the lookup objects into the final result format
    const results = Saves.map<SimulationResult>(save => {
      const unitResults: UnitResultsLookup = {}
      units.forEach(unit => {
        const metrics: Metric = { max: maxLookup[unit.id], average: averageLookup[unit.id][save] }
        const simResults = simLookup[unit.id][save]
        const discrete = transformToDiscrete(simResults, maxLookup[unit.id])
        const cumulative = transformToCumulative(simResults, maxLookup)
        unitResults[unit.id] = { discrete, cumulative, metrics }
      })
      return transformToSimulationResult(unitResults, save, this.getDisplaySave(save))
    })

    return {
      units: units.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {}),
      results: results,
    }
  }

  private getDisplaySave(save: number) {
    return save && save <= 6 ? `${save}+` : `-`
  }

  private runSimulations(unit: Unit, limit: number, targetModifiers?: TargetModifierLookup) {
    const results: SimResultsData = { 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {} }
    const processor = new UnitSimulationProcessor(unit, targetModifiers)
    _.times(limit, () => {
      const values = processor.simulateDamage()
      Saves.map(save => {
        const value = values[save]
        if (results[save][value]) results[save][value] += 1
        else results[save][value] = 1
      })
    })
    return results
  }
}
