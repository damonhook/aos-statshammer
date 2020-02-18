import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { isAndroid } from 'react-device-detect';

const useStyles = makeStyles({
  diceInput: {},
});

interface IDiceInputProps {
  label: string;
  value?: number | string | null;
  onChange?: (event: any) => void;
  className?: string;
  required: boolean;
  errorCallback?: (error: boolean) => void;
  fullWidth?: boolean;
  variant?: 'filled' | 'outlined';
}

/**
 * An input component that can either controlled or uncontrolled.
 * This input component contains validation for correct dice inputs (e.g: D3, or 3)
 */
const DiceInput = React.memo(
  ({
    label,
    value,
    onChange,
    className,
    required,
    errorCallback,
    fullWidth,
    variant = 'filled',
  }: IDiceInputProps) => {
    const classes = useStyles();
    const [error, setError] = useState<string | undefined>(undefined);

    const validator = useCallback(
      (value: string) => {
        let error: string | undefined;
        const diceValuePattern = /^(?:\d*[dD]?\d+)(?:[+-]\d*[dD]?\d+)*$/;
        if (required && !value) {
          error = 'Required';
        } else if (diceValuePattern.test(String(value).replace(/\s/g, ''))) {
          error = 'Invalid Value/Dice';
        }
        return error;
      },
      [required],
    );

    const validate = useCallback(
      val => {
        setError(validator(val));
      },
      [validator],
    );

    useEffect(() => {
      if (value !== undefined) validate(value);
    }, [value, required, validate]);

    useEffect(() => {
      if (errorCallback) {
        errorCallback(Boolean(error));
      }
    }, [error, errorCallback]);

    const handleChange = useCallback(
      event => {
        const val = event.target.value;
        validate(val);
        if (onChange) onChange(event);
      },
      [validate, onChange],
    );

    return (
      // @ts-ignore
      <TextField
        label={label}
        value={value}
        className={clsx(classes.diceInput, className)}
        inputProps={isAndroid ? { inputMode: 'numeric' } : {}}
        variant={variant}
        error={Boolean(error)}
        helperText={error}
        onChange={handleChange}
        fullWidth={fullWidth}
      />
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default DiceInput;
