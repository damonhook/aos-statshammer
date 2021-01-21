import { UnitParams, WeaponProfileParams } from 'types/store/units'
import { UnitErrors, UnitProfileErrors, ValidationOptions } from 'types/validation'
import * as yup from 'yup'

import { validateProfile } from './weaponProfile'

const nameSchema = yup.string().required().max(50)

export const validateUnitName = (value?: string): string | undefined => {
  try {
    nameSchema.validateSync(value)
    return undefined
  } catch (err) {
    return err.errors[0] ?? 'Invalid value'
  }
}

export const validateUnitProfiles = (
  data?: WeaponProfileParams[],
  options?: ValidationOptions
): UnitProfileErrors => {
  return (data ?? []).reduce<UnitProfileErrors>((acc, p, index) => {
    const result = validateProfile(p, options)
    if (result) acc[index] = result
    return acc
  }, {})
}

export const validateUnit = (data: Partial<UnitParams>, options?: ValidationOptions): UnitErrors => {
  const { name, weaponProfiles } = data
  const errors: UnitErrors = {}
  if (options?.total || name != null) {
    errors.name = validateUnitName(name)
  }
  if (options?.total || weaponProfiles != null) {
    if (!weaponProfiles || !weaponProfiles.length) {
      errors.weaponProfiles = 'Missing weapon profiles'
    } else {
      errors.weaponProfiles = validateUnitProfiles(weaponProfiles, options)
    }
  }
  return errors
}
