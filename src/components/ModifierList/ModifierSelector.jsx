import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Collapse } from '@material-ui/core';
import { Add, Cancel } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import ModifierOption from './ModifierOption';

const useStyles = makeStyles({
  selector: { marginTop: '1em', marginBottom: '1em' },
});


const ModifierSelector = ({
  modifiers, pending, error, onClick,
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const addModifier = (modifier) => {
    onClick(modifier);
  };

  if (pending) {
    return (
      <div className={classes.selector}>
        <Button content="Add Modifier" disabled fullwidth />
      </div>
    );
  }
  if (error || !modifiers || !modifiers.length) {
    return null;
  }
  return (
    <div className={classes.selector}>
      {open
        ? <Button fullWidth variant="contained" onClick={() => setOpen(false)} startIcon={<Cancel />}>Cancel</Button>
        : <Button fullWidth variant="contained" onClick={() => setOpen(true)} startIcon={<Add />}>Add Modifier</Button>}
      <Collapse in={open}>
        <div>
          {modifiers.map((modifier) => (
            <ModifierOption modifier={modifier} onClick={addModifier} />
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
