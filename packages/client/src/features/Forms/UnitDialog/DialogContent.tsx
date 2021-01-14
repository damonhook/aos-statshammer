import {
  TextField,
  DialogContent as MuiDialogContent,
  makeStyles,
  Theme,
  useTheme,
  Button,
  Typography,
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import WeaponProfileInfo from 'components/WeaponProfileInfo'
import WeaponProfileDialog, { openProfileDialog } from 'features/Forms/WeaponProfileDialog'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { unitFormStore } from 'store/slices'
import { UnitFormData } from 'types/store/unitForm'
import { WeaponProfileParams } from 'types/store/units'
import ProfileControls from './ProfileControls'

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
  nameField: {
    paddingBottom: theme.spacing(3),
  },
  content: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 2),
    },
  },
}))

interface DialogContentProps {
  unitId: string
  data: UnitFormData
}

const DialogContent = ({ unitId, data }: DialogContentProps) => {
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

  const handleAddProfile = useCallback(() => {
    dispatch(unitFormStore.actions.addWeaponProfile({ weaponProfile: DEFAULT_PROFILE }))
  }, [dispatch])

  return (
    <>
      <MuiDialogContent classes={{ root: classes.content }}>
        <TextField
          label="Unit Name"
          fullWidth
          variant="outlined"
          className={classes.nameField}
          value={data.name}
          onChange={handleNameChange}
        />
        <Typography>Weapon Profiles:</Typography>
        <div style={{ paddingBottom: theme.spacing(1) }} />
        {data.weaponProfiles.map(profile => (
          <WeaponProfileInfo
            profile={profile}
            key={profile.id}
            onClick={handleProfileClicked(profile.id)}
            controls={<ProfileControls unitId={unitId} profile={profile} />}
          />
        ))}
        <Button variant="contained" fullWidth startIcon={<Add />} onClick={handleAddProfile}>
          Add Profile
        </Button>
      </MuiDialogContent>
      <WeaponProfileDialog />
    </>
  )
}

export default React.memo(DialogContent)
