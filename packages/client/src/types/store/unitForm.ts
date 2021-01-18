import { Unit } from './units'

export type UnitFormData = Omit<Unit, 'id'>

export type UnitFormErrors = {
  [key in keyof UnitFormData]?: string
}

interface UnitFormStore {
  data?: UnitFormData
  errors?: UnitFormErrors
}

export default UnitFormStore
