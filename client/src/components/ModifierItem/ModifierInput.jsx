import React, { useState, useEffect, useCallback } from 'react';
import {
  TextField, Checkbox, MenuItem, FormControlLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RollInput from 'components/RollInput';
import DiceInput from 'components/DiceInput';

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
  index, name, option, val, onOptionChange, errorCallback,
}) => {
  const classes = useStyles();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (errorCallback) {
      errorCallback(error);
    }
  }, [error, errorCallback]);

  useEffect(() => {
    if (val !== undefined && option.type !== 'boolean') setError(!val);
  }, [val, option]);

  const handleChange = useCallback((event) => {
    const { value } = event.target;
    setError(!value);
    onOptionChange(index, name, value);
  }, [index, name, onOptionChange]);

  const handleChecked = useCallback((event) => {
    onOptionChange(index, name, event.target.checked);
  }, [index, name, onOptionChange]);

  const childErrorCallback = useCallback((error) => {
    setError(error);
  }, []);

  const errorProps = error ? { error: true, helperText: 'Required' } : {};

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
          onChange={handleChange}
        >
          {option.items.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      );
    case 'boolean':
      return (
        <FormControlLabel
          control={(
            <Checkbox
              name={name}
              className={classes.choice}
              checked={val}
              {...errorProps}
              onChange={handleChecked}
            />
          )}
          label={name}
          labelPlacement="end"
        />
      );
    case 'roll':
      return (
        <RollInput
          label={name}
          name={name}
          className={classes.modifierInput}
          fullWidth
          value={val}
          onChange={(event) => onOptionChange(index, name, event.target.value)}
          allowOnes={option.allowOnes}
          errorCallback={childErrorCallback}
          required
        />
      );
    case 'number':
    default:
      return option.allowDice
        ? (
          <DiceInput
            label={name}
            name={name}
            className={classes.modifierInput}
            fullWidth
            value={val}
            onChange={(event) => onOptionChange(index, name, event.target.value)}
            errorCallback={childErrorCallback}
            required
          />
        )
        : (
          <TextField
            label={name}
            name={name}
            className={classes.modifierInput}
            fullWidth
            type="number"
            variant="outlined"
            value={val}
            {...errorProps}
            onChange={handleChange}
          />
        );
  }
};

export default ModifierInput;
