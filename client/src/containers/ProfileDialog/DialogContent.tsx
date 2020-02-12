import { DialogContent as Content, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import DiceInput from 'components/DiceInput';
import ModifierList from 'components/ModifierList';
import RollInput from 'components/RollInput';
import _ from 'lodash';
import React, { useCallback } from 'react';
import { IWeaponProfile } from 'types/unit';

import FormField from './FormField';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
    },
  },
  field: {
    width: '16em',
    margin: '1em 1em 0 0',

    [theme.breakpoints.down('md')]: {
      flex: '1 1 calc(33% - 50px)',
    },
    [theme.breakpoints.down('sm')]: {
      flex: '1 1 calc(50% - 50px)',
    },
  },
  formSection: {
    marginBottom: '1em',
    flexDirection: 'column',
    display: 'flex',
    flexWrap: 'wrap',
  },
  name: {
    marginBottom: theme.spacing(2),
  },
  characteristics: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'column',
    },
  },
  modifiers: {
    flex: 1,
  },
}));

interface IDialogContentProps {
  profile: IWeaponProfile;
  onChange: (name: string, value: any) => void;
  onSubmit: () => void;
  errorCallback: (name: string, error: boolean) => void;
  submitDisabled?: boolean;
  dispatchState?: any;
}

const DialogContent: React.FC<IDialogContentProps> = React.memo(
  ({ profile, onChange, onSubmit, errorCallback, submitDisabled = false, dispatchState }) => {
    const classes = useStyles();

    const getErrorCallback = useCallback(
      _.memoize((name: string) => (error: boolean) => {
        errorCallback(name, error);
      }),
      [],
    );

    const getHandler = useCallback(
      _.memoize((name: string) => (event: any) => {
        onChange(name, event.target.value);
      }),
      [],
    );

    return (
      <Content dividers>
        <Typography component="div">
          <form
            className={classes.form}
            onSubmit={e => {
              onSubmit();
              e.preventDefault();
            }}
          >
            <input type="submit" style={{ display: 'none' }} disabled={submitDisabled} />
            <TextField
              fullWidth
              label="Profile Name"
              variant="filled"
              className={classes.name}
              value={profile.name}
              onChange={getHandler('name')}
            />
            <div className={classes.formSection}>
              <label>Characteristics:</label>
              <div className={clsx(classes.formSection, classes.characteristics)}>
                <FormField
                  className={classes.field}
                  label="# Models"
                  value={profile.num_models}
                  onChange={getHandler('num_models')}
                  errorCallback={getErrorCallback('num_models')}
                  type="number"
                />
                <DiceInput
                  className={classes.field}
                  label="Attacks"
                  value={profile.attacks}
                  onChange={getHandler('attacks')}
                  errorCallback={getErrorCallback('attacks')}
                  required
                />
                <RollInput
                  className={classes.field}
                  endAdornment="+"
                  label="To Hit"
                  value={profile.to_hit}
                  onChange={getHandler('to_hit')}
                  errorCallback={getErrorCallback('to_hit')}
                />
                <RollInput
                  className={classes.field}
                  endAdornment="+"
                  label="To Wound"
                  value={profile.to_wound}
                  onChange={getHandler('to_wound')}
                  errorCallback={getErrorCallback('to_wound')}
                />
                <FormField
                  className={classes.field}
                  startAdornment="-"
                  label="Rend"
                  value={profile.rend}
                  onChange={getHandler('rend')}
                  errorCallback={getErrorCallback('to_wound')}
                />
                <DiceInput
                  className={classes.field}
                  label="Damage"
                  value={profile.damage}
                  onChange={getHandler('damage')}
                  errorCallback={getErrorCallback('damage')}
                  required
                />
              </div>
            </div>
            <div className={clsx(classes.formSection, classes.modifiers)}>
              <ModifierList
                modifiers={profile.modifiers}
                dispatchModifiers={dispatchState}
                errorCallback={getErrorCallback('modifiers')}
              />
            </div>
          </form>
        </Typography>
      </Content>
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default DialogContent;
