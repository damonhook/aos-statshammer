import { RootState } from 'app/store'
import { filterActiveUnits } from 'common/utils/unitUtils'

export const activeUnitSelector = (state: RootState) => filterActiveUnits(state.units.items)
export const unitNameMappingSelector = (state: RootState) =>
  state.units.items.reduce<{ [id: string]: string }>((acc, unit) => ({ ...acc, [unit.id]: unit.name }), {})
