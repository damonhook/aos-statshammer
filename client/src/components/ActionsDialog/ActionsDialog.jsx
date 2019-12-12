import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  dialog: {},
});

/**
 * A dialog box containing various possible actions that can be performed
 */
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
        <Button variant="text" onClick={onClose} color="primary">Close</Button>
        {actions.map((action) => (
          <Button
            variant="text"
            onClick={() => { action.onClick(); onClose(); }}
            disabled={action.disabled}
            key={action.label}
            color="primary"
          >
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

ActionsDialog.propTypes = {
  /** Whether the dialog is open or not. Leave as `true` if you are using a Router to open it */
  open: PropTypes.bool.isRequired,
  /** An array of possible actions that can be performed */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
      disabled: PropTypes.func.bool,
    }),
  ).isRequired,
  /** The target of the actions. This is used to determine the dialog text */
  target: PropTypes.string.isRequired,
  /** A function to call when the dialog box is closed */
  onClose: PropTypes.func.isRequired,
};

export default ActionsDialog;
