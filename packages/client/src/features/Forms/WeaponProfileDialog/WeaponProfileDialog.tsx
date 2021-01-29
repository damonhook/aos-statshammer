import { Button, DialogActions } from '@material-ui/core'
import DialogAppBar from 'components/DialogAppBar'
import SideSheet from 'components/SideSheet'
import TourGuide from 'components/TourGuide'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { profileFormStore, unitFormStore } from 'store/slices/forms'
import Store from 'types/store'
import { DIALOG_ROUTES, getDialogRoute } from 'utils/routes'

import { helpTargets } from './Help'
import getSteps from './Help'
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
  const [helpRunning, setHelpRunning] = useState(false)
  const dispatch = useDispatch()
  const match = useRouteMatch<{ unitId: string; id: string }>(DIALOG_ROUTES.EDIT_PROFILE)
  const history = useHistory()

  const open = !!match
  const { unitId = '', id = '' } = match?.params ?? {}
  const profile = useSelector((state: Store) => state.forms.unit.data?.weaponProfiles.find(p => p.id === id))
  const { data, errors } = useSelector((state: Store) => state.forms.weaponProfile)

  const helpSteps = useMemo(() => getSteps({ numModifiers: data?.modifiers.length ?? 0 }), [
    data?.modifiers.length,
  ])

  const handleBack = useCallback(() => {
    history.goBack()
  }, [history])

  useEffect(() => {
    if (open && profile) dispatch(profileFormStore.actions.initForm({ weaponProfile: profile }))
  }, [open, profile, dispatch])

  const handleSideSheetClose = useCallback(() => {
    if (helpRunning) setHelpRunning(false)
    else handleBack()
  }, [handleBack, helpRunning])

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
      onClose={handleSideSheetClose}
      keepMounted
      maxWidth={1024}
    >
      <form style={{ display: 'contents' }}>
        <DialogAppBar
          id="profile-dialog-title"
          title="Edit Weapon Profile"
          onClose={handleBack}
          startHelp={() => setHelpRunning(true)}
        />
        <div style={{ marginBottom: 10 }}></div>
        {data && <ProfileContent unitId={unitId} data={data} errors={errors} />}
        <DialogActions id={helpTargets.ids.profileDialogActions}>
          <Button onClick={handleBack}>Cancel</Button>
          <Button onClick={saveForm} disabled={!!errors} type="submit">
            Confirm
          </Button>
        </DialogActions>
      </form>
      <TourGuide isOpen={helpRunning} steps={helpSteps} onRequestClose={() => setHelpRunning(false)} />
    </SideSheet>
  )
}

export default React.memo(WeaponProfileDialog)
