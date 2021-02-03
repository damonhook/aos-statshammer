import { Typography, TypographyProps } from '@material-ui/core'
import React, { useMemo } from 'react'
import { ModifierDefinition } from 'types/modifierDefinition'
import { Modifier } from 'types/modifierInstance'
import { getModifierDescription } from 'utils/modifiers'

interface ModifierDescriptionProps extends TypographyProps {
  definition: ModifierDefinition
  modifier: Modifier
  simple?: boolean
}

const ModifierDescription = ({ definition, modifier, simple, ...props }: ModifierDescriptionProps) => {
  const description = useMemo(() => {
    return getModifierDescription(modifier, definition, !!simple)
  }, [definition, modifier, simple])

  return (
    <div>
      <Typography {...props}>
        <span dangerouslySetInnerHTML={{ __html: description }} />
      </Typography>
    </div>
  )
}

export default React.memo(ModifierDescription)
