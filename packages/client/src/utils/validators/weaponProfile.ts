import { ModifierDefinition } from 'types/modifierDefinition'
import { ProfileFormCharacteristicErrors, ProfileFormErrors } from 'types/store/profileForm'
import { WeaponProfileParams } from 'types/store/units'
import * as yup from 'yup'
import { validateModifiers } from './modifiers'

const diceValueSchema = yup
  .string()
  .required('Required')
  .matches(/^(?:\d*[dD]?\d+)(?:\s*[+-]\s*\d*[dD]?\d+)*$/, 'Invalid value / dice')

const rollSchema = yup
  .number()
  .nullable(true)
  .transform((_, val) => (val != null && val !== '' ? Number(val) : null))
  .typeError('Invalid value')
  .required('Required')
  .min(2, 'Must be between 2 and 6')
  .max(6, 'Must be between 2 and 6')

const numberSchema = yup
  .number()
  .nullable(true)
  .transform((_, val) => (val != null && val !== '' ? Number(val) : null))
  .typeError('Invalid value')
  .required('Required')

const validators: Record<string, yup.AnySchema<any, any>> = {
  numModels: diceValueSchema,
  attacks: diceValueSchema,
  toHit: rollSchema,
  toWound: rollSchema,
  rend: numberSchema,
  damage: diceValueSchema,
}

type CharacteristicData = Omit<WeaponProfileParams, 'modifiers'>

export const validateCharacteristics = (data: Partial<CharacteristicData>) => {
  return (Object.keys(data) as (keyof CharacteristicData)[]).reduce<ProfileFormCharacteristicErrors>(
    (acc, k) => {
      const validator = validators[k]
      if (k !== 'disabled' && validator) {
        try {
          validator.validateSync(data[k])
          acc[k] = undefined
        } catch (err) {
          acc[k] = err.errors[0] ?? 'Invalid value'
        }
      }
      return acc
    },
    {}
  )
}

export const validateProfile = (
  data: WeaponProfileParams,
  modifierDefinitions: ModifierDefinition[] = []
) => {
  const { modifiers, ...rest } = data
  const errors: ProfileFormErrors = validateCharacteristics(rest)
  if (modifiers) {
    errors.modifiers = validateModifiers(modifiers, modifierDefinitions)
  }
  return errors
}
