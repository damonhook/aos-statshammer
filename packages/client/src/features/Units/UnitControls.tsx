import Menu from 'components/Menu'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notificationsStore, unitsStore } from 'store/slices'
import Store from 'types/store'
import { Unit } from 'types/store/units'

interface UnitControlsProps {
  unit: Unit
  index: number
}

const UnitControls = ({ unit, index }: UnitControlsProps) => {
  const numUnits = useSelector((state: Store) => state.units.items.length)
  const dispatch = useDispatch()

  const handleCopy = useCallback(() => {
    dispatch(unitsStore.actions.addUnit({ unit: { ...unit, name: `${unit.name} copy` } }))
  }, [unit, dispatch])

  const handleDelete = useCallback(() => {
    dispatch(unitsStore.actions.deleteUnit({ id: unit.id }))
    dispatch(notificationsStore.actions.addNotification({ message: 'Deleted Unit' }))
  }, [unit.id, dispatch])

  const handleExport = useCallback(() => {
    console.log('export')
  }, [])

  const handleMoveUp = useCallback(() => {
    dispatch(unitsStore.actions.moveUnit({ index, newIndex: index - 1 }))
  }, [dispatch, index])

  const handleMoveDown = useCallback(() => {
    dispatch(unitsStore.actions.moveUnit({ index, newIndex: index + 1 }))
  }, [dispatch, index])

  return (
    <Menu
      items={[
        { name: 'Copy', onClick: handleCopy },
        { name: 'Delete', onClick: handleDelete },
        { name: 'Export', onClick: handleExport },
      ]}
      secondaryItems={[
        { name: 'Move Up', onClick: handleMoveUp, disabled: index === 0 },
        { name: 'MoveDown', onClick: handleMoveDown, disabled: index >= numUnits - 1 },
      ]}
    />
  )
}

export default React.memo(UnitControls)
