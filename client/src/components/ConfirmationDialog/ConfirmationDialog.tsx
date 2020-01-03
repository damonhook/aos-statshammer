import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

interface ConfirmationDialogProps {
  open: boolean;
  onConfirm: () => void;
  onClose?: () => void;
  description?: string;
}

/**
 * A simple dialog box with a confirm and cancel action
 */
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ open, onConfirm, onClose, description }) => {
  const history = useHistory();

  const handleClose = () => {
    if (onClose) onClose();
    history.goBack();
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

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
  );
};

export default ConfirmationDialog;
