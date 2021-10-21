import { AbilityDefinition, AbilityOption } from 'common/types/abilityDefinition'
import { Ability } from 'common/types/unit'
import _ from 'lodash'
import * as Yup from 'yup'

export const getAbilitiesSchema = _.memoize((definitions: AbilityDefinition[]) => {
  const lookup = getOptionSchemaLookup(definitions)
  return Yup.lazy((ability: Ability) => {
    return Yup.object({
      // id: Yup.string().required(),
      type: Yup.string().required(),
      options: Yup.lazy(() => lookup[ability.type] ?? Yup.object()),
      disabled: Yup.bool(),
    })
  }) as unknown as Yup.SchemaOf<Ability>
})

const getOptionSchemaLookup = (definitions: AbilityDefinition[]) => {
  const lookup: { [id: string]: Yup.AnySchema } = {}
  definitions.forEach(({ id, options }) => {
    const fields = Object.keys(options).reduce((acc, key) => {
      return { ...acc, [key]: getOptionSchema(options[key]) }
    }, {})
    lookup[id] = Yup.object(fields)
  })
  return lookup
}

const getOptionSchema = (option: AbilityOption) => {
  switch (option.type) {
    case 'choice':
      return getChoiceOptionSchema(option.items)
    case 'number':
      return getNumberOptionSchema(!!option.allowDice)
    case 'roll':
      return getRollOptionSchema(!!option.allowOnes)
    case 'boolean':
      return Yup.bool()
    default:
      return Yup.mixed()
  }
}

const getChoiceOptionSchema = (choices: string[]) => Yup.string().required('Required').oneOf(choices)

const getNumberOptionSchema = (allowDice: boolean) => {
  if (allowDice)
    return Yup.string()
      .required('Required')
      .matches(/^(?:\d*[dD]?\d+)(?:\s*[+-]\s*\d*[dD]?\d+)*$/, 'Invalid value / dice')
  else
    return Yup.number()
      .nullable(true)
      .transform((_, val) => (val != null && val !== '' ? Number(val) : null))
      .typeError('Invalid value')
      .required('Required')
}

const getRollOptionSchema = (allowOnes: boolean) => {
  const min = allowOnes ? 1 : 2
  return Yup.number()
    .nullable(true)
    .transform((_, val) => (val != null && val !== '' ? Number(val) : null))
    .typeError('Invalid value')
    .required('Required')
    .min(min, `Must be between ${min} and 6`)
    .max(6, `Must be between ${min} and 6`)
}
