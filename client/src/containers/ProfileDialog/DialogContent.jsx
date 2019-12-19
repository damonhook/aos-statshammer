import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, DialogContent as Content, TextField,
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

const DialogContent = React.memo(({
  profile, onChange, onSubmit, errorCallback, submitDisabled, dispatchState,
}) => {
  const classes = useStyles();

  const getErrorCallback = useCallback(_.memoize((name) => (error) => {
    errorCallback(name, error);
  }), []);

  const getHandler = useCallback(_.memoize((name) => (event) => {
    onChange(name, event.target.value);
  }), []);

  const handleModifiersChange = (val) => onChange('modifiers', val);

  return (
    <Content dividers>
      <Typography component="div">
        <form className={classes.form} onSubmit={(e) => { onSubmit(); e.preventDefault(); }}>
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
              setModifiers={handleModifiersChange}
              dispatchModifiers={dispatchState}
              tabIndex={-1}
              errorCallback={getErrorCallback('modifiers')}
            />
          </div>
        </form>
      </Typography>
    </Content>
  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

DialogContent.defaultProps = {
  submitDisabled: false,
};

DialogContent.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    num_models: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    attacks: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    to_hit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    to_wound: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    rend: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    damage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    modifiers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorCallback: PropTypes.func.isRequired,
  submitDisabled: PropTypes.bool,
  dispatchState: PropTypes.func.isRequired,
};

export default DialogContent;
