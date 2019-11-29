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
import FormField from './FormField';


const useStyles = makeStyles({
  profileModal: {
    margin: '30px auto',
    width: 'calc(100% - 30px)',
    maxWidth: '1024px',
    overflowY: 'scroll',
  },
  modalContent: {
    padding: '2em',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
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
  },
  actionButton: {
    marginRight: '1em',
    '&:last-child': {
      marginRight: 0,
    },
  },
});


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
      <Paper className={classes.modalContent}>
        <Typography component="h2" variant="h6">{header}</Typography>
        <Typography component="div">
          <form className={classes.form} onSubmit={() => submit()}>
            <input type="submit" style={{ display: 'none' }} />
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
            <ModifierList modifiers={modifiers} setModifiers={setModifiers} tabIndex={-1} />
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
