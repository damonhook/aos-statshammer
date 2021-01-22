import { Button, DialogActions } from '@material-ui/core'
import DialogAppBar from 'components/DialogAppBar'
import SideSheet from 'components/SideSheet'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { profileFormStore, unitFormStore } from 'store/slices/forms'
import Store from 'types/store'
import { DIALOG_ROUTES, getDialogRoute } from 'utils/routes'

import ProfileContent from './ProfileContent'

export function openProfileDialog(
  history: { push: (path: string, state?: Record<string, unknown>) => void },
  unitId: string,
  id: string
) {
  const path = getDialogRoute(DIALOG_ROUTES.EDIT_PROFILE, { unitId, id })
  history.push(path, { modal: true })
}

const WeaponProfileDialog = () => {
  const dispatch = useDispatch()
  const match = useRouteMatch<{ unitId: string; id: string }>(DIALOG_ROUTES.EDIT_PROFILE)
  const history = useHistory()

  const open = !!match
  const { unitId = '', id = '' } = match?.params ?? {}
  const profile = useSelector((state: Store) => state.forms.unit.data?.weaponProfiles.find(p => p.id === id))
  const { data, errors } = useSelector((state: Store) => state.forms.weaponProfile)

  const handleBack = useCallback(() => {
    history.goBack()
  }, [history])

  useEffect(() => {
    if (open && profile) dispatch(profileFormStore.actions.initForm({ weaponProfile: profile }))
  }, [open, profile, dispatch])

  const saveForm = useCallback(
    (event: React.MouseEvent<any>) => {
      event.preventDefault()
      if (data) dispatch(unitFormStore.actions.editWeaponProfile({ id, newProfile: data }))
      handleBack()
    },
    [dispatch, id, data, handleBack]
  )

  return (
    <SideSheet
      open={open}
      aria-labelledby="profile-dialog-title"
      onClose={handleBack}
      keepMounted
      maxWidth={900}
    >
      <form style={{ display: 'contents' }}>
        <DialogAppBar id="profile-dialog-title" title="Edit Weapon Profile" onClose={handleBack} />
        <div style={{ marginBottom: 10 }}></div>
        {data && <ProfileContent unitId={unitId} data={data} errors={errors} />}
        <DialogActions>
          <Button onClick={handleBack}>Cancel</Button>
          <Button onClick={saveForm} disabled={!!errors} type="submit">
            Confirm
          </Button>
        </DialogActions>
      </form>
    </SideSheet>
  )
}

export default React.memo(WeaponProfileDialog)
