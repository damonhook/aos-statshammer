import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import React from 'react';

interface ActionsType {
  name: string;
  onClick: () => void;
  disabled?: boolean;
}

interface IActionsDialogProps {
  open: boolean;
  actions: ActionsType[];
  target: string;
  onClose: () => void;
}

/**
 * A dialog box containing various possible actions that can be performed
 */
const ActionsDialog: React.FC<IActionsDialogProps> = ({ open, actions, target, onClose }) => {
  if (!actions?.length) return null;

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
        {actions.map((action) => (
          <Button
            variant="text"
            onClick={() => {
              action.onClick();
              onClose();
            }}
            disabled={action.disabled}
            key={action.name}
            color="primary"
          >
            {action.name}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default ActionsDialog;
