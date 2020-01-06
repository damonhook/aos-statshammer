import React, { useRef, useEffect, useCallback, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from 'components/ListItem';
import _ from 'lodash';
import { scrollToRef } from 'utils/scrollIntoView';
import clsx from 'clsx';
import ModifierInput from './ModifierInput';
import ModifierDescription from './ModifierDescription';
import { errorReducer } from './reducers';
import { IModifierDefinition, TModifierInstanceOptions, TOptionValue } from 'types/modifiers';
import { IPrimaryItem } from 'components/ListControls/types';

const useStyles = makeStyles(theme => ({
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

interface IModifierItemProps {
  index: number;
  definition?: IModifierDefinition;
  options: TModifierInstanceOptions;
  actions?: IPrimaryItem[];
  onOptionChange?: (index: number, name: string, value: TOptionValue) => void;
  errorCallback?: (error: boolean) => void;
  nested?: boolean;
  scrollEnabled?: boolean;
}

/**
 * A component representing a single modifier in the Profile Dialog
 */
const ModifierItem: React.FC<IModifierItemProps> = React.memo(
  ({ index, definition, options, actions, onOptionChange, errorCallback, nested, scrollEnabled }) => {
    const classes = useStyles();
    const itemRef = useRef(null);
    const [errors, dispatchErrors] = useReducer(errorReducer, {});

    useEffect(() => {
      if (scrollEnabled) scrollToRef(itemRef);
    }, [index, scrollEnabled]);

    useEffect(() => {
      if (errorCallback) {
        errorCallback(Object.keys(errors).some(k => errors[k]));
      }
    }, [errors, errorCallback]);

    const getErrorCallback = useCallback(
      // @ts-ignore
      _.memoize(name => error => {
        dispatchErrors({ type: 'SET_ERROR', name, error });
      }),
      [],
    );

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
            {definition.options && Object.keys(definition.options).length ? (
              <div className={classes.modifierSettings}>
                {Object.keys(definition.options).map(n => (
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
            ) : null}
          </div>
        </ListItem>
      </div>
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

ModifierItem.defaultProps = {
  nested: false,
  scrollEnabled: true,
};

export default ModifierItem;
