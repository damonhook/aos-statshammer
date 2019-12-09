import React, { useState, useEffect } from 'react';
import {
  Button, Typography, Dialog, DialogContent, useMediaQuery, DialogActions,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { editWeaponProfile } from 'actions/weaponProfiles.action';
import ModifierList from 'components/ModifierList';
import { fetchModifiers } from 'api';
import { bindActionCreators } from 'redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import DiceInput from 'components/DiceInput';
import RollInput from 'components/RollInput';
import { useHistory } from 'react-router-dom';
import FormField from './FormField';
import ProfileTitle from './ProfileTitle';


const useStyles = makeStyles((theme) => ({
  dialog: {},
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
  actionButton: {},
}));

const ProfileDialog = ({
  id, editWeaponProfile, unitId, profile, fetchModifiers, fetchedModifiers, header, open,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const [num_models, setNumModels] = useState(1);
  const [attacks, setAttacks] = useState(1);
  const [to_hit, setToHit] = useState(4);
  const [to_wound, setToWound] = useState(4);
  const [rend, setRend] = useState(0);
  const [damage, setDamage] = useState(0);
  const [modifiers, setModifiers] = useState([]);

  const [errors, setErrors] = useState({
    num_models: false,
    attacks: false,
    to_hit: false,
    to_wound: false,
    rend: false,
    damage: false,
    modifiers: false,
  });

  useEffect(() => {
    if (open) {
      setNumModels(profile.num_models);
      setAttacks(profile.attacks);
      setToHit(profile.to_hit);
      setToWound(profile.to_wound);
      setRend(profile.rend);
      setDamage(profile.damage);
      setModifiers(profile.modifiers);
    }
  }, [open, profile]);

  useEffect(() => {
    if (!fetchedModifiers || !fetchedModifiers.length) {
      fetchModifiers();
    }
  }, [fetchedModifiers, fetchModifiers]);

  const getProfile = () => ({
    num_models, attacks, to_hit, to_wound, rend, damage, modifiers,
  });

  const onErrorCallback = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const submitDisabled = Object.keys(errors).some((k) => errors[k]);

  const handleClose = () => {
    history.goBack();
  };

  const submit = () => {
    const updatedProfile = { ...getProfile() };
    editWeaponProfile(id, updatedProfile, unitId);
    handleClose();
  };

  if (!profile) return null;
  return (
    <Dialog
      open={open}
      className={classes.dialog}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      fullScreen={mobile}
      scroll="paper"
    >
      <ProfileTitle header={header} fullScreen={mobile} onClose={handleClose} />
      <DialogContent dividers>
        <Typography component="div">
          <form className={classes.form} onSubmit={(e) => { submit(); e.preventDefault(); }}>
            <input type="submit" style={{ display: 'none' }} disabled={submitDisabled} />
            <div className={classes.formSection}>
              <label>Characteristics:</label>
              <div className={clsx(classes.formSection, classes.characteristics)}>
                <FormField
                  className={classes.field}
                  label="# Models"
                  value={num_models}
                  onChange={setNumModels}
                  errorCallback={(error) => onErrorCallback('num_models', error)}
                  type="number"
                />
                <DiceInput
                  className={classes.field}
                  label="Attacks"
                  value={attacks}
                  onChange={(e) => setAttacks(e.target.value)}
                  errorCallback={(error) => onErrorCallback('attacks', error)}
                  required
                />
                <RollInput
                  className={classes.field}
                  endAdornment="+"
                  label="To Hit"
                  value={to_hit}
                  onChange={(e) => setToHit(e.target.value)}
                  errorCallback={(error) => onErrorCallback('to_hit', error)}
                />
                <RollInput
                  className={classes.field}
                  endAdornment="+"
                  label="To Wound"
                  value={to_wound}
                  onChange={(e) => setToWound(e.target.value)}
                  errorCallback={(error) => onErrorCallback('to_wound', error)}
                />
                <FormField
                  className={classes.field}
                  startAdornment="-"
                  label="Rend"
                  value={rend}
                  onChange={setRend}
                />
                <DiceInput
                  className={classes.field}
                  label="Damage"
                  value={damage}
                  onChange={(e) => setDamage(e.target.value)}
                  errorCallback={(error) => onErrorCallback('damage', error)}
                  required
                />
              </div>
            </div>
            <div className={clsx(classes.formSection, classes.modifiers)}>
              <ModifierList
                modifiers={modifiers}
                setModifiers={setModifiers}
                tabIndex={-1}
                errorCallback={(error) => onErrorCallback('modifiers', error)}
              />
            </div>
          </form>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.actionButton}
          size={mobile ? 'large' : 'medium'}
          onClick={handleClose}
          color="secondary"
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          className={classes.actionButton}
          size={mobile ? 'large' : 'medium'}
          onClick={() => submit()}
          color="primary"
          variant="contained"
          disabled={submitDisabled}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({ fetchedModifiers: state.modifiers.modifiers });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchModifiers, editWeaponProfile,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ProfileDialog);
