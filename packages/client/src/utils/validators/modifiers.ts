import { Modifier, ModifierErrors, ModifierFieldErrors } from 'types/modifierInstance'
import { ModifierDefinition, ModifierOption } from 'types/modifierDefinition'
import * as yup from 'yup'

type ModifierData = { definition: ModifierDefinition; modifier: Modifier }

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

export const validateModifierOption = (
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

export const validateModifier = (modifier: Modifier, definition: ModifierDefinition) => {
  return Object.keys(definition.options).reduce<ModifierFieldErrors>((acc, k) => {
    acc[k] = validateModifierOption(modifier.options[k], definition.options[k])
    return acc
  }, {})
}

export const validateModifiers = (modifiers: Modifier[], definitions: ModifierDefinition[]) => {
  const data = modifiers.reduce((acc, m) => {
    const def = definitions.find(d => d.id === m.type)
    return def ? [...acc, { definition: def, modifier: m }] : acc
  }, new Array<ModifierData>())
  return data.reduce<ModifierErrors>(
    (acc, { modifier, definition }) => ({
      ...acc,
      [modifier.id]: validateModifier(modifier, definition),
    }),
    {}
  )
}
