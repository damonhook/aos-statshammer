import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  diceInput: {},
});

const DiceInput = ({
  label, value, onChange, className, required, ...other
}) => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const isDice = (val) => Boolean(String(val).match(/^[dD]\d+$/));
  const isValid = (val) => !Number.isNaN(Number(val)) || isDice(val);

  const setErrorState = (errMessage) => {
    setError(true);
    setErrorMessage(errMessage);
  };
  const clearErrorState = () => {
    setError(false);
    setErrorMessage(null);
  };

  const handleChange = (event) => {
    const val = event.target.value;
    if (required && (val == null || val === '')) setErrorState('Required');
    else if (!isValid(val)) setErrorState('Invalid Value/Dice');
    else clearErrorState();

    if (onChange) onChange(event);
  };

  return (
    <TextField
      label={label}
      value={value}
      className={clsx(classes.diceInput, className)}
      inputProps={{ inputMode: 'numeric' }}
      variant="outlined"
      error={Boolean(error)}
      helperText={error ? errorMessage : null}
      onChange={handleChange}
      {...other}
    />
  );
};

DiceInput.defaultProps = {
  label: null,
  value: undefined,
  onChange: null,
  className: null,
  required: false,
};

DiceInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  required: PropTypes.bool,
};

export default DiceInput;
