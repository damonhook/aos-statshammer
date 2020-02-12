import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { isAndroid } from 'react-device-detect';

const useStyles = makeStyles({
  diceInput: {},
});

interface DiceInputProps {
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
const DiceInput: React.FC<DiceInputProps> = React.memo(
  ({ label, value, onChange, className, required, errorCallback, fullWidth, variant }) => {
    const classes = useStyles();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const isDice = useCallback(
      val =>
        Boolean(
          String(val)
            .replace(/\s/g, '')
            .match(/^(?:\d*[dD]?\d+)(?:[+-]\d*[dD]?\d+)*$/),
        ),
      [],
    );
    const isValid = useCallback(val => !Number.isNaN(Number(val)) || isDice(val), [isDice]);

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
        else if (!isValid(val)) setErrorState('Invalid Value/Dice');
        else clearErrorState();
      },
      [clearErrorState, isValid, required, setErrorState],
    );

    useEffect(() => {
      if (value !== undefined) validate(value);
    }, [value, required, validate]);

    useEffect(() => {
      if (errorCallback) {
        errorCallback(error);
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
        helperText={error ? errorMessage : null}
        onChange={handleChange}
        fullWidth={fullWidth}
      />
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

DiceInput.defaultProps = {
  required: false,
  fullWidth: false,
  variant: 'filled',
};

export default DiceInput;
