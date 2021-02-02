import Menu from 'components/Menu'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { unitFormStore } from 'store/slices/forms'
import Store from 'types/store'
import { WeaponProfile } from 'types/store/units'

import { openProfileDialog } from '../WeaponProfileDialog'

interface ProfileControlsProps {
  unitId: string
  index: number
  profile: WeaponProfile
  className?: string
  closeTour?: () => void
}

const ProfileControls = ({ unitId, index, profile, className, closeTour }: ProfileControlsProps) => {
  const numProfiles = useSelector((state: Store) => state.forms.unit.data?.weaponProfiles.length ?? 0)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleOpen = useCallback(() => {
    if (closeTour) closeTour()
  }, [closeTour])

  const handleEdit = useCallback(() => {
    openProfileDialog(history, unitId, profile.id)
  }, [history, unitId, profile.id])

  const handleCopy = useCallback(() => {
    dispatch(unitFormStore.actions.addWeaponProfile({ weaponProfile: profile }))
  }, [dispatch, profile])

  const handleDelete = useCallback(() => {
    dispatch(unitFormStore.actions.deleteWeaponProfile({ id: profile.id }))
  }, [dispatch, profile.id])

  const handleMoveUp = useCallback(() => {
    dispatch(unitFormStore.actions.moveWeaponProfile({ index, newIndex: index - 1 }))
  }, [dispatch, index])

  const handleMoveDown = useCallback(() => {
    dispatch(unitFormStore.actions.moveWeaponProfile({ index, newIndex: index + 1 }))
  }, [dispatch, index])

  return (
    <div className={className} style={{ marginRight: 5 }}>
      <Menu
        onOpen={handleOpen}
        items={[
          { name: 'Edit', onClick: handleEdit },
          { name: 'Copy', onClick: handleCopy },
          { name: 'Delete', onClick: handleDelete },
        ]}
        secondaryItems={[
          { name: 'Move Up', onClick: handleMoveUp, disabled: index === 0 },
          { name: 'MoveDown', onClick: handleMoveDown, disabled: index >= numProfiles - 1 },
        ]}
      />
    </div>
  )
}

export default React.memo(ProfileControls)
