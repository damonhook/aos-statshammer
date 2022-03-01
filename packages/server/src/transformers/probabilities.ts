import { round } from 'lodash'
import {
  MetricData,
  ProbabilityData,
  SimulationResult,
  UnitResultsLookup,
  UnitSimulationData,
} from 'types/simulations'

export const transformToDiscrete = (data: UnitSimulationData, max: number): UnitSimulationData => {
  const total = Object.values(data).reduce((acc, r) => acc + r, 0)
  const results = Object.keys(data)
    .map(damage => Number(damage)) // `Object.keys()` turns it into a `string`. Turn it back to a number
    .reduce<UnitSimulationData>((acc, damage) => {
      const probability = round((data[damage] / total) * 100, 3)
      acc[damage] = probability
      return acc
    }, {})
  results[max] = 0
  return results
}

export const transformToCumulative = (
  data: UnitSimulationData,
  maxLookup: { [id: string]: number }
): UnitSimulationData => {
  const maxDamage = Math.max(...Object.values(maxLookup))
  const numSimulations = Object.values(data).reduce((acc, r) => acc + r, 0)

  let current = 0
  const results: UnitSimulationData = {}
  Array.from({ length: maxDamage }).forEach((_, damage) => {
    if (data[damage] != null) {
      const probability = (data[damage] / numSimulations) * 100
      current = round(current + probability, 3)
    }
    results[damage] = current
  })
  // Ensure the last result is always 100% (handles slight rounding issues)
  results[maxDamage] = 100
  return results
}

type ProbabilityLookup = { [damage: number]: { [id: string]: number } }

export const transformToSimulationResult = (
  data: UnitResultsLookup,
  save: number,
  displaySave: string
): SimulationResult => {
  const discreteLookup: ProbabilityLookup = {}
  const cumulativeLookup: ProbabilityLookup = {}
  const metrics: MetricData[] = []

  for (const [id, results] of Object.entries(data)) {
    metrics.push({ id, ...results.metrics })
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
  return Object.entries(lookup).map<ProbabilityData>(([key, values]) => ({
    damage: Number(key),
    values: Object.entries(values).map(([id, value]) => ({ id, value })),
  }))
}
