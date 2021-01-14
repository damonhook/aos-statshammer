import { DialogActions, Button } from '@material-ui/core'
import Store from 'types/store'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import ProfileContent from './ProfileContent'
import { profileFormStore, unitFormStore } from 'store/slices'
import DialogAppBar from 'components/DialogAppBar'
import SideSheet from 'components/SideSheet'
import { DIALOG_ROUTES } from 'utils/routes'

export function openProfileDialog(
  history: { push: (path: string, state?: object) => void },
  unitId: string,
  id: string
) {
  const path = DIALOG_ROUTES.EDIT_PROFILE.replace(':unitId', unitId).replace(':id', id)
  history.push(path, { modal: true })
}

const WeaponProfileDialog = () => {
  const dispatch = useDispatch()
  const match = useRouteMatch<{ unitId: string; id: string }>(DIALOG_ROUTES.EDIT_PROFILE)
  const history = useHistory()

  const open = !!match
  const { id = '' } = match?.params ?? {}
  const profile = useSelector((state: Store) => state.forms.unit.data?.weaponProfiles.find(p => p.id === id))
  const { data, errors } = useSelector((state: Store) => state.forms.weaponProfile)

  const handleBack = useCallback(() => {
    history.goBack()
  }, [history])

  useEffect(() => {
    if (open && profile) dispatch(profileFormStore.actions.initForm({ weaponProfile: profile }))
  }, [open, profile, dispatch])

  const saveForm = useCallback(() => {
    if (data) dispatch(unitFormStore.actions.editWeaponProfile({ id, newProfile: data }))
    handleBack()
  }, [dispatch, id, data, handleBack])

  return (
    <SideSheet open={open} aria-labelledby="profile-dialog-title" keepMounted maxWidth={900}>
      <DialogAppBar id="profile-dialog-title" title="Edit Weapon Profile" onClose={handleBack} />
      <div style={{ marginBottom: 10 }}></div>
      {data && <ProfileContent data={data} errors={errors} />}
      <DialogActions>
        <Button onClick={handleBack}>Cancel</Button>
        <Button onClick={saveForm} disabled={!!errors}>
          Confirm
        </Button>
      </DialogActions>
    </SideSheet>
  )
}

export default React.memo(WeaponProfileDialog)
