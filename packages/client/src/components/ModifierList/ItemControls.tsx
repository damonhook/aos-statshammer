import Menu from 'components/Menu'
import React, { useCallback } from 'react'
import { Modifier } from 'types/modifierInstance'

interface ItemControlsProps {
  modifier: Modifier
  index: number
  numModifiers: number
  addModifiers: (modifiers: Omit<Modifier, 'id'>[]) => void
  deleteModifier: (id: string) => void
  moveModifier: (index: number, newIndex: number) => void
}

const ItemControls = ({
  modifier,
  index,
  numModifiers,
  addModifiers,
  deleteModifier,
  moveModifier,
}: ItemControlsProps) => {
  const handleCopy = useCallback(() => {
    addModifiers([modifier])
  }, [addModifiers, modifier])

  const handleDelete = useCallback(() => {
    deleteModifier(modifier.id)
  }, [deleteModifier, modifier.id])

  const handleMoveUp = useCallback(() => {
    moveModifier(index, index - 1)
  }, [index, moveModifier])

  const handleMoveDown = useCallback(() => {
    moveModifier(index, index + 1)
  }, [index, moveModifier])

  return (
    <Menu
      items={[
        { name: 'Copy', onClick: handleCopy },
        { name: 'Delete', onClick: handleDelete },
      ]}
      secondaryItems={[
        { name: 'Move Up', onClick: handleMoveUp, disabled: index === 0 },
        { name: 'MoveDown', onClick: handleMoveDown, disabled: index >= numModifiers - 1 },
      ]}
    />
  )
}

export default React.memo(ItemControls)
