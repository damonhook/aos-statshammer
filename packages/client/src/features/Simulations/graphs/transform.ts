import { ProbabilityData } from 'types/store/simulations'
import { NameMapping } from 'types/store/units'

export type TransformedData = {
  damage: number
  [name: string]: number
}

export function transformData(data: ProbabilityData[], nameMapping: NameMapping): TransformedData[] {
  return data.map(({ damage, ...values }) => {
    const transformed: TransformedData = { damage }
    Object.keys(values).forEach(id => {
      const name = nameMapping[id] ?? 'Unknown'
      transformed[name] = values[id]
    })
    return transformed
  })
}
