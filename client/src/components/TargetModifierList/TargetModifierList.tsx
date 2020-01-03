import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Delete, ArrowUpward, ArrowDownward } from '@material-ui/icons';
import ModifierSelector from 'components/ModifierSelector';
import ModifierItem from 'components/ModifierItem';
import _ from 'lodash';
import {
  addTargetModifier,
  removeTargetModifier,
  moveTargetModifier,
  editTargetModifierOption,
  editTargetModifierError,
} from 'actions/target.action';
import PendingModifiers from './PendingModifiers';
import { IModifierDefinition, IModifierInstance } from 'types/modifiers';
import { IStore } from 'types/store';

const useStyles = makeStyles(() => ({
  modifierList: {
    flex: '1 1 auto',
    width: '100%',
  },
  activeModifiers: {},
  activeModifierCard: {},
}));

interface ITargetModifierListProps {
  pending: boolean;
  definitions: IModifierDefinition[];
  error: boolean | string;
  activeModifiers: IModifierInstance[];
  addTargetModifier: any;
  removeTargetModifier: any;
  moveTargetModifier: any;
  editTargetModifierOption: any;
  editTargetModifierError: any;
}

const TargetModifierList: React.FC<ITargetModifierListProps> = React.memo(
  ({
    pending,
    definitions,
    error,
    activeModifiers,
    addTargetModifier,
    removeTargetModifier,
    moveTargetModifier,
    editTargetModifierOption,
    editTargetModifierError,
  }) => {
    const classes = useStyles();

    const getModifierById = id => definitions.find(mod => mod.id === id);

    const addModifier = useCallback(
      modifier => {
        const newModifier = { id: modifier.id, options: {} };
        Object.keys(modifier.options).forEach(k => {
          newModifier.options[k] = '';
          if (modifier.options[k].default != null) {
            newModifier.options[k] = modifier.options[k].default;
          }
        });
        addTargetModifier(newModifier);
      },
      [addTargetModifier],
    );

    const removeModifier = useCallback(
      index => {
        removeTargetModifier(index);
      },
      [removeTargetModifier],
    );

    const moveModifier = useCallback(
      (index, newIndex) => {
        moveTargetModifier(index, newIndex);
      },
      [moveTargetModifier],
    );

    const onOptionChange = useCallback(
      (index, name, value) => {
        editTargetModifierOption(index, name, value);
      },
      [editTargetModifierOption],
    );

    const getErrorCallback = useCallback(
      _.memoize((index: number) => (error: boolean) => {
        editTargetModifierError(index, error);
      }),
      [],
    );

    const moveUpEnabled = index => index > 0;
    const moveDownEnabled = index => index < (activeModifiers || []).length - 1;

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
                scrollEnabled={false}
              />
            ))}
          </div>
        )}
        <ModifierSelector modifiers={definitions} pending={pending} error={error} onClick={addModifier} />
      </Typography>
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

const mapStateToProps = (state: IStore) => ({
  pending: state.targetModifiers.pending,
  definitions: state.targetModifiers.modifiers,
  error: state.targetModifiers.error,
  activeModifiers: state.target.modifiers,
});

export default connect(mapStateToProps, {
  addTargetModifier,
  removeTargetModifier,
  moveTargetModifier,
  editTargetModifierOption,
  editTargetModifierError,
})(TargetModifierList);
