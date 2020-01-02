import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core';

interface ActionsType {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

interface ActionsDialogProps {
  open: boolean;
  actions: ActionsType[];
  target: string;
  onClose: () => void;
}

/**
 * A dialog box containing various possible actions that can be performed
 */
const ActionsDialog: React.FC<ActionsDialogProps> = ({ open, actions, target, onClose }) => {
  if (!actions || !actions.length) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h5">Actions</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>{`Available actions for ${target}`}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose} color="primary">
          Close
        </Button>
        {actions.map(action => (
          <Button
            variant="text"
            onClick={() => {
              action.onClick();
              onClose();
            }}
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

export default ActionsDialog;
