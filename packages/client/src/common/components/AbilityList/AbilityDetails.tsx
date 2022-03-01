import { Box, Grid, Typography } from '@mui/material'
import { AbilityDefinition } from 'common/types/abilityDefinition'
import { Ability } from 'common/types/unit'
import { humanize } from 'common/utils/stringUtils'
import _ from 'lodash'
import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import AbilityDescription from '../AbilityDescription'
import CollapsibleCard from '../CollapsibleCard'
import AbilityOptionInput from './AbilityOptionInput'

interface AbilityDetailsProps {
  definition: AbilityDefinition
  index: number
}

const AbilityDetails = ({ definition, index }: AbilityDetailsProps) => {
  const { control } = useFormContext()
  const ability: Ability = useWatch({ control, name: `abilities[${index}]` })

  return (
    <CollapsibleCard title={definition.name} variant="outlined">
      <Box sx={{ px: 1 }}>
        <AbilityDescription ability={ability} definition={definition} variant="body2" />
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {Object.keys(definition.options).map(key => (
            <Grid item key={key} xs={6} md={4}>
              <AbilityOptionInput
                control={control}
                name={`abilities[${index}].options.${key}`}
                label={humanize(key)}
                option={definition.options[key]}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </CollapsibleCard>
  )
}

export default React.memo(AbilityDetails, _.isEqual)
