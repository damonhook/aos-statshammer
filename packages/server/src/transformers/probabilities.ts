import _ from 'lodash'
import {
  Metric,
  ProbabilityData,
  SumulationResult,
  UnitResultsLookup,
  UnitSimulationData,
} from 'types/simulations'

export const transformToDiscrete = (data: UnitSimulationData): UnitSimulationData => {
  const total = Object.values(data).reduce((acc, r) => acc + r, 0)
  return Object.keys(data)
    .map(damage => Number(damage)) // `Object.keys()` turns it into a `string`. Turn it back to a number
    .reduce<UnitSimulationData>((acc, damage) => {
      const probability = _.round((data[damage] / total) * 100, 3)
      acc[damage] = probability
      return acc
    }, {})
}

export const transformToCumulative = (data: UnitSimulationData): UnitSimulationData => {
  const total = Object.values(data).reduce((acc, r) => acc + r, 0)
  let current = 0
  const results: UnitSimulationData = {}
  Object.keys(data)
    .map(damage => Number(damage)) // `Object.keys()` turns it into a `string`. Turn it back to a number
    .forEach(damage => {
      const probability = (data[damage] / total) * 100
      current = _.round(current + probability, 3)
      results[damage] = current
    })
  const maxDamage = Math.max(...Object.keys(data).map(d => Number(d)))
  results[maxDamage] = 100 // Ensure the last result is always 100% (handles slight rounding issues)
  return results
}

type ProbabilityLookup = { [damage: number]: { [id: string]: number } }

export const transformToSumulationResult = (
  data: UnitResultsLookup,
  save: number,
  displaySave: string
): SumulationResult => {
  const discreteLookup: ProbabilityLookup = {}
  const cumulativeLookup: ProbabilityLookup = {}
  const metrics: { [id: string]: Metric } = {}

  for (const [id, results] of Object.entries(data)) {
    metrics[id] = results.metrics
    for (const [key, probability] of Object.entries(results.discrete)) {
      const damage = Number(key)
      if (!discreteLookup[damage]) discreteLookup[damage] = {}
      discreteLookup[damage][id] = probability
    }
    for (const [key, probability] of Object.entries(results.cumulative)) {
      const damage = Number(key)
      if (!cumulativeLookup[damage]) cumulativeLookup[damage] = {}
      cumulativeLookup[damage][id] = probability
    }
  }

  const discrete = convertLookupToProbabilityData(discreteLookup)
  const cumulative = convertLookupToProbabilityData(cumulativeLookup)
  return { save, displaySave, discrete, cumulative, metrics }
}

const convertLookupToProbabilityData = (lookup: ProbabilityLookup): ProbabilityData[] => {
  return Object.entries(lookup).map<ProbabilityData>(([key, value]) => ({
    damage: Number(key),
    ...value,
  }))
}
