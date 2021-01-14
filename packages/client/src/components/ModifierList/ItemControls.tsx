import React, { useCallback } from 'react'
import Menu from 'components/Menu'
import { Modifier } from 'types/modifierInstance'

interface ItemControlsProps {
  modifier: Modifier
  addModifiers: (modifiers: Omit<Modifier, 'id'>[]) => void
  deleteModifier: (id: string) => void
}

const ItemControls = ({ modifier, addModifiers, deleteModifier }: ItemControlsProps) => {
  const handleCopy = useCallback(() => {
    addModifiers([modifier])
  }, [addModifiers, modifier])

  const handleDelete = useCallback(() => {
    deleteModifier(modifier.id)
  }, [deleteModifier, modifier.id])

  return (
    <Menu
      items={[
        { name: 'Copy', onClick: handleCopy },
        { name: 'Delete', onClick: handleDelete },
      ]}
    />
  )
}

export default React.memo(ItemControls)
