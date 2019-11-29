import React, { useState, useEffect } from 'react';
import {
  Modal, Button, Paper, Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { editWeaponProfile } from 'actions/units.action';
import ModifierList from 'components/ModifierList';
import { fetchModifiers } from 'api';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import FormField from './FormField';


const useStyles = makeStyles((theme) => ({
  profileModal: {
    margin: '30px auto',
    width: 'calc(100% - 30px)',
    maxWidth: '1024px',
    overflowY: 'scroll',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 0,
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '1366px',
    },
  },
  modalContent: {
    padding: '2em',
  },
  modalHeader: {
    paddingBottom: '1em',
  },
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
  actions: {
    margin: '0 0 0 auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginRight: '1em',
    '&:last-child': {
      marginRight: 0,
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


const ProfileModal = ({
  id, editWeaponProfile, unitId, profile, fetchModifiers, fetchedModifiers, header, open, close,
}) => {
  const classes = useStyles();

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
    <Modal
      open={open}
      className={classes.profileModal}
      onClose={() => close()}
    >
      <Paper square className={classes.modalContent}>
        <Typography component="h2" variant="h6" className={classes.modalHeader}>{header}</Typography>
        <Typography component="div">
          <form className={classes.form} onSubmit={() => submit()}>
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
        <div className={classes.actions}>
          <Button className={classes.actionButton} onClick={() => close()} color="secondary" variant="contained">Cancel</Button>
          <Button className={classes.actionButton} onClick={() => submit()} color="primary" variant="contained">Confirm</Button>
        </div>
      </Paper>
    </Modal>
  );
};

const mapStateToProps = (state) => ({ fetchedModifiers: state.modifiers.modifiers });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchModifiers, editWeaponProfile,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);
