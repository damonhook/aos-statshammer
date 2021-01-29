import { Button, DialogActions } from '@material-ui/core'
import DialogAppBar from 'components/DialogAppBar'
import SideSheet from 'components/SideSheet'
import TourGuide from 'components/TourGuide'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { findUnitSelector } from 'store/selectors/unitsSelectors'
import { unitsStore } from 'store/slices'
import { unitFormStore } from 'store/slices/forms'
import Store from 'types/store'
import { DIALOG_ROUTES, getDialogRoute } from 'utils/routes'

import DialogContent from './DialogContent'
import getSteps, { helpTargets } from './Help'

export function openUnitDialog(
  history: { push: (path: string, state?: Record<string, unknown>) => void },
  unitId: string
) {
  const path = getDialogRoute(DIALOG_ROUTES.EDIT_UNIT, { unitId })
  history.push(path, { modal: true })
}

const WeaponProfileDialog = () => {
  const dispatch = useDispatch()
  const match = useRouteMatch<{ unitId: string }>(DIALOG_ROUTES.EDIT_UNIT)
  const location = useLocation<{ modal: boolean }>()
  const history = useHistory()
  const [helpRunning, setHelpRunning] = useState(false)

  const open = !!match
  const { unitId = '' } = match?.params ?? {}
  const unit = useSelector((state: Store) => findUnitSelector(state, { unitId }))
  const { data, errors } = useSelector((state: Store) => state.forms.unit)

  const helpSteps = useMemo(
    () =>
      getSteps({
        numWeaponProfiles: data?.weaponProfiles.length ?? 0,
      }),
    [data?.weaponProfiles.length]
  )

  const handleBack = useCallback(() => {
    history.goBack()
  }, [history])

  useEffect(() => {
    if (open) {
      if (!location.state?.modal) history.replace('/')
      else if (!unit) handleBack()
    }
  }, [open, location.state, history, unit, handleBack])

  useEffect(() => {
    if (open && unit) dispatch(unitFormStore.actions.initForm({ unit }))
  }, [open, unit, dispatch])

  useEffect(() => {
    if (!open && helpRunning) setHelpRunning(false)
  }, [open, helpRunning])

  const handleSideSheetClose = useCallback(() => {
    if (helpRunning) setHelpRunning(false)
    else handleBack()
  }, [handleBack, helpRunning])

  const saveForm = useCallback(
    (event: React.MouseEvent<any>) => {
      event.preventDefault()
      if (data) dispatch(unitsStore.actions.editUnit({ id: unitId, newUnit: data }))
      handleBack()
    },
    [dispatch, unitId, data, handleBack]
  )

  return (
    <SideSheet open={open} aria-labelledby="unit-dialog-title" onClose={handleSideSheetClose} keepMounted>
      <form style={{ display: 'contents' }}>
        <DialogAppBar
          id="unit-dialog-title"
          title="Edit Unit"
          onClose={handleBack}
          startHelp={() => setHelpRunning(true)}
        />
        {data && <DialogContent unitId={unitId} data={data} errors={errors} />}
        <DialogActions id={helpTargets.ids.unitDialogActions}>
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
