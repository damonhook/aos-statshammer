import React, {
  useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  diceInput: {},
});

const DiceInput = ({
  label, value, onChange, className, required, errorCallback, ...other
}) => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const isDice = useCallback((val) => Boolean(String(val).match(/^[dD]\d+$/)), []);
  const isValid = useCallback((val) => !Number.isNaN(Number(val)) || isDice(val), [isDice]);

  const setErrorState = useCallback((errMessage) => {
    setError(true);
    setErrorMessage(errMessage);
  }, []);

  const clearErrorState = useCallback(() => {
    setError(false);
    setErrorMessage(null);
  }, []);

  const validate = useCallback((val) => {
    if (required && (val == null || val === '')) setErrorState('Required');
    else if (!isValid(val)) setErrorState('Invalid Value/Dice');
    else clearErrorState();
  }, [clearErrorState, isValid, required, setErrorState]);

  useEffect(() => {
    if (value !== undefined) validate(value);
  }, [value, validate]);

  useEffect(() => {
    if (errorCallback) {
      errorCallback(error);
    }
  }, [error, errorCallback]);

  const handleChange = useCallback((event) => {
    const val = event.target.value;
    if (value === undefined) validate(val); // If uncontrolled
    if (onChange) onChange(event);
  }, [value, validate, onChange]);

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
  errorCallback: null,
};

DiceInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  className: PropTypes.string,
  required: PropTypes.bool,
  errorCallback: PropTypes.func,
};

export default DiceInput;
