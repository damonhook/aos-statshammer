import React, { useEffect } from 'react';
import {
  Typography, DialogContent as Content,
} from '@material-ui/core';
import { connect } from 'react-redux';
import ModifierList from 'components/ModifierList';
import { fetchModifiers } from 'api';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import DiceInput from 'components/DiceInput';
import RollInput from 'components/RollInput';
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
    flex: 0,
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
  profile, onChange, onSubmit, errorCallback, fetchedModifiers, fetchModifiers, submitDisabled,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (!fetchedModifiers || !fetchedModifiers.length) {
      fetchModifiers();
    }
  }, [fetchedModifiers, fetchModifiers]);

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
                errorCallback={(error) => errorCallback('num_models', error)}
                type="number"
              />
              <DiceInput
                className={classes.field}
                label="Attacks"
                value={profile.attacks}
                onChange={(e) => onChange('attacks', e.target.value)}
                errorCallback={(error) => errorCallback('attacks', error)}
                required
              />
              <RollInput
                className={classes.field}
                endAdornment="+"
                label="To Hit"
                value={profile.to_hit}
                onChange={(e) => onChange('to_hit', e.target.value)}
                errorCallback={(error) => errorCallback('to_hit', error)}
              />
              <RollInput
                className={classes.field}
                endAdornment="+"
                label="To Wound"
                value={profile.to_wound}
                onChange={(e) => onChange('to_wound', e.target.value)}
                errorCallback={(error) => errorCallback('to_wound', error)}
              />
              <FormField
                className={classes.field}
                startAdornment="-"
                label="Rend"
                value={profile.rend}
                onChange={(val) => onChange('rend', val)}
              />
              <DiceInput
                className={classes.field}
                label="Damage"
                value={profile.damage}
                onChange={(e) => onChange('damage', e.target.value)}
                errorCallback={(error) => errorCallback('damage', error)}
                required
              />
            </div>
          </div>
          <div className={clsx(classes.formSection, classes.modifiers)}>
            <ModifierList
              modifiers={profile.modifiers}
              setModifiers={(val) => onChange('modifiers', val)}
              tabIndex={-1}
              errorCallback={(error) => errorCallback('modifiers', error)}
            />
          </div>
        </form>
      </Typography>
    </Content>
  );
};

const mapStateToProps = (state) => ({ fetchedModifiers: state.modifiers.modifiers });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchModifiers,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(DialogContent);
