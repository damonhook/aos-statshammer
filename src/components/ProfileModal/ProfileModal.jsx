import React, { useState, useEffect } from 'react';
import {
  Modal, TextField, Button, InputAdornment,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { editWeaponProfile } from 'actions/units.action';
import ModifierList from 'components/ModifierList';
import { fetchModifiers } from 'api';
import { bindActionCreators } from 'redux';
import Card from 'components/Card';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  profileModal: {
    margin: '30px auto',
    width: 'calc(100% - 30px)',
    maxWidth: '1500px',
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
    if (!fetchedModifiers || fetchModifiers === []) {
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
      <Card className={classes.modalContent}>
        <h2>{header}</h2>
        <div>
          <form className={classes.form} onSubmit={() => submit()}>
            <input type="submit" style={{ display: 'none' }} />
            <TextField
              className={classes.field}
              variant="outlined"
              label="Number of models"
              value={num_models}
              onChange={(event) => setNumModels(event.target.value)}
            />
            <TextField
              className={classes.field}
              variant="outlined"
              label="Attacks"
              value={attacks}
              onChange={(event) => setAttacks(event.target.value)}
            />
            <TextField
              className={classes.field}
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">+</InputAdornment>,
              }}
              label="To Hit"
              value={to_hit}
              onChange={(event) => setToHit(event.target.value)}
            />
            <TextField
              className={classes.field}
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">+</InputAdornment>,
              }}
              label="To Wound"
              value={to_wound}
              onChange={(event) => setToWound(event.target.value)}
            />
            <TextField
              className={classes.field}
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">-</InputAdornment>,
              }}
              label="Rend"
              value={rend}
              onChange={(event) => setRend(event.target.value)}
            />
            <TextField
              className={classes.field}
              variant="outlined"
              label="Damage"
              value={damage}
              onChange={(event) => setDamage(event.target.value)}
            />
            <ModifierList modifiers={modifiers} setModifiers={setModifiers} tabIndex={-1} />
          </form>
        </div>
        <div className={classes.actions}>
          <Button className={classes.actionButton} onClick={() => close()} color="secondary" variant="contained">Cancel</Button>
          <Button className={classes.actionButton} onClick={() => submit()} color="primary" variant="contained">Confirm</Button>
        </div>
      </Card>
    </Modal>
  );
};

const mapStateToProps = (state) => ({ fetchedModifiers: state.modifiers.modifiers });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchModifiers, editWeaponProfile,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);
