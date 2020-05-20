import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import type { TransitionProps } from '@material-ui/core/transitions';
import { Close } from '@material-ui/icons';
import { useHashMatch } from 'hooks';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import type { IModifierDefinition } from 'types/modifiers';

import ModifierOption from './ModifierOption';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    color: theme.palette.primary.contrastText,
  },
  content: {
    padding: 0,
  },
  actions: {
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0.5, 1.5, 2, 0),
    },
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ISelectorDialogProps {
  modifiers: IModifierDefinition[];
  addModifier: (mod: IModifierDefinition) => void;
  hash: string;
}

/**
 * The modifier selector in the form of a dialog (for mobile)
 */
const SelectorDialog: React.FC<ISelectorDialogProps> = ({ modifiers, addModifier, hash }) => {
  const classes = useStyles();
  const history = useHistory();
  const open = useHashMatch(hash);

  const handleClose = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Dialog open={open} fullScreen scroll="paper" TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton onClick={handleClose}>
            <Close className={classes.icon} />
          </IconButton>
          <Typography variant="h6">Modifiers</Typography>
        </Toolbar>
      </AppBar>
      <DialogContent className={classes.content}>
        {modifiers.map((modifier) => (
          <ModifierOption modifier={modifier} onClick={addModifier} key={modifier.id} />
        ))}
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button size="large" onClick={handleClose} color="secondary" variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectorDialog;
