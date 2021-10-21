import AddIcon from '@mui/icons-material/Add'
import { Box, Fab, Typography } from '@mui/material'
import { useAppSelector } from 'app/hooks'
import routes from 'app/routes'
import NoItemsCard from 'common/components/NoItemsCard'
import React from 'react'
import { Route, Switch, useHistory } from 'react-router'

import UnitCard from './UnitCard'
import { CreateUnit, EditUnit } from './UnitDetails'

const UnitsIndex = () => {
  const units = useAppSelector(state => state.units.items)
  const history = useHistory()

  const handleAddUnit = () => {
    history.push(routes.CREATE_UNIT.make())
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Units
      </Typography>
      <Box>
        {units && units.length ? (
          units.map((unit, index) => <UnitCard key={unit.id} unit={unit} index={index} />)
        ) : (
          <NoItemsCard title="It's lonely here" description="There are no units here, try adding some" />
        )}
      </Box>
      <Fab color="primary" aria-label="add" onClick={handleAddUnit}>
        <AddIcon />
      </Fab>
    </Box>
  )
}

const Units = () => {
  return (
    <Switch>
      <Route path={routes.CREATE_UNIT.rule} component={CreateUnit} />
      <Route path={routes.EDIT_UNIT.rule} component={EditUnit} />
      <Route component={UnitsIndex} />
    </Switch>
  )
}

export default Units
