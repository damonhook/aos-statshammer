import { Grid, Switch } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import type { IPrimaryItem } from 'components/ListControls/types';
import ListItem from 'components/ListItem';
import _ from 'lodash';
import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import type { IModifierDefinition, TModifierInstanceOptions, TOptionValue } from 'types/modifiers';
import { scrollToRef } from 'utils/scrollIntoView';

import ModifierDescription from './ModifierDescription';
import ModifierInput from './ModifierInput';
import { errorReducer } from './reducers';

const useStyles = makeStyles((theme: Theme) => ({
  modifier: {
    background: theme.palette.background.paper,
  },
  nested: {
    background: theme.palette.background.nested,
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
  modifierContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  modifierSettings: {
    marginTop: theme.spacing(1),
    justifyContent: 'space-between',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  modifierDescription: {
    color: theme.palette.text.secondary,
  },
}));

interface IModifierItemProps {
  index: number;
  definition?: IModifierDefinition;
  options: TModifierInstanceOptions;
  active?: boolean;
  actions?: IPrimaryItem[];
  onOptionChange?: (index: number, name: string, value: TOptionValue) => void;
  onActiveToggle?: (index: number) => void;
  errorCallback?: (error: boolean) => void;
  nested?: boolean;
  scrollEnabled?: boolean;
}

/**
 * A component representing a single modifier in the Profile Dialog
 */
const ModifierItem = React.memo(
  ({
    index,
    definition,
    active = true,
    options,
    actions,
    onOptionChange,
    onActiveToggle,
    errorCallback,
    nested,
    scrollEnabled = true,
  }: IModifierItemProps) => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getErrorCallback = useCallback(
      _.memoize((name: string) => (error: boolean) => {
        dispatchErrors({ type: 'SET_ERROR', name, error });
      }),
      [],
    );

    const handleActiveChanged = () => {
      if (onActiveToggle) onActiveToggle(index);
    };

    if (!definition) return null;

    return (
      <div ref={itemRef}>
        <ListItem
          className={clsx(classes.modifier, { [classes.nested]: nested, [classes.disabled]: !active })}
          primaryItems={actions}
          header={definition.name}
          collapsible
        >
          <div className={classes.modifierContent}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Switch checked={active} onChange={handleActiveChanged} />
              </Grid>
              <Grid item>
                <ModifierDescription definition={definition} options={options} />
              </Grid>
            </Grid>
            {definition.options && Object.keys(definition.options).length ? (
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
            ) : null}
          </div>
        </ListItem>
      </div>
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default ModifierItem;
