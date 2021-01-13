import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React, { useMemo } from 'react'
import { ModifierDefinition } from 'types/modifierDefinition'
import { Modifier } from 'types/store/units'
import ModifierItem from './ModifierItem'

const useStyles = makeStyles((theme: Theme) => ({
  items: {
    paddingBottom: theme.spacing(2),
  },
}))

interface ModifierListProps {
  definitions: ModifierDefinition[]
  modifiers: Modifier[]
}

const ModifierList = ({ definitions, modifiers }: ModifierListProps) => {
  const classes = useStyles()

  const data = useMemo(
    () =>
      modifiers.reduce((acc, m) => {
        const def = definitions.find(d => d.id === m.type)
        return def ? [...acc, { definition: def, modifier: m }] : acc
      }, new Array<{ definition: ModifierDefinition; modifier: Modifier }>()),
    [definitions, modifiers]
  )

  return (
    <div className={clsx({ [classes.items]: data && data.length })}>
      {data.map(({ definition, modifier }) => (
        <ModifierItem definition={definition} modifier={modifier} key={modifier.id} />
      ))}
    </div>
  )
}

export default ModifierList
