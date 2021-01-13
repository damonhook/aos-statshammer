import { DialogActions, Button } from '@material-ui/core'
import Store from 'types/store'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { weaponProfileSelector } from 'store/selectors/unitsSelectors'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import ProfileContent from './ProfileContent'
import { profileFormStore, unitsStore } from 'store/slices'
import DialogAppBar from 'components/DialogAppBar'
import SideSheet from 'components/SideSheet'

export function openProfileDialog(
  history: { push: (path: string, state?: object) => void },
  unitId: string,
  id: string
) {
  history.push(`/units/${unitId}/edit/${id}`, { modal: true })
}

const WeaponProfileDialog = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation<{ modal: boolean }>()

  const { unitId, id } = useParams<{ unitId: string; id: string }>()
  const profile = useSelector((state: Store) => weaponProfileSelector(state, { unitId, id }))
  const { data, errors } = useSelector((state: Store) => state.profileForm)

  const handleBack = useCallback(() => {
    history.goBack()
  }, [history])

  useEffect(() => {
    if (!location.state?.modal) history.replace('/')
    else if (!profile) handleBack()
  }, [location.state, history, profile, handleBack])

  useEffect(() => {
    if (profile) dispatch(profileFormStore.actions.initForm({ weaponProfile: profile }))
  }, [profile, dispatch])

  const saveForm = useCallback(() => {
    if (data) dispatch(unitsStore.actions.editWeaponProfile({ unitId, id, newProfile: data }))
    handleBack()
  }, [dispatch, unitId, id, data, handleBack])

  return data ? (
    <SideSheet open aria-labelledby="profile-dialog-title">
      <DialogAppBar id="profile-dialog-title" title="Weapon Profile" onClose={handleBack} />
      <div style={{ marginBottom: 10 }}></div>
      <ProfileContent data={data} errors={errors} />
      <DialogActions>
        <Button onClick={handleBack}>Cancel</Button>
        <Button onClick={saveForm} disabled={!!errors}>
          Confirm
        </Button>
      </DialogActions>
    </SideSheet>
  ) : (
    <></>
  )
}

export default React.memo(WeaponProfileDialog)

// === Alternate ===
// <Dialog
//   open
//   maxWidth="lg"
//   fullWidth
//   fullScreen={isMobile}
//   aria-labelledby="profile-dialog-title"
//   scroll="paper"
//   onClose={handleBack}
// >
//   <DialogTitle id="profile-dialog-title">Weapon Profile</DialogTitle>
//   <ProfileContent data={data} errors={errors} />
//   <DialogActions>
//     <Button onClick={handleBack}>Cancel</Button>
//     <Button onClick={saveForm} disabled={!!errors}>
//       Confirm
//     </Button>
//   </DialogActions>
// </Dialog>
