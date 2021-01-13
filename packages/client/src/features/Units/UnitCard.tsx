import React, { useCallback } from 'react'
import CollapsibleCard from 'components/CollapsibleCard'
import { Box, TextField, Button, makeStyles, Theme } from '@material-ui/core'
import WeaponProfileCard from './WeaponProfileCard'
import { Add } from '@material-ui/icons'
import Menu from 'components/Menu'
import { Unit } from 'types/store/units'
import { useDispatch } from 'react-redux'
import { unitsStore } from 'store/slices'

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  nameField: {
    marginBottom: theme.spacing(2),
  },
}))

interface UnitListControlsProps {
  unit: Unit
}

const UnitListControls = ({ unit }: UnitListControlsProps) => {
  const dispatch = useDispatch()

  const handleCopy = useCallback(() => {
    dispatch(unitsStore.actions.addUnit({ unit: { ...unit, name: `${unit.name} copy` } }))
  }, [unit, dispatch])

  const handleDelete = useCallback(() => {
    dispatch(unitsStore.actions.deleteUnit({ id: unit.id }))
  }, [unit.id, dispatch])

  return (
    <Menu
      items={[
        { name: 'Copy', onClick: handleCopy },
        { name: 'Delete', onClick: handleDelete },
        { name: 'Export', onClick: () => {} },
      ]}
    />
  )
}

interface UnitCardProps {
  unit: Unit
}

const UnitCard = ({ unit }: UnitCardProps) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(unitsStore.actions.editUnitName({ id: unit.id, name: event.target.value }))
    },
    [dispatch, unit.id]
  )

  const handleAddProfile = useCallback(() => {
    dispatch(unitsStore.actions.addWeaponProfile({ unitId: unit.id }))
  }, [dispatch, unit.id])

  return (
    <CollapsibleCard title={unit.name} controls={<UnitListControls unit={unit} />}>
      <Box flex={1} style={{ maxWidth: '100%' }}>
        <form noValidate autoComplete="off" className={classes.form}>
          <TextField
            id="name"
            label="Unit Name"
            fullWidth
            size="small"
            variant="outlined"
            value={unit.name}
            onChange={handleNameChange}
            className={classes.nameField}
          />
          {unit.weaponProfiles.map(profile => (
            <WeaponProfileCard unitId={unit.id} profile={profile} key={profile.id} />
          ))}
          <Button variant="contained" fullWidth startIcon={<Add />} onClick={handleAddProfile}>
            Add Profile
          </Button>
        </form>
      </Box>
    </CollapsibleCard>
  )
}

export default React.memo(UnitCard)
