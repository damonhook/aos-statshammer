import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { HashRoute } from 'utils/routes'

interface ConfirmProps {
  hash: HashRoute
  onConfirm?: () => void
  onClose?: () => void
  description?: string
}

const Confirm = ({ hash, onConfirm, onClose, description }: ConfirmProps) => {
  const location = useLocation()
  const history = useHistory()

  const open = location.hash === hash

  const handleClose = () => {
    if (onClose) onClose()
    history.goBack()
  }

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText>{description || 'Are you sure?'}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Confirm
