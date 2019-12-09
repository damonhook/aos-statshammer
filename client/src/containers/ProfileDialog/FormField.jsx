import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


const useStyles = makeStyles(() => ({
  field: {},
}));


const FormField = ({
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
  }, [error]);

  const handleChange = (event) => {
    const val = event.target.value;
    setError(val == null || val === '');
    onChange(val);
  };

  return (
    <TextField
      className={clsx(classes.field, className)}
      variant="outlined"
      type="number"
      label={label}
      value={value}
      error={error}
      helperText={error ? 'Required' : null}
      InputProps={inputProps}
      onChange={handleChange}
    />

  );
};

FormField.defaultProps = {
  type: 'number',
};

FormField.propTypes = {
  type: PropTypes.oneOf(['number', 'dice', 'roll']),
};


export default FormField;
