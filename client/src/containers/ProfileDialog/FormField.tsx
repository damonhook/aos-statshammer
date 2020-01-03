import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import _ from 'lodash';

const useStyles = makeStyles(() => ({
  field: {},
}));

interface IFormFieldProps {
  label: string;
  value: any;
  onChange: (event: any) => void;
  className?: string;
  startAdornment?: string;
  endAdornment?: string;
  type?: 'number' | 'dice' | 'roll';
  errorCallback?: (error: boolean) => void;
}

const FormField: React.FC<IFormFieldProps> = React.memo(
  ({ label, value, onChange, className, startAdornment, endAdornment, type = 'number', errorCallback }) => {
    const classes = useStyles();
    const [error, setError] = useState(false);

    const inputProps: { [name: string]: React.ReactNode } = {};
    if (startAdornment) {
      inputProps.startAdornment = <InputAdornment position="start">{startAdornment}</InputAdornment>;
    }
    if (endAdornment) {
      inputProps.endAdornment = <InputAdornment position="end">{endAdornment}</InputAdornment>;
    }

    useEffect(() => {
      if (errorCallback) {
        errorCallback(error);
      }
    }, [error, errorCallback]);

    const handleChange = useCallback(
      event => {
        const val = event.target.value;
        setError(val == null || val === '');
        onChange(event);
      },
      [onChange],
    );

    return (
      <TextField
        className={clsx(classes.field, className)}
        variant="filled"
        type={type}
        label={label}
        value={value}
        error={error}
        helperText={error ? 'Required' : null}
        InputProps={inputProps}
        onChange={handleChange}
      />
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default FormField;
