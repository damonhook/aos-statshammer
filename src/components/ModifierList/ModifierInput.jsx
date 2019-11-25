import React from 'react';
import { TextField, Checkbox, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  modifierInput: {
    marginRight: '1em',
    margin: '.5em 0',
    width: '100%',
  },
});

const ModifierInput = ({
  index, name, option, val, onOptionChange,
}) => {
  const classes = useStyles();
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
        <Checkbox
          toggle
          label={name}
          name={name}
          className={classes.modifierInput}
          value={val}
          onChange={(_, { value }) => onOptionChange(index, name, value)}
        />
      );
    default:
      return (
        <TextField
          label={name}
          name={name}
          className={classes.modifierInput}
          fullWidth
          variant="outlined"
          value={val}
          onChange={(_, { value }) => onOptionChange(index, name, value)}
        />
      );
  }
};

export default ModifierInput;
