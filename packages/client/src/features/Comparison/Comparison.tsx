import { Box, Button } from '@mui/material'
import { useAppSelector } from 'app/hooks'
import routes from 'app/routes'
import { useGetComparisonQuery } from 'app/services/statshammer'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import ComparisonTable from './ComparisonTable'

const Comparison = () => {
  const units = useAppSelector(state => state.units.items)
  const { data, ...rest } = useGetComparisonQuery({ units })

  return (
    <Box>
      {data && <ComparisonTable results={data.results} />}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <Button component={RouterLink} to={routes.UNITS.make()}>
        Back
      </Button>
    </Box>
  )
}

export default Comparison
