import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

/**
 * A simple dialog box with a confirm and cancel action
 */
const ConfirmationDialog = ({
  open, onConfirm, onClose, description,
}) => {
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
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText>{(description) || 'Are you sure?'}</DialogContentText>
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

ConfirmationDialog.defaultProps = {
  onClose: null,
  description: null,
};

ConfirmationDialog.propTypes = {
  /** Whether the dialog box is open or not */
  open: PropTypes.bool.isRequired,
  /** The function to call when the confirm button is pressed */
  onConfirm: PropTypes.func.isRequired,
  /** The function to call when the cancel button is pressed, or the dialog is closed */
  onClose: PropTypes.func,
  /** The description to add the to dialog box */
  description: PropTypes.string,
};

export default ConfirmationDialog;
