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
}

const ProfileControls = ({ unitId, profile, className }: ProfileControlsProps) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleEdit = useCallback(() => {
    openProfileDialog(history, unitId, profile.id)
  }, [history, unitId, profile.id])

  const handleCopy = useCallback(() => {
    dispatch(unitFormStore.actions.addWeaponProfile({ weaponProfile: profile }))
  }, [profile, dispatch])

  const handleDelete = useCallback(() => {
    dispatch(unitFormStore.actions.deleteWeaponProfile({ id: profile.id }))
  }, [profile.id, dispatch])

  return (
    <span className={className} style={{ marginRight: 5 }}>
      <Menu
        items={[
          { name: 'Edit', onClick: handleEdit },
          { name: 'Copy', onClick: handleCopy },
          { name: 'Delete', onClick: handleDelete },
        ]}
      />
    </span>
  )
}

export default ProfileControls
