import React, { useState, useEffect } from 'react';
import {
  Button, Typography, Dialog, DialogContent, useMediaQuery, DialogActions,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { editWeaponProfile } from 'actions/units.action';
import ModifierList from 'components/ModifierList';
import { fetchModifiers } from 'api';
import { bindActionCreators } from 'redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
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
    paddingRight: '1em',
    margin: '1em 1em 0 0',
    '&:last-child': {
      paddingRight: 0,
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

const ProfileDialog = ({
  id, editWeaponProfile, unitId, profile, fetchModifiers, fetchedModifiers, header, open, close,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [num_models, setNumModels] = useState(1);
  const [attacks, setAttacks] = useState(1);
  const [to_hit, setToHit] = useState(4);
  const [to_wound, setToWound] = useState(4);
  const [rend, setRend] = useState(0);
  const [damage, setDamage] = useState(0);
  const [modifiers, setModifiers] = useState([]);

  useEffect(() => {
    if (!fetchedModifiers || !fetchModifiers.length) {
      fetchModifiers();
    }
    if (open) {
      setNumModels(profile.num_models);
      setAttacks(profile.attacks);
      setToHit(profile.to_hit);
      setToWound(profile.to_wound);
      setRend(profile.rend);
      setDamage(profile.damage);
      setModifiers(profile.modifiers);
    }
  }, [open]);

  const getProfile = () => ({
    num_models, attacks, to_hit, to_wound, rend, damage, modifiers,
  });

  const submit = () => {
    const updatedProfile = { ...getProfile() };
    editWeaponProfile(id, updatedProfile, unitId);
    close();
  };

  if (!profile) return null;
  return (
    <Dialog
      open={open}
      className={classes.dialog}
      onClose={() => close()}
      fullWidth
      maxWidth="lg"
      fullScreen={fullScreen}
      scroll="paper"
    >
      <ProfileTitle header={header} fullScreen={fullScreen} onClose={() => close()} />
      <DialogContent dividers>
        <Typography component="div">
          <form className={classes.form} onSubmit={(e) => { submit(); e.preventDefault(); }}>
            <input type="submit" style={{ display: 'none' }} />
            <div className={classes.formSection}>
              <label>Characteristics:</label>
              <div className={clsx(classes.formSection, classes.characteristics)}>
                <FormField
                  className={classes.field}
                  label="Number of models"
                  value={num_models}
                  onChange={setNumModels}
                />
                <FormField
                  className={classes.field}
                  label="Attacks"
                  value={attacks}
                  onChange={setAttacks}
                />
                <FormField
                  className={classes.field}
                  endAdornment="+"
                  label="To Hit"
                  value={to_hit}
                  onChange={setToHit}
                />
                <FormField
                  className={classes.field}
                  endAdornment="+"
                  label="To Wound"
                  value={to_wound}
                  onChange={setToWound}
                />
                <FormField
                  className={classes.field}
                  startAdornment="-"
                  label="Rend"
                  value={rend}
                  onChange={setRend}
                />
                <FormField
                  className={classes.field}
                  label="Damage"
                  value={damage}
                  onChange={setDamage}
                />
              </div>
            </div>
            <div className={clsx(classes.formSection, classes.modifiers)}>
              <ModifierList modifiers={modifiers} setModifiers={setModifiers} tabIndex={-1} />
            </div>
          </form>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button className={classes.actionButton} onClick={() => close()} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button className={classes.actionButton} onClick={() => submit()} color="primary" variant="contained">
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
