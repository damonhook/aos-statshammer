import React from 'react';
import {
  TextField, Checkbox, MenuItem, FormControlLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  modifierInput: {
    marginRight: '1em',
    margin: '.5em 0',
    width: '100%',
  },
  choice: {

  },
});

const ModifierInput = ({
  index, name, option, val, onOptionChange,
}) => {
  const classes = useStyles();
  const errorProps = !val ? { error: true, helperText: 'Required' } : {};

  switch (option.type) {
    case 'choice':
      return (
        <TextField
          select
          label={name}
          name={name}
          className={classes.modifierInput}
          fullWidth
          variant="outlined"
          value={val}
          {...errorProps}
          onChange={(event) => onOptionChange(index, name, event.target.value)}
        >
          {option.items.map((item) => (
            <MenuItem key={item} value={item}>
              { item }
            </MenuItem>
          ))}
        </TextField>
      );
    case 'boolean':
      return (
        <FormControlLabel
          control={(
            <Checkbox
              toggle
              name={name}
              className={classes.choice}
              checked={val}
              {...errorProps}
              onChange={(event) => onOptionChange(index, name, event.target.checked)}
            />
          )}
          label={name}
          labelPlacement="end"
        />
      );
    default:
      return (
        <TextField
          label={name}
          name={name}
          className={classes.modifierInput}
          fullWidth
          type="number"
          variant="outlined"
          value={val}
          {...errorProps}
          onChange={(event) => onOptionChange(index, name, event.target.value)}
        />
      );
  }
};

export default ModifierInput;