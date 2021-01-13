import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Menu from 'components/Menu'
import { Modifier } from 'types/store/units'
import { profileFormStore } from 'store/slices'

interface ItemControlsProps {
  modifier: Modifier
}

const ItemControls = ({ modifier }: ItemControlsProps) => {
  const dispatch = useDispatch()

  const handleCopy = useCallback(() => {
    dispatch(profileFormStore.actions.addModifier({ modifier }))
  }, [dispatch, modifier])

  const handleDelete = useCallback(() => {
    dispatch(profileFormStore.actions.deleteModifier({ id: modifier.id }))
  }, [dispatch, modifier.id])

  return (
    <Menu
      items={[
        { name: 'Copy', onClick: handleCopy },
        { name: 'Delete', onClick: handleDelete },
      ]}
    />
  )
}

export default ItemControls
