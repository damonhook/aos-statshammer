import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Button, Collapse, useMediaQuery } from '@material-ui/core';
import { Add, Remove, Sync } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory, useLocation, Route } from 'react-router-dom';
import ModifierOption from './ModifierOption';
import SelectorDialog from './SelectorDialog';

const useStyles = makeStyles({
  selector: { marginTop: '1em', marginBottom: '1em' },
  button: { justifyContent: 'left' },
});


const ModifierSelector = ({
  modifiers, pending, error, onClick, disabled,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [editPath, setEditPath] = useState('');

  useEffect(() => {
    if (location.pathname.match(/^.*\/modifiers$/)) {
      setOpen(true);
    } else {
      setEditPath(`${location.pathname}/modifiers`);
      setOpen(false);
    }
  }, [location]);

  const handleOpen = useCallback(() => {
    history.push(editPath);
  }, [editPath, history]);

  const handleClose = useCallback(() => {
    history.goBack();
  }, [history]);

  const addModifier = useCallback((modifier) => {
    setOpen(false); // Close early to avoid 'jumping'
    handleClose();
    onClick(modifier);
  }, [handleClose, onClick]);

  if (pending) {
    return (
      <div className={classes.selector}>
        <Button
          startIcon={<Sync />}
          variant="contained"
          disabled
          fullWidth
          className={classes.button}
        >
          Loading Modifiers
        </Button>
      </div>
    );
  }
  if (error || !modifiers || !modifiers.length) {
    return null;
  }
  return (
    <div className={classes.selector}>
      {open && !mobile
        ? (
          <Button
            className={classes.button}
            fullWidth
            variant="contained"
            onClick={handleClose}
            startIcon={<Remove />}
            color="secondary"
            size={mobile ? 'large' : 'medium'}
          >
            Cancel
          </Button>
        )
        : (
          <Button
            className={classes.button}
            fullWidth
            variant="contained"
            onClick={handleOpen}
            startIcon={<Add />}
            color="primary"
            disabled={pending || disabled}
            size={mobile ? 'large' : 'medium'}
          >
            Add Modifier
          </Button>
        )}
      {mobile
        ? (
          <Route path={editPath}>
            <SelectorDialog open modifiers={modifiers} addModifier={addModifier} />
          </Route>
        )
        : (
          <Collapse in={open} timeout={{ enter: 200, exit: 0 }}>
            <div>
              {modifiers.map((modifier) => (
                <ModifierOption modifier={modifier} onClick={addModifier} key={modifier.id} />
              ))}
            </div>
          </Collapse>
        )}
    </div>
  );
};


const mapStateToProps = (state) => ({
  ...state.modifiers,
});

export default connect(mapStateToProps)(ModifierSelector);
