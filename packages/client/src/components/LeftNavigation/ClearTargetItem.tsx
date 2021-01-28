import { HighlightOff } from '@material-ui/icons'
import Confirm from 'components/Confirm'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { targetStore } from 'store/slices'
import Store from 'types/store'
import { HASH_ROUTES } from 'utils/routes'

import ListItemLink from './components/ListItemLink'

interface ClearTargetItemProps {
  open: boolean
  onClose: () => void
}

const ClearTargetItem = ({ open, onClose }: ClearTargetItemProps) => {
  const targetModifiers = useSelector((state: Store) => state.target.modifiers)
  const dispatch = useDispatch()

  const handleClearTarget = useCallback(() => {
    dispatch(targetStore.actions.clearTarget())
    onClose()
  }, [dispatch, onClose])

  return (
    <>
      <ListItemLink
        primary="Clear Target"
        to={HASH_ROUTES.CLEAR_UNITS}
        icon={<HighlightOff />}
        tooltip={!open}
        disabled={!targetModifiers.length}
      />
      <Confirm
        hash={HASH_ROUTES.CLEAR_UNITS}
        onConfirm={handleClearTarget}
        description="Are you sure you want to clear target modifiers"
      />
    </>
  )
}

export default ClearTargetItem
