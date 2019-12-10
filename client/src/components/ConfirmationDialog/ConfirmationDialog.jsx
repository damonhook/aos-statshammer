import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';


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
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  description: PropTypes.string,
};

export default ConfirmationDialog;
