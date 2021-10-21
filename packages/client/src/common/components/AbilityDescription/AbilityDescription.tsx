import { Typography, TypographyProps } from '@mui/material'
import { AbilityDefinition } from 'common/types/abilityDefinition'
import { Ability } from 'common/types/unit'
import { capitalizeFirstLetter } from 'common/utils/stringUtils'
import formatUnicorn from 'format-unicorn/safe'
import humps from 'humps'
import React from 'react'

const formatPlaceholder = (key: string, simple: boolean) => {
  return simple ? `${key}` : `<i>{${key}}</i>`
}

const formatValue = (key: string, value: string | number | boolean, simple: boolean) => {
  return simple ? `${value}` : `<b style="cursor:help;" title=${key}>${value}</b>`
}

const formatOptions = (
  definition: AbilityDefinition,
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

const getModifierDescription = (ability: Ability, definition: AbilityDefinition, simple: boolean) => {
  let desc = formatUnicorn(definition.description, formatOptions(definition, ability.options, !!simple))
    .trim()
    .replace(/\s+/g, ' ')
  desc = humps.decamelize(desc, { separator: ' ' }).replace(/_/g, ' ')
  return capitalizeFirstLetter(desc)
}

interface AbilityDescriptionProps extends TypographyProps {
  definition: AbilityDefinition
  ability: Ability
  simple?: boolean
}

const AbilityDescription = ({ definition, ability, simple, ...props }: AbilityDescriptionProps) => {
  const description = React.useMemo(() => {
    return getModifierDescription(ability, definition, !!simple)
  }, [definition, ability, simple])

  return (
    <Typography {...props}>
      <span dangerouslySetInnerHTML={{ __html: description }} />
    </Typography>
  )
}

export default AbilityDescription
