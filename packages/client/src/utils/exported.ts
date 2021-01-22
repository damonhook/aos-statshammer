import humps from 'humps'
import { nanoid } from 'nanoid'
import { ExportedUnit, ExportedUnitData, ExportedUnitMetadata } from 'types/exported'
import { ModifierDefinition } from 'types/modifierDefinition'

import { removeEmpty } from './helpers'
import { validateUnit } from './validators/unit'

export const convertUnitJson = (
  json: Record<string, unknown>,
  definitions: ModifierDefinition[]
): ExportedUnitData => {
  const metadata = getMetadata(json)
  const unit = cleanData(json)
  const errors = removeEmpty(validateUnit(unit, { total: true, modifierDefinitions: definitions }))
  if (!errors || !Object.keys(errors).length) {
    return { metadata, unit }
  }
  console.error('Invalid Import', errors)
  throw new Error('Invalid Import')
}

const cleanData = (json: Record<string, any>): ExportedUnit => {
  const data: Record<string, any> = humps.camelizeKeys(json)
  return {
    name: data.name,
    weaponProfiles: (data.weaponProfiles ?? []).map((profile: any) => ({
      name: profile.name,
      numModels: Number(profile.numModels),
      attacks: profile.attacks,
      toHit: Number(profile.toHit),
      toWound: Number(profile.toWound),
      rend: Number(profile.rend),
      damage: profile.damage,
      modifiers: (profile.modifiers ?? []).map((modifier: any) => ({
        id: nanoid(),
        type: (modifier.type ?? modifier.id ?? '').toLowerCase().replace(/_/g, ''),
        options: modifier.options,
      })),
      disabled: !!profile.disabled || !(profile.enabled ?? true),
    })),
  }
}

const getMetadata = (json: Record<string, any>): ExportedUnitMetadata => {
  return {}
}
