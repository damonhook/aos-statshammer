import formatUnicorn from 'format-unicorn/safe'
import humps from 'humps'
import { ModifierDefinition } from 'types/modifierDefinition'
import { Modifier } from 'types/modifierInstance'
import { startWithUppercase } from 'utils/helpers'

export const getModifierData = (modifiers: Modifier[], definitions: ModifierDefinition[]) => {
  return modifiers.reduce((acc, m) => {
    const def = definitions.find(d => d.id === m.type)
    return def ? [...acc, { definition: def, modifier: m }] : acc
  }, new Array<{ definition: ModifierDefinition; modifier: Modifier }>())
}

export const getModifierDescription = (
  modifier: Modifier,
  definition: ModifierDefinition,
  simple: boolean
) => {
  let desc = formatUnicorn(definition.description, formatOptions(definition, modifier.options, !!simple))
    .trim()
    .replace(/\s+/g, ' ')
  desc = humps.decamelize(desc, { separator: ' ' }).replace(/_/g, ' ')
  return startWithUppercase(desc)
}

const formatPlaceholder = (key: string, simple: boolean) => {
  return simple ? `${key}` : `<i>{${key}}</i>`
}

const formatValue = (key: string, value: string | number | boolean, simple: boolean) => {
  return simple ? `${value}` : `<b style="cursor:help;" title=${key}>${value}</b>`
}

const formatOptions = (
  definition: ModifierDefinition,
  options: { [name: string]: string | number | boolean },
  simple: boolean
) => {
  return Object.keys(definition.options).reduce<{ [name: string]: string }>((acc, key) => {
    if (options[key] != null && options[key] !== '') {
      if (definition.options[key].type === 'boolean')
        acc[key] = options[key] ? formatValue(key, key, simple) : ''
      else acc[key] = formatValue(key, options[key], simple)
    } else {
      acc[key] = formatPlaceholder(key, simple)
    }
    return acc
  }, {})
}
