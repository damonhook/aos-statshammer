import { Box, Typography } from '@mui/material'
import { useGetAbilitiesQuery } from 'app/services/statshammer'
import { AbilityDefinition } from 'common/types/abilityDefinition'
import { AbilitiesResponse } from 'common/types/api'
import { Ability } from 'common/types/unit'
import React from 'react'

import AbilityDescription from '../AbilityDescription'

interface AbilitySummaryProps {
  abilities: Ability[]
  variant: keyof AbilitiesResponse
}

const AbilitySummary = ({ abilities, variant }: AbilitySummaryProps) => {
  const { data } = useGetAbilitiesQuery()

  const summaryData = React.useMemo(() => {
    const definitions = data?.[variant] ?? []
    return abilities.reduce((acc, a) => {
      const def = definitions.find(d => d.id === a.type)
      return def ? [...acc, { definition: def, ability: a }] : acc
    }, new Array<{ definition: AbilityDefinition; ability: Ability }>())
  }, [data, variant, abilities])

  return (
    <div>
      {summaryData.map(({ ability, definition }) => (
        <Box key={ability.id}>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {definition.name}
          </Typography>
          <AbilityDescription ability={ability} definition={definition} variant="caption" simple />
        </Box>
      ))}
    </div>
  )
}

export default AbilitySummary
