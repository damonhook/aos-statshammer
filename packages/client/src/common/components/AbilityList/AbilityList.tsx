import { Box } from '@mui/material'
import { useGetAbilitiesQuery } from 'app/services/statshammer'
import { AbilityDefinition } from 'common/types/abilityDefinition'
import { AbilitiesResponse } from 'common/types/api'
import { Ability } from 'common/types/unit'
import React from 'react'
import { useWatch } from 'react-hook-form'

import AbilityDetails from './AbilityDetails'

type TFieldValues = { abilities: Ability[]; [x: string]: any }

interface AbilityListProps {
  variant: keyof AbilitiesResponse
}

const AbilityList = ({ variant }: AbilityListProps) => {
  const { data } = useGetAbilitiesQuery()
  const definitions = React.useMemo(() => data?.[variant] ?? [], [data, variant])

  const abilities = useWatch<TFieldValues, 'abilities'>({ name: 'abilities' })

  const items = React.useMemo(() => {
    return (abilities ?? []).reduce((acc, a) => {
      const def = definitions.find(d => d.id === a.type)
      return def ? [...acc, { definition: def, ability: a }] : acc
    }, new Array<{ definition: AbilityDefinition; ability: Ability }>())
  }, [definitions, abilities])

  return (
    <Box>
      {items.map(({ definition, ability }, index) => (
        <AbilityDetails key={ability.id} definition={definition} index={index} />
      ))}
    </Box>
  )
}

export default AbilityList
