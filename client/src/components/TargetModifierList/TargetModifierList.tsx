import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowDownward, ArrowUpward, Delete } from '@material-ui/icons';
import ModifierItem from 'components/ModifierItem';
import ModifierSelector from 'components/ModifierSelector';
import _ from 'lodash';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  targetAppliedModifiersSelector,
  targetModifierByIdSelector,
  targetModifiersSelector,
} from 'store/selectors';
import { targetStore } from 'store/slices';

import type { TOptionValue } from '../../types/modifiers';
import PendingModifiers from './PendingModifiers';

const useStyles = makeStyles(() => ({
  modifierList: {
    flex: '1 1 auto',
    width: '100%',
  },
  activeModifiers: {},
  activeModifierCard: {},
}));

const TargetModifierList = () => {
  const classes = useStyles();
  const modifiersState = useSelector(targetModifiersSelector);
  const { pending, items: definitions, error } = modifiersState;
  const getModifierById = useSelector(targetModifierByIdSelector);
  const activeModifiers = useSelector(targetAppliedModifiersSelector);
  const dispatch = useDispatch();

  const addModifier = useCallback(
    (modifier) => {
      const newModifier = { id: modifier.id, options: {} };
      Object.keys(modifier.options).forEach((k) => {
        newModifier.options[k] = '';
        if (modifier.options[k].default != null) {
          newModifier.options[k] = modifier.options[k].default;
        }
      });
      dispatch(targetStore.actions.addTargetModifier({ modifier: newModifier }));
    },
    [dispatch],
  );

  const removeModifier = useCallback(
    (index: number) => {
      dispatch(targetStore.actions.removeTargetModifier({ index }));
    },
    [dispatch],
  );

  const moveModifier = useCallback(
    (index: number, newIndex: number) => {
      dispatch(targetStore.actions.moveTargetModifier({ index, newIndex }));
    },
    [dispatch],
  );

  const onOptionChange = useCallback(
    (index: number, name: string, value: TOptionValue) => {
      dispatch(targetStore.actions.editTargetModifierOption({ index, name, value }));
    },
    [dispatch],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getErrorCallback = useCallback(
    _.memoize((index: number) => (error: boolean) => {
      dispatch(targetStore.actions.editTargetModifierError({ index, error }));
    }),
    [dispatch],
  );

  const onActiveToggle = useCallback(
    (index: number) => {
      dispatch(targetStore.actions.toggleModifierActive({ index }));
    },
    [dispatch],
  );

  const moveUpEnabled = (index: number) => index > 0;
  const moveDownEnabled = (index: number) => index < (activeModifiers || []).length - 1;

  return (
    <Typography component="div" className={classes.modifierList}>
      {pending ? (
        <PendingModifiers />
      ) : (
        <div className={classes.activeModifiers}>
          {(activeModifiers || []).map((modifier, index) => (
            <ModifierItem
              definition={getModifierById(modifier.id)}
              options={modifier.options}
              active={modifier.active}
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
              onActiveToggle={onActiveToggle}
              errorCallback={getErrorCallback(index)}
              scrollEnabled={false}
            />
          ))}
        </div>
      )}
      <ModifierSelector modifiers={definitions} pending={pending} error={error} onClick={addModifier} />
    </Typography>
  );
};

export default TargetModifierList;
