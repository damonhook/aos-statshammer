import { ModifierDefinition } from 'types/modifierDefinition'
import { UnitFormErrors } from 'types/store/unitForm'
import { UnitParams } from 'types/store/units'
import * as yup from 'yup'

const nameSchema = yup.string().required().max(50)

export const validateUnitName = (value: string): string | undefined => {
  try {
    nameSchema.validateSync(value)
    return undefined
  } catch (err) {
    return err.errors[0] ?? 'Invalid value'
  }
}

export const validateUnit = (data: Partial<UnitParams>, definitions: ModifierDefinition[] = []) => {
  const { name } = data
  const errors: UnitFormErrors = {}
  if (name) errors.name = validateUnitName(name)
  return errors
}
