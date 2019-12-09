import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import DiceInput from 'components/DiceInput';


const useStyles = makeStyles((theme) => ({
  field: {
  },
}));


const FormField = ({
  label, value, onChange, className, startAdornment, endAdornment, type,
}) => {
  const classes = useStyles();
  const inputProps = {};
  if (startAdornment) {
    inputProps.startAdornment = <InputAdornment position="start">{startAdornment}</InputAdornment>;
  }
  if (endAdornment) {
    inputProps.endAdornment = <InputAdornment position="end">{endAdornment}</InputAdornment>;
  }
  const error = (value == null || value === '');

  const FieldTypes = {
    number: TextField,
    roll: TextField,
    dice: DiceInput,
  };
  const Field = FieldTypes[type];

  return (
    <Field
      className={clsx(classes.field, className)}
      variant="outlined"
      type="number"
      label={label}
      value={value}
      error={error}
      helperText={error ? 'Required' : null}
      InputProps={inputProps}
      onChange={(event) => onChange(event.target.value)}
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
