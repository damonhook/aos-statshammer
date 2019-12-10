import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  dialog: {},
});

const ActionsDialog = ({
  open, actions, target, onClose,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      className={classes.dialog}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle><Typography variant="h5">Actions</Typography></DialogTitle>
      <DialogContent>
        <Typography>
          {`Available actions for ${target}`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>Close</Button>
        {actions.map((action) => (
          <Button
            variant="text"
            onClick={() => { action.onClick(); onClose(); }}
            disabled={action.disabled}
            key={action.label}
          >
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

ActionsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      disabled: PropTypes.func.bool,
    }),
  ).isRequired,
  target: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ActionsDialog;
