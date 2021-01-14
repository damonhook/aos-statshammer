import React, { useCallback } from 'react'
import Menu from 'components/Menu'
import { WeaponProfile } from 'types/store/units'
import { useDispatch } from 'react-redux'
import { unitFormStore } from 'store/slices'
import { openProfileDialog } from '../WeaponProfileDialog'
import { useHistory } from 'react-router-dom'

interface ProfileControlsProps {
  unitId: string
  profile: WeaponProfile
}

const ProfileControls = ({ unitId, profile }: ProfileControlsProps) => {
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
    <span style={{ marginRight: 5 }}>
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
