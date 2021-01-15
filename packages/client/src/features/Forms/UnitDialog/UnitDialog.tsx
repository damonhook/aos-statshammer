import { DialogActions, Button } from '@material-ui/core'
import Store from 'types/store'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findUnitSelector } from 'store/selectors/unitsSelectors'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { unitFormStore, unitsStore } from 'store/slices'
import DialogAppBar from 'components/DialogAppBar'
import SideSheet from 'components/SideSheet'
import { DIALOG_ROUTES } from 'utils/routes'
import DialogContent from './DialogContent'

export function openUnitDialog(history: { push: (path: string, state?: object) => void }, unitId: string) {
  const path = DIALOG_ROUTES.EDIT_UNIT.replace(':unitId', unitId)
  history.push(path, { modal: true })
}

const WeaponProfileDialog = () => {
  const dispatch = useDispatch()
  const match = useRouteMatch<{ unitId: string }>(DIALOG_ROUTES.EDIT_UNIT)
  const location = useLocation<{ modal: boolean }>()
  const history = useHistory()

  // // const { unitId, id } = useParams<{ unitId: string; id: string }>()
  const open = !!match
  const { unitId = '' } = match?.params ?? {}
  const unit = useSelector((state: Store) => findUnitSelector(state, { unitId }))
  const { data, errors } = useSelector((state: Store) => state.forms.unit)

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

  const saveForm = useCallback(() => {
    if (data) dispatch(unitsStore.actions.editUnit({ id: unitId, newUnit: data }))
    handleBack()
  }, [dispatch, unitId, data, handleBack])

  return (
    <SideSheet open={open} aria-labelledby="unit-dialog-title" keepMounted>
      <DialogAppBar id="unit-dialog-title" title="Edit Unit" onClose={handleBack} />
      <div style={{ marginBottom: 10 }}></div>
      {data && <DialogContent unitId={unitId} data={data} />}
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
