import * as Yup from 'yup'

export const diceValueSchema = Yup.string().matches(
  /^(?:\d*[dD]?\d+)(?:\s*[+-]\s*\d*[dD]?\d+)*$/,
  'Invalid value / dice'
)

export const rollSchema = Yup.number().min(2, 'Must be between 2 and 6').max(6, 'Must be between 2 and 6')
