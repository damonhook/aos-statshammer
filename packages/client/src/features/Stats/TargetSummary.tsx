import React, { useMemo } from 'react'
import CollapsibleCard from 'components/CollapsibleCard'
import { useSelector } from 'react-redux'
import Store from 'types/store'
import { Typography } from '@material-ui/core'
import { ModifierDefinition } from 'types/modifierDefinition'
import { Modifier } from 'types/modifierInstance'
import ModifierDescription from 'components/ModifierDescription'

const TargetSummary = () => {
  const definitions = useSelector((state: Store) => state.modifiers.targetModifiers)
  const { modifiers } = useSelector((state: Store) => state.target)

  const data = useMemo(
    () =>
      modifiers.reduce((acc, m) => {
        const def = definitions.find(d => d.id === m.type)
        return def ? [...acc, { definition: def, modifier: m }] : acc
      }, new Array<{ definition: ModifierDefinition; modifier: Modifier }>()),
    [definitions, modifiers]
  )

  return (
    <CollapsibleCard title="Target Summary">
      <div>
        {data.map(({ modifier, definition }) => (
          <Typography style={{ paddingBottom: '10px' }}>
            <strong>{definition.name}</strong>
            <ModifierDescription modifier={modifier} definition={definition} variant="body2" simple />
          </Typography>
        ))}
      </div>
    </CollapsibleCard>
  )
}

export default React.memo(TargetSummary)
