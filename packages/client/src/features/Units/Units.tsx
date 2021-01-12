import React, { useCallback } from 'react'
import UnitCard from './UnitCard'
import { Button, Grid } from '@material-ui/core'
import { Add, ImportExport } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { unitsSelector } from 'store/selectors/unitsSelectors'
import { unitsStore } from 'store/slices'
import WeaponProfileDialog from '../WeaponProfileDialog'
import { Route } from 'react-router-dom'

const Units = () => {
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
      <Grid container spacing={1} style={{ marginTop: 5 }}>
        <Grid item xs={9} sm={10}>
          <Button variant="contained" fullWidth startIcon={<Add />} color="primary" onClick={handleAddUnit}>
            Add Unit
          </Button>
        </Grid>
        <Grid item xs={3} sm={2}>
          <Button variant="contained" fullWidth startIcon={<ImportExport />} color="primary">
            Import
          </Button>
        </Grid>
      </Grid>
      {/* <WeaponProfileDialog unitId={units[0]?.id} id={units[0]?.weaponProfiles?.[0]?.id} /> */}
      <Route path="/units/:unitId/edit/:id" component={WeaponProfileDialog} />
    </div>
  )
}

export default Units
