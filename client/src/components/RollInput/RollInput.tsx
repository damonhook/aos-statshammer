import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment } from '@material-ui/core';
import clsx from 'clsx';
import _ from 'lodash';

const useStyles = makeStyles({
  rollInput: {},
});

interface IRollInputProps {
  label: string;
  value?: number | string | null;
  onChange?: (event: any) => void;
  className?: string;
  required?: boolean;
  allowOnes?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  errorCallback?: (error: boolean) => void;
  fullWidth?: boolean;
}

const RollInput: React.FC<IRollInputProps> = React.memo(
  ({
    label,
    value,
    onChange,
    className,
    required = false,
    allowOnes = false,
    startAdornment,
    endAdornment,
    errorCallback,
    fullWidth = false,
  }) => {
    const classes = useStyles();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const min = allowOnes ? 1 : 2;
    const max = 6;

    const inputProps: { [name: string]: React.ReactNode } = {};
    if (startAdornment) {
      inputProps.startAdornment = <InputAdornment position="start">{startAdornment}</InputAdornment>;
    }
    if (endAdornment) {
      inputProps.endAdornment = <InputAdornment position="end">{endAdornment}</InputAdornment>;
    }

    const isValid = useCallback(val => Number(val) <= max && Number(val) >= min, [min, max]);

    const setErrorState = useCallback(errMessage => {
      setError(true);
      setErrorMessage(errMessage);
    }, []);

    const clearErrorState = useCallback(() => {
      setError(false);
      setErrorMessage(null);
    }, []);

    const validate = useCallback(
      val => {
        if (required && (val == null || val === '')) setErrorState('Required');
        else if (!isValid(val)) setErrorState(`Must be between ${min} and ${max}`);
        else clearErrorState();
      },
      [clearErrorState, isValid, min, required, setErrorState],
    );

    useEffect(() => {
      if (value !== undefined) validate(value);
    }, [validate, value]);

    useEffect(() => {
      if (errorCallback) {
        errorCallback(error);
      }
    }, [error, errorCallback]);

    const handleChange = useCallback(
      event => {
        const val = event.target.value;
        if (value === undefined) validate(val); // uncontrolled
        if (onChange) onChange(event);
      },
      [onChange, validate, value],
    );

    return (
      <TextField
        label={label}
        value={value}
        type="number"
        className={clsx(classes.rollInput, className)}
        variant="filled"
        error={Boolean(error)}
        helperText={error ? errorMessage : null}
        onChange={handleChange}
        InputProps={inputProps}
        fullWidth={fullWidth}
      />
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default RollInput;
