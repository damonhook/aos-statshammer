import { UnitErrors } from 'types/validation'

import { Unit } from '../units'

export type UnitFormData = Omit<Unit, 'id'>

interface UnitFormStore {
  data?: UnitFormData
  errors?: UnitErrors
}

export default UnitFormStore
