import Menu from 'components/Menu'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { notificationsStore, unitsStore } from 'store/slices'
import { Unit } from 'types/store/units'

interface UnitListControlsProps {
  unit: Unit
}

const UnitListControls = ({ unit }: UnitListControlsProps) => {
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

  return (
    <Menu
      items={[
        { name: 'Copy', onClick: handleCopy },
        { name: 'Delete', onClick: handleDelete },
        { name: 'Export', onClick: handleExport },
      ]}
    />
  )
}

export default React.memo(UnitListControls)
