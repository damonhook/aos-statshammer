import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import _ from 'lodash';


const useStyles = makeStyles(() => ({
  field: {},
}));

const FormField = React.memo(({
  label, value, onChange, className, startAdornment, endAdornment, type, errorCallback,
}) => {
  const classes = useStyles();
  const [error, setError] = useState(false);

  const inputProps = {};
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

  const handleChange = useCallback((event) => {
    const val = event.target.value;
    setError(val == null || val === '');
    onChange(event);
  }, [onChange]);

  return (
    <TextField
      className={clsx(classes.field, className)}
      variant="filled"
      type="number"
      label={label}
      value={value}
      error={error}
      helperText={error ? 'Required' : null}
      InputProps={inputProps}
      onChange={handleChange}
    />

  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

FormField.defaultProps = {
  type: 'number',
};

FormField.propTypes = {
  type: PropTypes.oneOf(['number', 'dice', 'roll']),
};


export default FormField;
