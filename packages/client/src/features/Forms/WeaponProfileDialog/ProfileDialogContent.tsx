import {
  Box,
  DialogContent,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@material-ui/core'
import ModifierList from 'components/ModifierList'
import ModifierSelector from 'components/ModifierSelector'
import { helpSelectors } from 'help/editProfileHelp'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { profileFormStore } from 'store/slices/forms'
import { Modifier } from 'types/modifierInstance'
import Store from 'types/store'
import { ProfileFormData } from 'types/store/forms/profileForm'
import { ProfileErrors } from 'types/validation'
import { HASH_ROUTES } from 'utils/routes'

import CharacteristicField from './CharacteristicField'
import ProfileToolBar from './ProfileToolBar'

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

interface ProfileDialogContentProps {
  unitId: string
  data: ProfileFormData
  errors?: ProfileErrors
  closeTour?: () => void
}

const ProfileDialogContent = ({ unitId, data, errors, closeTour }: ProfileDialogContentProps) => {
  const modifiers = useSelector((state: Store) => state.modifiers.modifiers)

  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(profileFormStore.actions.editData({ key: 'name', value: event.target.value }))
  }

  const handleAddModifiers = useCallback(
    (newModifiers: Omit<Modifier, 'id'>[]) => {
      dispatch(profileFormStore.actions.addModifiers({ modifiers: newModifiers }))
    },
    [dispatch]
  )

  const handleEditModifier = useCallback(
    (id: string, key: string, value: string | number | boolean) => {
      dispatch(profileFormStore.actions.editModifierOption({ id, key, value }))
    },
    [dispatch]
  )

  const handleDeleteModifier = useCallback(
    (id: string) => {
      dispatch(profileFormStore.actions.deleteModifier({ id }))
    },
    [dispatch]
  )

  const handleModifierEnabledChanged = useCallback(
    (id: string, newValue: boolean) => {
      dispatch(profileFormStore.actions.setModifierDisabled({ id, disabled: !newValue }))
    },
    [dispatch]
  )

  const handleMoveModifier = useCallback(
    (index: number, newIndex: number) => {
      dispatch(profileFormStore.actions.moveModifier({ index, newIndex }))
    },
    [dispatch]
  )

  return (
    <DialogContent classes={{ root: classes.content }}>
      <ProfileToolBar unitId={unitId} />
      <TextField
        label="Profile Name"
        fullWidth
        variant="outlined"
        className={classes.nameField}
        value={data.name ?? ''}
        onChange={handleChangeName}
        id={helpSelectors.ids.profileName}
      />
      <div style={{ paddingBottom: theme.spacing(2) }}>
        <Grid container spacing={2} style={{ paddingBottom: theme.spacing(2) }} alignItems="flex-start">
          <Grid container item xs={12} md={3} spacing={2} id={helpSelectors.ids.profileCharacteristic}>
            <Grid item xs={12} spacing={0}>
              <Typography>Characteristics:</Typography>
            </Grid>
            <CharacteristicField data={data} errors={errors} characteristic="numModels" />
            <CharacteristicField data={data} errors={errors} characteristic="attacks" />
            <CharacteristicField data={data} errors={errors} characteristic="toHit" />
            <CharacteristicField data={data} errors={errors} characteristic="toWound" />
            <CharacteristicField data={data} errors={errors} characteristic="rend" />
            <CharacteristicField data={data} errors={errors} characteristic="damage" />
          </Grid>
          <Grid item xs>
            <Typography style={{ paddingBottom: theme.spacing(2) }}>Modifiers:</Typography>
            <ModifierList
              definitions={modifiers}
              modifiers={data.modifiers}
              addModifiers={handleAddModifiers}
              editModifier={handleEditModifier}
              deleteModifier={handleDeleteModifier}
              onEnabledChanged={handleModifierEnabledChanged}
              moveModifier={handleMoveModifier}
              errors={errors?.modifiers}
              variant="outlined"
              ModifierItemProps={{ className: helpSelectors.classes.modifiers }}
            />
            <Box paddingTop={2}>
              <div id={helpSelectors.ids.addModifiers}>
                <ModifierSelector
                  modifiers={modifiers}
                  onOpen={closeTour}
                  onConfirm={handleAddModifiers}
                  hash={HASH_ROUTES.MODIFIERS}
                />
              </div>
            </Box>
          </Grid>
        </Grid>
      </div>
    </DialogContent>
  )
}

export default React.memo(ProfileDialogContent)
