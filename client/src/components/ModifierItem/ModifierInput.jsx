import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Checkbox, MenuItem, FormControlLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RollInput from 'components/RollInput';
import _ from 'lodash';
import DiceInput from 'components/DiceInput';

const useStyles = makeStyles(() => ({
  modifierInput: {
    marginRight: '1em',
    margin: '.5em 0',
    width: '100%',
  },
  choice: {},
}));

const ModifierInput = React.memo(({
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
              color="primary"
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
          variant="outlined"
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
            variant="outlined"
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
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

ModifierInput.defaultProps = {
  errorCallback: null,
};

ModifierInput.propTypes = {
  /** The index of the modifier item in the list of modifiers */
  index: PropTypes.number.isRequired,
  /** The name of the modifier option */
  name: PropTypes.string.isRequired,
  /** The option properties for the modifier definition */
  option: PropTypes.shape({
    type: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string),
    default: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    allowOnes: PropTypes.bool,
    allowDice: PropTypes.bool,
  }).isRequired,
  /** The current value of the option */
  val: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** A callback function to call when any of the option values are changed */
  onOptionChange: PropTypes.func.isRequired,
  /** An optional callback function used to pass back the error state of the modifier item */
  errorCallback: PropTypes.func,
};

export default ModifierInput;
