import { ModifierDefinition, ModifierOption } from 'types/modifierDefinition'
import { Modifier } from 'types/modifierInstance'
import { ModifierFieldErrors, ModifierListErrors, ValidationOptions } from 'types/validation'
import * as yup from 'yup'

// === Schema ===

const getChoiceOptionSchema = (choices: string[]) => yup.string().required('Required').oneOf(choices)

const getNumberOptionSchema = (allowDice: boolean) => {
  if (allowDice)
    return yup
      .string()
      .required('Required')
      .matches(/^(?:\d*[dD]?\d+)(?:\s*[+-]\s*\d*[dD]?\d+)*$/, 'Invalid value / dice')
  else
    return yup
      .number()
      .nullable(true)
      .transform((_, val) => (val != null && val !== '' ? Number(val) : null))
      .typeError('Invalid value')
      .required('Required')
}

const getRollOptionSchema = (allowOnes: boolean) => {
  const min = allowOnes ? 1 : 2
  return yup
    .number()
    .nullable(true)
    .transform((_, val) => (val != null && val !== '' ? Number(val) : null))
    .typeError('Invalid value')
    .required('Required')
    .min(min, `Must be between ${min} and 6`)
    .max(6, `Must be between ${min} and 6`)
}

// === Validators ===

export const validateModifiers = (modifiers: Modifier[], options?: ValidationOptions) => {
  const definitions = options?.modifierDefinitions
  if (definitions && definitions.length) {
    return modifiers.reduce<ModifierListErrors>(
      (acc, modifier) => ({
        ...acc,
        [modifier.id]: validateModifier(modifier, definitions),
      }),
      {}
    )
  }
  if (options?.total)
    throw new Error('Cannot do `total` validation of modifiers without providing `modifierDefinitions`')
  return {}
}

const validateModifier = (
  modifier: Modifier,
  definitions: ModifierDefinition[]
): ModifierFieldErrors | string => {
  const definition = definitions.find(d => d.id === modifier.type)
  if (definition) {
    return Object.keys(definition.options).reduce<ModifierFieldErrors>((acc, k) => {
      acc[k] = validateModifierOption(modifier.options[k], definition.options[k])
      return acc
    }, {})
  }
  return 'Unkown modifier type (delete and re-create)'
}

const validateModifierOption = (
  option: string | number | boolean,
  definition: ModifierOption
): string | undefined => {
  const getValidator = (): yup.AnySchema | undefined => {
    switch (definition.type) {
      case 'choice':
        return getChoiceOptionSchema(definition.items)
      case 'number':
        return getNumberOptionSchema(!!definition.allowDice)
      case 'roll':
        return getRollOptionSchema(!!definition.allowOnes)
    }
    return undefined
  }

  const validator = getValidator()
  try {
    if (validator) validator.validateSync(option)
    return undefined
  } catch (err) {
    return err.errors[0] ?? 'Invalid value'
  }
}
