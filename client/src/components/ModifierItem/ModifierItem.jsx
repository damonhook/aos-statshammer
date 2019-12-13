import React, {
  useRef, useEffect, useCallback, useReducer,
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from 'components/ListItem';
import _ from 'lodash';
import { getModifierById } from 'utils/modifierHelpers';
import ModifierInput from './ModifierInput';
import ModifierDescription from './ModifierDescription';
import { errorReducer } from './reducers';

const useStyles = makeStyles((theme) => ({
  modifier: {
    background: theme.palette.background.nested,
  },
  modifierContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  modifierSettings: {
    justifyContent: 'space-between',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  modifierDescription: {
    color: theme.palette.text.secondary,
    marginBottom: '1em',
  },
}));


/**
 * A component representing a single modifier in the Profile Dialog
 */
const ModifierItem = ({
  index, id, options, removeModifier, onOptionChange, errorCallback,
}) => {
  const classes = useStyles();
  const itemRef = useRef(null);
  const [errors, dispatchErrors] = useReducer(errorReducer, {});
  const definition = getModifierById(id);

  useEffect(() => {
    if (itemRef.current) itemRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [index]);

  useEffect(() => {
    if (errorCallback) {
      errorCallback(Object.keys(errors).some((k) => errors[k]));
    }
  }, [errors, errorCallback]);

  const getErrorCallback = useCallback(_.memoize((name) => (error) => {
    dispatchErrors({ type: 'SET_ERROR', name, error });
  }), []);

  if (!definition) return null;

  return (
    <div ref={itemRef}>
      <ListItem
        className={classes.modifier}
        onDelete={() => removeModifier(index)}
        header={definition.name}
        collapsible
      >
        <div className={classes.modifierContent}>
          <ModifierDescription definition={definition} options={options} />
          {definition.options && Object.keys(definition.options).length
            ? (
              <div className={classes.modifierSettings}>
                {Object.keys(options).map((n) => (
                  <ModifierInput
                    index={index}
                    name={n}
                    option={definition.options[n]}
                    val={options[n]}
                    onOptionChange={onOptionChange}
                    key={n}
                    errorCallback={getErrorCallback(n)}
                  />
                ))}
              </div>
            )
            : null}
        </div>
      </ListItem>
    </div>
  );
};

ModifierItem.defaultProps = {
  errorCallback: null,
};

ModifierItem.propTypes = {
  /** The index of the modifier item in the list of modifiers */
  index: PropTypes.number.isRequired,
  /** The ID that corresponds with the modifier definition */
  id: PropTypes.string.isRequired,
  /** An object containing all of the option values */
  options: PropTypes.shape({ value: PropTypes.any }).isRequired,
  /** A callback function used to remove the modifier from the list */
  removeModifier: PropTypes.func.isRequired,
  /** A callback function to call when any of the option values are changed */
  onOptionChange: PropTypes.func.isRequired,
  /** An optional callback function used to pass back the error state of the modifier item */
  errorCallback: PropTypes.func,
};

export default ModifierItem;
