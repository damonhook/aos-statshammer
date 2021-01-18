import { Box, Checkbox, makeStyles, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import { ModifierDefinition } from 'types/modifierDefinition'
import { Modifier, ModifierFieldErrors } from 'types/modifierInstance'
import CollapsibleCard from 'components/CollapsibleCard'
import ModifierInput from './ModifierInput'
import ItemControls from './ItemControls'
import clsx from 'clsx'
import ModifierDescription from 'components/ModifierDescription'

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
  errors?: ModifierFieldErrors
}

const ModifierItem = ({
  definition,
  modifier,
  addModifiers,
  editModifier,
  deleteModifier,
  errors,
}: ModifierItemProps) => {
  const classes = useStyles()
  const [enabled, setEnabled] = useState(true)

  const handleEnabledChange = (event: React.ChangeEvent<{}>) => {
    setEnabled(!enabled)
  }

  return (
    <CollapsibleCard
      title={definition.name}
      controls={
        <ItemControls modifier={modifier} addModifiers={addModifiers} deleteModifier={deleteModifier} />
      }
    >
      <div className={clsx({ [classes.disabled]: !enabled })}>
        <Box display="flex" alignItems="center">
          <Checkbox checked={enabled} onChange={handleEnabledChange} className={classes.checkbox} />
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
              error={errors?.[key]}
            />
          ))}
        </Box>
      </div>
    </CollapsibleCard>
  )
}

export default React.memo(ModifierItem)
