import { Delete } from '@material-ui/icons'
import Confirm from 'components/Confirm'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unitsStore } from 'store/slices'
import Store from 'types/store'
import { HASH_ROUTES } from 'utils/routes'

import ListItemLink from './components/ListItemLink'

interface ClearUnitsItemProps {
  open: boolean
  onClose: () => void
}

const ClearUnitsItem = ({ open, onClose }: ClearUnitsItemProps) => {
  const units = useSelector((state: Store) => state.units.items)
  const dispatch = useDispatch()

  const handleClearUnits = useCallback(() => {
    dispatch(unitsStore.actions.clearUnits())
    onClose()
  }, [dispatch, onClose])

  return (
    <>
      <ListItemLink
        primary="Clear Units"
        to={HASH_ROUTES.CLEAR_UNITS}
        icon={<Delete />}
        tooltip={!open}
        disabled={!units.length}
      />
      <Confirm
        hash={HASH_ROUTES.CLEAR_UNITS}
        onConfirm={handleClearUnits}
        description="Are you sure you want to delete all units"
      />
    </>
  )
}

export default ClearUnitsItem
