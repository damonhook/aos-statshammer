import { ProcessorSaveResults } from 'common'
import { mergeWith, round } from 'lodash'

export const createResults = (value: number = 0): ProcessorSaveResults => {
  return {
    2: value,
    3: value,
    4: value,
    5: value,
    6: value,
    7: value,
  }
}

export const combineResults = (...args: ProcessorSaveResults[]): ProcessorSaveResults => {
  return mergeWith(createResults(), ...args, (a: number, b: number) => a + b)
}

export const roundResults = (results: ProcessorSaveResults, precision?: number) => {
  return Object.entries(results).reduce((acc, [key, value]) => {
    acc[Number(key) as keyof ProcessorSaveResults] = round(value, precision)
    return acc
  }, {} as ProcessorSaveResults)
}
