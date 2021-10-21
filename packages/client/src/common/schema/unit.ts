import { AbilityDefinition } from 'common/types/abilityDefinition'
import type { Ability, AbilityOptions, UnitData, WeaponData } from 'common/types/unit'
import _ from 'lodash'
import * as Yup from 'yup'

import { getAbilitiesSchema } from './ability'
import { diceValueSchema, rollSchema } from './dice'

// export const abilitySchema: Yup.SchemaOf<Ability> = Yup.object({
//   id: Yup.string().required(),
//   type: Yup.string().required(),
//   options: Yup.object(),
//   disabled: Yup.bool(),
// })

// export const weaponSchema: Yup.SchemaOf<WeaponData> = Yup.object({
//   id: Yup.string(),
//   name: Yup.string(),
//   numModels: Yup.number()
//     .nullable()
//     .transform((_, val) => (val != null && val !== '' ? Number(val) : null))
//     .required('Required')
//     .typeError('Invalid Type')
//     .positive(),
//   attacks: diceValueSchema.required('Required'),
//   toHit: rollSchema.required('Required'),
//   toWound: rollSchema.required('Required'),
//   rend: Yup.number()
//     .nullable()
//     .transform((_, val) => (val != null && val !== '' ? Number(val) : null))
//     .required('Required')
//     .typeError('Invalid Type')
//     .min(0),
//   damage: diceValueSchema.required('Required'),
//   abilities: Yup.array().of(abilitySchema).ensure(),
//   disabled: Yup.bool(),
// })

// export const unitSchema: Yup.SchemaOf<UnitData> = Yup.object({
//   id: Yup.string(),
//   name: Yup.string().max(50).required('Required'),
//   weapons: Yup.array().of(weaponSchema).ensure(),
// }).required()

export const getUnitSchema = (definitions?: AbilityDefinition[]): Yup.SchemaOf<UnitData> => {
  const weaponSchema = getWeaponSchema(definitions)
  return Yup.object({
    id: Yup.string(),
    name: Yup.string().max(50).required('Required'),
    weapons: Yup.array().of(weaponSchema).ensure(),
  }).required()
}

export const getWeaponSchema = (definitions?: AbilityDefinition[]): Yup.SchemaOf<WeaponData> => {
  const abilitiesSchema = getAbilitiesSchema(definitions ?? [])
  return Yup.object({
    id: Yup.string(),
    name: Yup.string(),
    numModels: Yup.number()
      .nullable()
      .transform((_, val) => (val != null && val !== '' ? Number(val) : null))
      .required('Required')
      .typeError('Invalid Type')
      .positive(),
    attacks: diceValueSchema.required('Required'),
    toHit: rollSchema.required('Required'),
    toWound: rollSchema.required('Required'),
    rend: Yup.number()
      .nullable()
      .transform((_, val) => (val != null && val !== '' ? Number(val) : null))
      .required('Required')
      .typeError('Invalid Type')
      .min(0),
    damage: diceValueSchema.required('Required'),
    abilities: Yup.array().of(abilitiesSchema).ensure(),
    disabled: Yup.bool(),
  })
}

export const unitSchema = getUnitSchema()
