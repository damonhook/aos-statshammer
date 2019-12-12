import React, {
  useEffect, useCallback, useReducer,
} from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress, Paper } from '@material-ui/core';
import ModifierSelector from 'components/ModifierSelector';
import ModifierItem from 'components/ModifierItem';
import { MAX_MODIFIERS } from 'appConstants';
import _ from 'lodash';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  modifierList: {
    flex: '1 1 auto',
    width: '100%',
  },
  activeModifiers: { marginTop: '1em' },
  activeModifierCard: {},
  loader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10em',
    width: 'auto',
  },
  loaderText: {
    marginTop: theme.spacing(2),
  },
}));

const errorReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      return [...state, action.err];
    case 'SET_ERROR':
      return state.map((err, index) => {
        if (index === action.index) return action.error;
        return err;
      });
    case 'REMOVE_ERROR':
      return state.filter((_, index) => index !== action.index);
    default:
      return state;
  }
};

const PendingModifiers = () => {
  const classes = useStyles();
  return (
    <Paper className={clsx(classes.activeModifiers, classes.loader)}>
      <CircularProgress />
      <Typography variant="h6" className={classes.loaderText}>Loading...</Typography>
    </Paper>
  );
};

const ModifierList = ({
  modifierState, modifiers, setModifiers, errorCallback,
}) => {
  const classes = useStyles();
  const [errors, dispatchErrors] = useReducer(errorReducer, []);

  useEffect(() => {
    if (errorCallback) {
      errorCallback(errors.some((e) => e));
    }
  }, [errors, errorCallback]);

  const addModifier = (modifier) => {
    const newModifier = {
      id: modifier.id,
      options: {},
    };
    Object.keys(modifier.options).forEach((k) => {
      newModifier.options[k] = {};
      newModifier.options[k].value = '';
      if (modifier.options[k].default != null) {
        newModifier.options[k].value = modifier.options[k].default;
      }
    });
    if (!modifiers || !modifiers.length) {
      setModifiers([newModifier]);
    } else {
      setModifiers([...modifiers, newModifier]);
    }
    dispatchErrors({ type: 'ADD_ERROR', error: false });
  };

  const removeModifier = (index) => {
    setModifiers(modifiers.filter((_, i) => i !== index));
    dispatchErrors({ type: 'REMOVE_ERROR', index });
  };

  const onOptionChange = (index, name, value) => {
    if (!modifiers) return;
    setModifiers(modifiers.map((modifier, i) => {
      if (i === index) {
        return {
          ...modifier,
          options: {
            ...modifier.options,
            [name]: {
              ...modifier.options[name],
              value,
            },
          },
        };
      }
      return modifier;
    }));
  };

  const getErrorCallback = useCallback(_.memoize((index) => (error) => {
    dispatchErrors({ type: 'SET_ERROR', index, error });
  }), []);

  return (
    <Typography component="div" className={classes.modifierList}>
      <label>Modifiers:</label>
      {modifierState.pending
        ? <PendingModifiers />
        : (
          <div className={classes.activeModifiers}>
            {(modifiers || []).map((modifier, index) => (
              <ModifierItem
                {...modifier}
                removeModifier={removeModifier}
                index={index}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                onOptionChange={onOptionChange}
                errorCallback={getErrorCallback(index)}
              />
            ))}
          </div>
        )}
      <ModifierSelector
        onClick={addModifier}
        disabled={modifiers && modifiers.length >= MAX_MODIFIERS}
      />
    </Typography>
  );
};

const mapStateToProps = (state) => ({
  modifierState: state.modifiers,
});

export default connect(mapStateToProps)(ModifierList);
