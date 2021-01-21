import { ComparisonResult } from 'types/store/comparison'
import { NameMapping } from 'types/store/units'

export type TransformedData = {
  save: string
  [name: string]: string
}

export function transformData(results: ComparisonResult[], nameMapping: NameMapping): TransformedData[] {
  return results.map(({ displaySave, values }) => {
    const data: TransformedData = { save: displaySave }
    Object.keys(values).forEach(id => {
      const name = nameMapping[id] ?? 'Unknown'
      data[name] = `${values[id]}`
    })
    return data
  })
}
