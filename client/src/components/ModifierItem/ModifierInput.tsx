import { Checkbox, FormControlLabel, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DiceInput from 'components/DiceInput';
import RollInput from 'components/RollInput';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import type { TOptionTypes, TOptionValue } from 'types/modifiers';

const useStyles = makeStyles(() => ({
  modifierInput: {
    marginRight: '1em',
    margin: '.5em 0',
    width: '100%',
  },
  choice: {},
}));

interface IModifierInputProps {
  index: number;
  name: string;
  option: TOptionTypes;
  val?: TOptionValue;
  onOptionChange?: (index: number, name: string, value: TOptionValue) => void;
  errorCallback: (error: boolean) => void;
}

const ModifierInput: React.FC<IModifierInputProps> = React.memo(
  ({ index, name, option, val, onOptionChange, errorCallback }) => {
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

    const handleChange = useCallback(
      (event) => {
        const { value } = event.target;
        setError(!value);
        if (onOptionChange) onOptionChange(index, name, value);
      },
      [index, name, onOptionChange],
    );

    const handleChecked = useCallback(
      (event) => {
        if (onOptionChange) onOptionChange(index, name, event.target.checked);
      },
      [index, name, onOptionChange],
    );

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
            control={
              <Checkbox
                name={name}
                className={classes.choice}
                checked={Boolean(val)}
                {...errorProps}
                onChange={handleChecked}
                color="primary"
              />
            }
            label={name}
            labelPlacement="end"
          />
        );
      case 'roll':
        return (
          <RollInput
            label={name}
            className={classes.modifierInput}
            fullWidth
            value={String(val)}
            onChange={handleChange}
            allowOnes={option.allowOnes}
            errorCallback={childErrorCallback}
            variant="outlined"
            required
          />
        );
      case 'number':
      default:
        return option.allowDice ? (
          <DiceInput
            label={name}
            className={classes.modifierInput}
            fullWidth
            value={String(val)}
            onChange={handleChange}
            errorCallback={childErrorCallback}
            variant="outlined"
            required
          />
        ) : (
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
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default ModifierInput;
