import { Box, Checkbox, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useMemo, useState } from 'react'
import { ModifierDefinition } from 'types/modifierDefinition'
import { Modifier } from 'types/store/units'
import formatUnicorn from 'format-unicorn/safe'
import CollapsibleCard from 'components/CollapsibleCard'
import ModifierInput from './ModifierInput'
import humps from 'humps'
import { startWithUppercase } from 'utils/stringUtils'
import ItemControls from './ItemControls'
import clsx from 'clsx'

function formatPlaceholder(key: string) {
  return `<i>{${key}}</i>`
}

function formatValue(key: string, value: string | number | boolean) {
  return `<b style="cursor:help;" title=${key}>${value}</b>`
}

function formatOptions(
  definition: ModifierDefinition,
  options: { [name: string]: string | number | boolean }
) {
  return Object.keys(definition.options).reduce<{ [name: string]: string }>((acc, key) => {
    if (options[key] != null && options[key] !== '') {
      if (definition.options[key].type === 'boolean') acc[key] = options[key] ? formatValue(key, key) : ''
      else acc[key] = formatValue(key, options[key])
    } else {
      acc[key] = formatPlaceholder(key)
    }
    return acc
  }, {})
}

const useStyles = makeStyles((theme: Theme) => ({
  disabled: { color: theme.palette.action.disabled },
}))

interface ModifierItemProps {
  definition: ModifierDefinition
  modifier: Modifier
}

const ModifierItem = ({ definition, modifier }: ModifierItemProps) => {
  const classes = useStyles()
  const [enabled, setEnabled] = useState(true)

  const description = useMemo(() => {
    let desc = formatUnicorn(definition.description, formatOptions(definition, modifier.options))
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/_/g, ' ')
    desc = humps.decamelize(desc, { separator: ' ' })
    return startWithUppercase(desc)
  }, [definition, modifier.options])

  const handleEnabledChange = (event: React.ChangeEvent<{}>) => {
    setEnabled(!enabled)
  }

  return (
    <CollapsibleCard title={definition.name} controls={<ItemControls modifier={modifier} />}>
      <div className={clsx({ [classes.disabled]: !enabled })}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Checkbox checked={enabled} onChange={handleEnabledChange} />
          </Grid>
          <Grid item>
            <Typography component="div">
              <span dangerouslySetInnerHTML={{ __html: description }} />
            </Typography>
          </Grid>
        </Grid>
        <Box display="flex" flexDirection="column" style={{ paddingTop: '10px' }}>
          {Object.keys(definition.options).map(key => (
            <ModifierInput
              modifierId={modifier.id}
              option={definition.options[key]}
              name={key}
              value={modifier.options[key]}
              key={key}
            />
          ))}
        </Box>
      </div>
    </CollapsibleCard>
  )
}

export default ModifierItem
