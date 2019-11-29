import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


const useStyles = makeStyles({
  field: {
    width: '8em',
    paddingRight: '1em',
    margin: '1em 1em 0 0',
    '&:last-child': {
      paddingRight: 0,
    },
  },
});


const FormField = ({
  label, value, onChange, className, startAdornment, endAdornment,
}) => {
  const classes = useStyles();
  const inputProps = {};
  if (startAdornment) {
    inputProps.startAdornment = <InputAdornment position="start">{startAdornment}</InputAdornment>;
  }
  if (endAdornment) {
    inputProps.endAdornment = <InputAdornment position="end">{endAdornment}</InputAdornment>;
  }

  return (
    <TextField
      className={clsx(classes.field, className)}
      variant="outlined"
      label={label}
      value={value}
      InputProps={inputProps}
      onChange={(event) => onChange(event.target.value)}
    />

  );
};


export default FormField;
