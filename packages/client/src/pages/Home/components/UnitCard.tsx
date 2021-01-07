import React from 'react'
import CollapsibleCard from 'components/CollapsibleCard'
import { Box, TextField, Button, makeStyles, Theme } from '@material-ui/core'
import WeaponProfileCard from './WeaponProfileCard'
import { Add } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
}))

const UnitCard = () => {
  const classes = useStyles()
  const name = 'Unit Name'

  return (
    <CollapsibleCard title={name}>
      <Box flex={1}>
        <form noValidate autoComplete="off" className={classes.form}>
          <TextField id="name" label="Unit Name" fullWidth size="small" variant="outlined" />
          <WeaponProfileCard />
          <Button variant="contained" fullWidth startIcon={<Add />}>
            Add Profile
          </Button>
        </form>
      </Box>
    </CollapsibleCard>
  )
}

export default UnitCard
