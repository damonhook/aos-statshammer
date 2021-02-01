import Menu from 'components/Menu'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { unitFormStore } from 'store/slices/forms'
import { WeaponProfile } from 'types/store/units'

import { openProfileDialog } from '../WeaponProfileDialog'

interface ProfileControlsProps {
  unitId: string
  profile: WeaponProfile
  className?: string
  closeTour?: () => void
}

const ProfileControls = ({ unitId, profile, className, closeTour }: ProfileControlsProps) => {
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

  return (
    <div className={className} style={{ marginRight: 5 }}>
      <Menu
        onOpen={handleOpen}
        items={[
          { name: 'Edit', onClick: handleEdit },
          { name: 'Copy', onClick: handleCopy },
          { name: 'Delete', onClick: handleDelete },
        ]}
      />
    </div>
  )
}

export default ProfileControls
