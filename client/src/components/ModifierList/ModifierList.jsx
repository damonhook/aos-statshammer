import React, {
  useEffect, useCallback, useReducer,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ModifierSelector from 'components/ModifierSelector';
import ModifierItem from 'components/ModifierItem';
import { MAX_MODIFIERS } from 'appConstants';
import _ from 'lodash';
import PendingModifiers from './PendingModifiers';
import errorReducer from './errorReducer';

const useStyles = makeStyles(() => ({
  modifierList: {
    flex: '1 1 auto',
    width: '100%',
  },
  activeModifiers: { marginTop: '1em' },
  activeModifierCard: {},
}));

/**
 * A component in charge of displaying the list of currently applied modifiers, as well as,
 * display the modifier selector
 */
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
    const newModifier = { id: modifier.id, options: {} };
    Object.keys(modifier.options).forEach((k) => {
      newModifier.options[k] = '';
      if (modifier.options[k].default != null) {
        newModifier.options[k] = modifier.options[k].default;
      }
    });
    if (!modifiers || !modifiers.length) setModifiers([newModifier]);
    else setModifiers([...modifiers, newModifier]);
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
            [name]: value,
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

ModifierList.defaultProps = {
  errorCallback: null,
};

ModifierList.propTypes = {
  /** The current modifiers state as in the store */
  modifierState: PropTypes.shape({
    pending: PropTypes.bool.isRequired,
    modifiers: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  /** A list of the currently applied modifiers */
  modifiers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.isRequired,
    options: PropTypes.object.isRequired,
  })).isRequired,
  /** A callback function to call when the modifiers list is changed */
  setModifiers: PropTypes.func.isRequired,
  /** A callback function to pass back the error state of the list of modifiers */
  errorCallback: PropTypes.func,
};

const mapStateToProps = (state) => ({
  modifierState: state.modifiers,
});

export default connect(mapStateToProps)(ModifierList);
