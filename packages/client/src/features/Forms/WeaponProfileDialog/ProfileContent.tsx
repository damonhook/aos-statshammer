import { TextField, DialogContent, Grid, makeStyles, Theme, Typography, useTheme } from '@material-ui/core'
import React, { useCallback } from 'react'
import CharacteristicField from './CharacteristicField'
import { ProfileFormData, ProfileFormErrors } from 'types/store/profileForm'
import ModifierSelector from 'components/ModifierSelector'
import { useDispatch, useSelector } from 'react-redux'
import Store from 'types/store'
import { profileFormStore } from 'store/slices'
import { Modifier } from 'types/modifierInstance'
import ModifierList from 'components/ModifierList'
import { HASH_ROUTES } from 'utils/routes'

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

interface ProfileContentProps {
  data: ProfileFormData
  errors?: ProfileFormErrors
}

const ProfileContent = ({ data }: ProfileContentProps) => {
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
      dispatch(profileFormStore.actions.editModifier({ id, key, value }))
    },
    [dispatch]
  )

  const handleDeleteModifier = useCallback(
    (id: string) => {
      dispatch(profileFormStore.actions.deleteModifier({ id }))
    },
    [dispatch]
  )

  return (
    <DialogContent classes={{ root: classes.content }}>
      <TextField
        label="Profile Name"
        fullWidth
        variant="outlined"
        className={classes.nameField}
        value={data.name}
        onChange={handleChangeName}
      />
      <div style={{ paddingBottom: theme.spacing(2) }}>
        <Grid container spacing={2} style={{ paddingBottom: theme.spacing(2) }} alignItems="flex-start">
          <Grid container item xs={12} md={2} spacing={2}>
            <Grid item xs={12} spacing={0}>
              <Typography>Characteristics:</Typography>
            </Grid>
            <CharacteristicField data={data} characteristic="numModels" />
            <CharacteristicField data={data} characteristic="attacks" />
            <CharacteristicField data={data} characteristic="toHit" />
            <CharacteristicField data={data} characteristic="toWound" />
            <CharacteristicField data={data} characteristic="rend" />
            <CharacteristicField data={data} characteristic="damage" />
          </Grid>
          <Grid item xs>
            <Typography style={{ paddingBottom: theme.spacing(2) }}>Modifiers:</Typography>
            <ModifierList
              definitions={modifiers}
              modifiers={data.modifiers}
              addModifiers={handleAddModifiers}
              editModifier={handleEditModifier}
              deleteModifier={handleDeleteModifier}
            />
            <ModifierSelector
              modifiers={modifiers}
              onConfirm={handleAddModifiers}
              hash={HASH_ROUTES.MODIFIERS}
            />
          </Grid>
        </Grid>
      </div>
    </DialogContent>
  )
}

export default React.memo(ProfileContent)
