import { Box, Checkbox, makeStyles, PaperProps, Theme } from '@material-ui/core'
import clsx from 'clsx'
import CollapsibleCard from 'components/CollapsibleCard'
import ModifierDescription from 'components/ModifierDescription'
import React, { useCallback, useMemo } from 'react'
import { ModifierDefinition } from 'types/modifierDefinition'
import { Modifier } from 'types/modifierInstance'
import { ModifierError } from 'types/validation'

import ItemControls from './ItemControls'
import ModifierInput from './ModifierInput'

const useStyles = makeStyles((theme: Theme) => ({
  checkbox: { marginRight: theme.spacing(1) },
  disabled: { color: theme.palette.action.disabled },
}))

interface ModifierItemProps {
  definition: ModifierDefinition
  modifier: Modifier
  addModifiers: (modifiers: Omit<Modifier, 'id'>[]) => void
  editModifier: (id: string, key: string, value: string | number | boolean) => void
  deleteModifier: (id: string) => void
  onEnabledChanged: (id: string, value: boolean) => void
  errors?: ModifierError
  variant?: PaperProps['variant']
}

const ModifierItem = ({
  definition,
  modifier,
  addModifiers,
  editModifier,
  deleteModifier,
  onEnabledChanged,
  errors,
  variant,
}: ModifierItemProps) => {
  const classes = useStyles()

  const handleEnabledChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onEnabledChanged(modifier.id, event.target.checked)
    },
    [onEnabledChanged, modifier.id]
  )

  const fieldErrors = useMemo(() => (errors && typeof errors !== 'string' ? errors : undefined), [errors])

  return (
    <CollapsibleCard
      title={definition.name}
      controls={
        <ItemControls modifier={modifier} addModifiers={addModifiers} deleteModifier={deleteModifier} />
      }
      variant={variant}
    >
      <div className={clsx({ [classes.disabled]: !!modifier.disabled })}>
        <Box display="flex" alignItems="center">
          <Checkbox
            checked={!modifier.disabled}
            onChange={handleEnabledChange}
            className={classes.checkbox}
          />
          <ModifierDescription modifier={modifier} definition={definition} />
        </Box>
        <Box display="flex" flexDirection="column" style={{ paddingTop: '10px' }}>
          {Object.keys(definition.options).map(key => (
            <ModifierInput
              modifierId={modifier.id}
              option={definition.options[key]}
              name={key}
              value={modifier.options[key]}
              key={key}
              editModifier={editModifier}
              error={fieldErrors?.[key]}
            />
          ))}
        </Box>
      </div>
    </CollapsibleCard>
  )
}

export default React.memo(ModifierItem)
