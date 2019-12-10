import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, AppBar, Toolbar, Typography, IconButton, DialogContent, DialogActions, Button, Slide,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
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

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const SelectorDialog = ({ open, modifiers, addModifier }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClose = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Dialog open={open} fullScreen scroll="paper" TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton onClick={handleClose}><Close className={classes.icon} /></IconButton>
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

SelectorDialog.defaultProps = {
  open: true,
};

SelectorDialog.propTypes = {
  open: PropTypes.bool,
  modifiers: PropTypes.arrayOf(PropTypes.object).isRequired,
  addModifier: PropTypes.func.isRequired,
};

export default SelectorDialog;
