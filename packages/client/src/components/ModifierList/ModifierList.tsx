import { makeStyles, PaperProps, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React, { useMemo } from 'react'
import { ModifierDefinition } from 'types/modifierDefinition'
import { Modifier } from 'types/modifierInstance'
import { ModifierListErrors } from 'types/validation'

import ModifierItem, { ModifierItemProps } from './ModifierItem'

const useStyles = makeStyles((theme: Theme) => ({
  items: {},
}))

interface ModifierListProps {
  definitions: ModifierDefinition[]
  modifiers: Modifier[]
  addModifiers: (modifiers: Omit<Modifier, 'id'>[]) => void
  editModifier: (id: string, key: string, value: string | number | boolean) => void
  deleteModifier: (id: string) => void
  onEnabledChanged: (id: string, value: boolean) => void
  errors?: ModifierListErrors
  variant?: PaperProps['variant']
  className?: string
  ModifierItemProps?: Partial<ModifierItemProps>
}

const ModifierList = ({
  definitions,
  modifiers,
  addModifiers,
  editModifier,
  deleteModifier,
  onEnabledChanged,
  errors,
  variant,
  className,
  ModifierItemProps,
}: ModifierListProps) => {
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
    <div className={clsx({ [classes.items]: data && data.length }, className)}>
      {data.map(({ definition, modifier }) => (
        <ModifierItem
          definition={definition}
          modifier={modifier}
          key={modifier.id}
          addModifiers={addModifiers}
          editModifier={editModifier}
          deleteModifier={deleteModifier}
          onEnabledChanged={onEnabledChanged}
          errors={errors?.[modifier.id]}
          variant={variant}
          {...ModifierItemProps}
        />
      ))}
    </div>
  )
}

export default ModifierList
