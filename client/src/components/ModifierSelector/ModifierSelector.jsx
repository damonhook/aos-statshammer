import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Collapse } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import ModifierOption from './ModifierOption';

const useStyles = makeStyles({
  selector: { marginTop: '1em', marginBottom: '1em' },
  button: { justifyContent: 'left' },
});


const ModifierSelector = ({
  modifiers, pending, error, onClick, disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [editPath, setEditPath] = useState('');
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.match(/^.*\/modifiers$/)) {
      setOpen(true);
    } else {
      setEditPath(`${location.pathname}/modifiers`);
      setOpen(false);
    }
  }, [location]);

  const handleOpen = () => {
    history.push(editPath);
  };

  const handleClose = () => {
    history.goBack();
  };

  const addModifier = (modifier) => {
    setOpen(false); // Close early to avoid 'jumping'
    handleClose();
    onClick(modifier);
  };

  if (pending) {
    return (
      <div className={classes.selector}>
        <Button content="Add Modifier" disabled fullWidth />
      </div>
    );
  }
  if (error || !modifiers || !modifiers.length) {
    return null;
  }
  return (
    <div className={classes.selector}>
      {open
        ? (
          <Button
            className={classes.button}
            fullWidth
            variant="contained"
            onClick={handleClose}
            startIcon={<Remove />}
            color="secondary"
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
            disabled={disabled}
          >
            Add Modifier
          </Button>
        )}
      <Collapse in={open} timeout={{ enter: 200, exit: 0 }}>
        <div>
          {modifiers.map((modifier) => (
            <ModifierOption modifier={modifier} onClick={addModifier} key={modifier.id} />
          ))}
        </div>
      </Collapse>
    </div>
  );
};


const mapStateToProps = (state) => ({
  ...state.modifiers,
});

export default connect(mapStateToProps)(ModifierSelector);
