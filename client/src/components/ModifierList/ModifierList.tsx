import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowDownward, ArrowUpward, Delete } from '@material-ui/icons';
import appConfig from 'appConfig';
import ModifierItem from 'components/ModifierItem';
import ModifierSelector from 'components/ModifierSelector';
import _ from 'lodash';
import React, { useCallback, useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { modifierByIdSelector, modifierItemsSelector } from 'store/selectors';
import { IModifierInstance } from 'types/modifiers';
import { IStore } from 'types/store';

import PendingModifiers from './PendingModifiers';
import { errorReducer } from './reducers';

const useStyles = makeStyles(() => ({
  modifierList: {
    flex: '1 1 auto',
    width: '100%',
  },
  activeModifiers: { marginTop: '1em' },
  activeModifierCard: {},
}));

interface IModifierListProps {
  modifiers?: IModifierInstance[];
  errorCallback: (error: boolean) => void;
  dispatchModifiers: (payload: any) => void;
}

/**
 * A component in charge of displaying the list of currently applied modifiers, as well as,
 * display the modifier selector
 */
const ModifierList: React.FC<IModifierListProps> = ({
  modifiers = [],
  errorCallback,
  dispatchModifiers,
}: IModifierListProps) => {
  const classes = useStyles();
  const definitions = useSelector(modifierItemsSelector);
  const [pending, error] = useSelector(
    (state: IStore) => [state.modifiers.pending, state.modifiers.error],
    _.isEqual,
  );
  const getModifierById = useSelector(modifierByIdSelector);

  const [errors, dispatchErrors] = useReducer(
    errorReducer,
    modifiers.map(() => false),
  );

  useEffect(() => {
    if (errorCallback) {
      errorCallback(errors.some(e => e));
    }
  }, [errors, errorCallback]);

  const addModifier = useCallback(
    modifier => {
      const newModifier = { id: modifier.id, options: {} };
      Object.keys(modifier.options).forEach(k => {
        newModifier.options[k] = '';
        if (modifier.options[k].default != null) {
          newModifier.options[k] = modifier.options[k].default;
        }
      });
      dispatchModifiers({ type: 'ADD_MODIFIER', modifier: newModifier });
      dispatchErrors({ type: 'ADD_ERROR', error: false });
    },
    [dispatchModifiers],
  );

  const removeModifier = useCallback(
    index => {
      dispatchModifiers({ type: 'REMOVE_MODIFIER', index });
      dispatchErrors({ type: 'REMOVE_ERROR', index });
    },
    [dispatchModifiers],
  );

  const moveModifier = useCallback(
    (index, newIndex) => {
      dispatchModifiers({ type: 'MOVE_MODIFIER', index, newIndex });
    },
    [dispatchModifiers],
  );

  const onOptionChange = useCallback(
    (index, name, value) => {
      dispatchModifiers({
        type: 'EDIT_MODIFIER_OPTION',
        index,
        name,
        value,
      });
    },
    [dispatchModifiers],
  );

  const getErrorCallback = useCallback(
    _.memoize((index: number) => (error: boolean) => {
      dispatchErrors({ type: 'SET_ERROR', index, error });
    }),
    [dispatchErrors],
  );

  const moveUpEnabled = (index: number) => index > 0;
  const moveDownEnabled = (index: number) => index < modifiers?.length - 1;

  return (
    <Typography component="div" className={classes.modifierList}>
      <label>Modifiers:</label>
      {pending ? (
        <PendingModifiers />
      ) : (
        <div className={classes.activeModifiers}>
          {(modifiers ?? []).map((modifier, index) => (
            <ModifierItem
              definition={getModifierById(modifier.id)}
              options={modifier.options}
              actions={[
                {
                  name: 'Move Up',
                  onClick: () => moveModifier(index, index - 1),
                  icon: <ArrowUpward />,
                  disabled: !moveUpEnabled(index),
                },
                {
                  name: 'Move Down',
                  onClick: () => moveModifier(index, index + 1),
                  icon: <ArrowDownward />,
                  disabled: !moveDownEnabled(index),
                },
                { name: 'Delete', onClick: () => removeModifier(index), icon: <Delete /> },
              ]}
              index={index}
              key={modifier.uuid}
              onOptionChange={onOptionChange}
              errorCallback={getErrorCallback(index)}
              nested
            />
          ))}
        </div>
      )}
      <ModifierSelector
        modifiers={definitions}
        pending={pending}
        error={error}
        onClick={addModifier}
        disabled={modifiers && modifiers.length >= appConfig.limits.modifiers}
        nested
      />
    </Typography>
  );
};

export default ModifierList;
