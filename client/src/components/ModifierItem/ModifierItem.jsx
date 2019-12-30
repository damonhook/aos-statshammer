import React, {
  useRef, useEffect, useCallback, useReducer,
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from 'components/ListItem';
import _ from 'lodash';
import { scrollToRef } from 'utils/scrollIntoView';
import clsx from 'clsx';
import ModifierInput from './ModifierInput';
import ModifierDescription from './ModifierDescription';
import { errorReducer } from './reducers';

const useStyles = makeStyles((theme) => ({
  modifier: {
    background: theme.palette.background.paper,
  },
  nested: {
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
const ModifierItem = React.memo(({
  index, definition, options, actions, onOptionChange, errorCallback, nested, scrollEnabled,
}) => {
  const classes = useStyles();
  const itemRef = useRef(null);
  const [errors, dispatchErrors] = useReducer(errorReducer, {});

  useEffect(() => {
    if (scrollEnabled) scrollToRef(itemRef);
  }, [index, scrollEnabled]);

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
        className={clsx(classes.modifier, { [classes.nested]: nested })}
        primaryItems={actions}
        header={definition.name}
        collapsible
      >
        <div className={classes.modifierContent}>
          <ModifierDescription definition={definition} options={options} />
          {definition.options && Object.keys(definition.options).length
            ? (
              <div className={classes.modifierSettings}>
                {Object.keys(definition.options).map((n) => (
                  <ModifierInput
                    index={index}
                    name={n}
                    option={definition.options[n]}
                    val={options[n] != null ? options[n] : ''}
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
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

ModifierItem.defaultProps = {
  actions: null,
  errorCallback: null,
  nested: false,
  scrollEnabled: true,
};

ModifierItem.propTypes = {
  /** The index of the modifier item in the list of modifiers */
  index: PropTypes.number.isRequired,
  /** An object containing all of the option values */
  options: PropTypes.shape({ value: PropTypes.any }).isRequired,
  /** A list of actions that can be performed on the item (displayed in the header) */
  actions: PropTypes.arrayOf(PropTypes.object),
  /** A callback function to call when any of the option values are changed */
  onOptionChange: PropTypes.func.isRequired,
  /** An optional callback function used to pass back the error state of the modifier item */
  errorCallback: PropTypes.func,
  nested: PropTypes.bool,
  scrollEnabled: PropTypes.bool,
};

export default ModifierItem;
