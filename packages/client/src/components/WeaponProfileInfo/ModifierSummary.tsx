import React, { useMemo } from 'react'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Store from 'types/store'
import { ModifierDefinition } from 'types/modifierDefinition'
import { Modifier } from 'types/modifierInstance'
import ModifierDescription from 'components/ModifierDescription'

const useStyles = makeStyles((theme: Theme) => ({
  modifier: {
    padding: theme.spacing(1, 2, 0),
    '&:last-child': {
      paddingBottom: theme.spacing(1),
    },
  },
}))

interface ModifierSummaryProps {
  modifiers: Modifier[]
}

const ModifierSummary = ({ modifiers }: ModifierSummaryProps) => {
  const classes = useStyles()
  const definitions = useSelector((state: Store) => state.modifiers.modifiers)

  const data = useMemo(
    () =>
      modifiers.reduce((acc, m) => {
        const def = definitions.find(d => d.id === m.type)
        return def ? [...acc, { definition: def, modifier: m }] : acc
      }, new Array<{ definition: ModifierDefinition; modifier: Modifier }>()),
    [definitions, modifiers]
  )

  return (
    <div>
      {data.map(({ modifier, definition }) => (
        <Typography className={classes.modifier}>
          <strong>{definition.name}</strong>
          <ModifierDescription modifier={modifier} definition={definition} variant="body2" simple />
        </Typography>
      ))}
    </div>
  )
}

export default React.memo(ModifierSummary)
