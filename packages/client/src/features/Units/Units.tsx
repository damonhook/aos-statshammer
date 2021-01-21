import { Box, Button, makeStyles, Theme } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import NoItemsCard from 'components/NoItemsCard'
import UnitDialog from 'features/Forms/UnitDialog'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unitsSelector } from 'store/selectors/unitsSelectors'
import { unitsStore } from 'store/slices'

import ImportUnitButton from './ImportUnitButton'
import UnitCard from './UnitCard'

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
      <div>
        {units && units.length ? (
          units.map(unit => <UnitCard key={unit.id} unit={unit} />)
        ) : (
          <NoItemsCard title="It's lonely here" description="There are no units here, try adding some" />
        )}
      </div>
      <Box display="flex" paddingTop={2}>
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
        <ImportUnitButton />
      </Box>
      <UnitDialog />
    </div>
  )
}

export default Units
