import type { ComparisonResult } from 'types/store/comparison'
import type { NameMapping } from 'types/store/units'

export interface ComparisonGraphProps {
  nameMapping: NameMapping
  results: ComparisonResult[]
}

export type TransformedData = {
  save: string
  [name: string]: string
}
