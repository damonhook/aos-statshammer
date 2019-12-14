import React, {
  useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import clsx from 'clsx';
import _ from 'lodash';

const useStyles = makeStyles({
  diceInput: {},
});

/**
 * An input component that can either controlled or uncontrolled.
 * This input component contains validation for correct dice inputs (e.g: D3, or 3)
 */
const DiceInput = React.memo(({
  label, value, onChange, className, required, errorCallback, ...other
}) => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const isDice = useCallback((val) => (
    Boolean(String(val).replace(/\s/g, '').match(/^(?:\d*[dD]?\d+)(?:[+-]\d*[dD]?\d+)*$/))
  ), []);
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
      variant="filled"
      error={Boolean(error)}
      helperText={error ? errorMessage : null}
      onChange={handleChange}
      {...other}
    />
  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

DiceInput.defaultProps = {
  label: null,
  value: undefined,
  onChange: null,
  className: null,
  required: false,
  errorCallback: null,
};

DiceInput.propTypes = {
  /** The label to apply to the input */
  label: PropTypes.string,
  /** The value of the input for controlled components */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** An function callback to call when the value changes */
  onChange: PropTypes.func,
  /** Any additional classnames to apply to the component */
  className: PropTypes.string,
  /** Whether the field is required or not */
  required: PropTypes.bool,
  /** A callback function to call with the updated error state */
  errorCallback: PropTypes.func,
};

export default DiceInput;
