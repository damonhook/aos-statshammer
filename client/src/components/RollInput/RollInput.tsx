import { InputAdornment, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';

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
  variant?: 'filled' | 'outlined';
}

const RollInput = React.memo(
  ({
    label,
    value,
    onChange,
    className,
    required,
    allowOnes,
    startAdornment,
    endAdornment,
    errorCallback,
    fullWidth,
    variant = 'filled',
  }: IRollInputProps) => {
    const classes = useStyles();
    const [error, setError] = useState<string | undefined>(undefined);
    const min = allowOnes ? 1 : 2;
    const max = 6;

    const validator = useCallback(
      (value: string) => {
        let error: string | undefined;
        if (required && !value) {
          error = 'Required';
        } else if (Number(value) < min || Number(value) > max) {
          error = `Must be between ${min} and ${max}`;
        }
        return error;
      },
      [min, max, required],
    );

    const inputProps: { [name: string]: React.ReactNode } = { inputProps: { min, max } };
    if (startAdornment) {
      inputProps.startAdornment = <InputAdornment position="start">{startAdornment}</InputAdornment>;
    }
    if (endAdornment) {
      inputProps.endAdornment = <InputAdornment position="end">{endAdornment}</InputAdornment>;
    }

    const validate = useCallback(
      val => {
        setError(validator(val));
      },
      [validator],
    );

    useEffect(() => {
      if (value !== undefined) validate(value);
    }, [validate, value]);

    useEffect(() => {
      if (errorCallback) {
        errorCallback(Boolean(error));
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
      // @ts-ignore
      <TextField
        label={label}
        value={value}
        type="number"
        className={clsx(classes.rollInput, className)}
        variant={variant}
        error={Boolean(error)}
        helperText={error}
        onChange={handleChange}
        InputProps={inputProps}
        fullWidth={fullWidth}
      />
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default RollInput;
