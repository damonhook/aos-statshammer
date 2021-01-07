import React from 'react'
import UnitCard from '../components/UnitCard'
import { Button, Grid } from '@material-ui/core'
import { Add, ImportExport } from '@material-ui/icons'

const UnitsTab = () => {
  return (
    <div>
      <UnitCard />
      <UnitCard />
      <Grid container spacing={1} style={{ marginTop: 5 }}>
        <Grid item xs={10}>
          <Button variant="contained" fullWidth startIcon={<Add />} color="primary">
            Add Unit
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" fullWidth startIcon={<ImportExport />} color="primary">
            Import
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default UnitsTab
