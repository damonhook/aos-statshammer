import React, { useCallback } from 'react';
import {
  Typography, DialogContent as Content,
} from '@material-ui/core';
import ModifierList from 'components/ModifierList';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import DiceInput from 'components/DiceInput';
import RollInput from 'components/RollInput';
import _ from 'lodash';
import FormField from './FormField';


const useStyles = makeStyles((theme) => ({
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

const DialogContent = ({
  profile, onChange, onSubmit, errorCallback, submitDisabled,
}) => {
  const classes = useStyles();

  const getErrorCallback = useCallback(_.memoize((name) => (error) => {
    errorCallback(name, error);
  }), []);

  return (
    <Content dividers>
      <Typography component="div">
        <form className={classes.form} onSubmit={(e) => { onSubmit(); e.preventDefault(); }}>
          <input type="submit" style={{ display: 'none' }} disabled={submitDisabled} />
          <div className={classes.formSection}>
            <label>Characteristics:</label>
            <div className={clsx(classes.formSection, classes.characteristics)}>
              <FormField
                className={classes.field}
                label="# Models"
                value={profile.num_models}
                onChange={(val) => onChange('num_models', val)}
                errorCallback={getErrorCallback('num_models')}
                type="number"
              />
              <DiceInput
                className={classes.field}
                label="Attacks"
                value={profile.attacks}
                onChange={(e) => onChange('attacks', e.target.value)}
                errorCallback={getErrorCallback('attacks')}
                required
              />
              <RollInput
                className={classes.field}
                endAdornment="+"
                label="To Hit"
                value={profile.to_hit}
                onChange={(e) => onChange('to_hit', e.target.value)}
                errorCallback={getErrorCallback('to_hit')}
              />
              <RollInput
                className={classes.field}
                endAdornment="+"
                label="To Wound"
                value={profile.to_wound}
                onChange={(e) => onChange('to_wound', e.target.value)}
                errorCallback={getErrorCallback('to_wound')}
              />
              <FormField
                className={classes.field}
                startAdornment="-"
                label="Rend"
                value={profile.rend}
                onChange={(val) => onChange('rend', val)}
                errorCallback={getErrorCallback('to_wound')}
              />
              <DiceInput
                className={classes.field}
                label="Damage"
                value={profile.damage}
                onChange={(e) => onChange('damage', e.target.value)}
                errorCallback={getErrorCallback('damage')}
                required
              />
            </div>
          </div>
          <div className={clsx(classes.formSection, classes.modifiers)}>
            <ModifierList
              modifiers={profile.modifiers}
              setModifiers={(val) => onChange('modifiers', val)}
              tabIndex={-1}
              errorCallback={getErrorCallback('modifiers')}
            />
          </div>
        </form>
      </Typography>
    </Content>
  );
};


export default DialogContent;
