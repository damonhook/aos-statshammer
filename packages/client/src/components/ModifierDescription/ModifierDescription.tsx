import { Typography, TypographyProps } from '@material-ui/core'
import React, { useMemo } from 'react'
import { ModifierDefinition } from 'types/modifierDefinition'
import { Modifier } from 'types/modifierInstance'
import formatUnicorn from 'format-unicorn/safe'
import humps from 'humps'
import { startWithUppercase } from 'utils/helpers'

function formatPlaceholder(key: string, simple: boolean) {
  return simple ? `${key}` : `<i>{${key}}</i>`
}

function formatValue(key: string, value: string | number | boolean, simple: boolean) {
  return simple ? `${value}` : `<b style="cursor:help;" title=${key}>${value}</b>`
}

function formatOptions(
  definition: ModifierDefinition,
  options: { [name: string]: string | number | boolean },
  simple: boolean
) {
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

interface ModifierDescriptionProps extends TypographyProps {
  definition: ModifierDefinition
  modifier: Modifier
  simple?: boolean
}

const ModifierDescription = ({ definition, modifier, simple, ...props }: ModifierDescriptionProps) => {
  const description = useMemo(() => {
    let desc = formatUnicorn(definition.description, formatOptions(definition, modifier.options, !!simple))
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/_/g, ' ')
    desc = humps.decamelize(desc, { separator: ' ' })
    return startWithUppercase(desc)
  }, [definition, modifier.options, simple])

  return (
    <div>
      <Typography {...props}>
        <span dangerouslySetInnerHTML={{ __html: description }} />
      </Typography>
    </div>
  )
}

export default React.memo(ModifierDescription)
