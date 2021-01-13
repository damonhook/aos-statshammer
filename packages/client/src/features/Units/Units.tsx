import React, { useCallback } from 'react'
import UnitCard from './UnitCard'
import { Box, Button, makeStyles, Theme } from '@material-ui/core'
import { Add, ImportExport } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { unitsSelector } from 'store/selectors/unitsSelectors'
import { unitsStore } from 'store/slices'
import WeaponProfileDialog from '../WeaponProfileDialog'
import { Route } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) => ({
  addButton: { marginRight: theme.spacing(1) },
}))

const Units = () => {
  const classes = useStyles()
  const units = useSelector(unitsSelector)
  const dispatch = useDispatch()

  const handleAddUnit = useCallback(() => {
    dispatch(unitsStore.actions.addUnit({}))
  }, [dispatch])

  return (
    <div>
      {units.map(unit => (
        <UnitCard key={unit.id} unit={unit} />
      ))}
      <Box display="flex" marginTop={1}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<Add />}
          color="primary"
          onClick={handleAddUnit}
          className={classes.addButton}
        >
          Add Unit
        </Button>
        <Button variant="contained" startIcon={<ImportExport />} color="primary">
          Import
        </Button>
      </Box>
      <Route path="/units/:unitId/edit/:id" component={WeaponProfileDialog} />
    </div>
  )
}

export default Units
