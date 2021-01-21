import {
  Button,
  DialogContent as MuiDialogContent,
  makeStyles,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import WeaponProfileInfo from 'components/WeaponProfileInfo'
import WeaponProfileDialog, { openProfileDialog } from 'features/Forms/WeaponProfileDialog'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { unitFormStore } from 'store/slices/forms'
import { UnitFormData } from 'types/store/forms/unitForm'
import { WeaponProfileParams } from 'types/store/units'
import { UnitErrors } from 'types/validation'

import ProfileControls from './ProfileControls'
import UnitToolBar from './UnitToolBar'

const DEFAULT_PROFILE: WeaponProfileParams = {
  numModels: 10,
  attacks: 1,
  toHit: 4,
  toWound: 4,
  rend: 0,
  damage: 1,
  modifiers: [],
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 2),
    },
  },
  nameField: {
    paddingBottom: theme.spacing(3),
  },
}))

interface DialogContentProps {
  unitId: string
  data: UnitFormData
  errors?: UnitErrors
}

const DialogContent = ({ unitId, data, errors }: DialogContentProps) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(unitFormStore.actions.editData({ key: 'name', value: event.target.value }))
    },
    [dispatch]
  )

  const handleProfileClicked = (id: string) => () => {
    openProfileDialog(history, unitId, id)
  }

  const handleProfileEnabledChanged = useCallback(
    (id: string) => (newValue: boolean) => {
      dispatch(unitFormStore.actions.editWeaponProfile({ id, newProfile: { disabled: !newValue } }))
    },
    [dispatch]
  )

  const handleAddProfile = useCallback(() => {
    dispatch(unitFormStore.actions.addWeaponProfile({ weaponProfile: DEFAULT_PROFILE }))
  }, [dispatch])

  return (
    <>
      <MuiDialogContent classes={{ root: classes.content }}>
        <UnitToolBar />
        <TextField
          label="Unit Name"
          fullWidth
          variant="outlined"
          className={classes.nameField}
          value={data.name}
          onChange={handleNameChange}
          error={!!errors?.name}
          helperText={errors?.name}
        />
        <Typography>Weapon Profiles:</Typography>
        <div style={{ paddingBottom: theme.spacing(1) }} />
        {data.weaponProfiles.map(profile => (
          <WeaponProfileInfo
            profile={profile}
            key={profile.id}
            onClick={handleProfileClicked(profile.id)}
            onEnabledChanged={handleProfileEnabledChanged(profile.id)}
            controls={<ProfileControls unitId={unitId} profile={profile} />}
          />
        ))}
        <Button variant="contained" fullWidth startIcon={<Add />} onClick={handleAddProfile} color="primary">
          Add Profile
        </Button>
      </MuiDialogContent>
      <WeaponProfileDialog />
    </>
  )
}

export default React.memo(DialogContent)
