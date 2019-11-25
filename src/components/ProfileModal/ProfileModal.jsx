import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { editWeaponProfile } from 'actions/units.action';
import ModifierList from 'components/ModifierList';
import { fetchModifiers } from 'api';
import { bindActionCreators } from 'redux';
import Card from 'components/Card';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  profileModal: {
    margin: '30px',
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
  id, editWeaponProfile, unitId, profile, fetchModifiers, header, open, close,
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
    if (open) {
      fetchModifiers();
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
            <TextField className={classes.field} label="Number of models" value={num_models} onChange={(_, { value }) => setNumModels(value)} />
            <TextField className={classes.field} label="Attacks" value={attacks} onChange={(_, { value }) => setAttacks(value)} />
            <TextField className={classes.field} label="To Hit" value={to_hit} onChange={(_, { value }) => setToHit(value)} />
            <TextField className={classes.field} label="To Wound" value={to_wound} onChange={(_, { value }) => setToWound(value)} />
            <TextField className={classes.field} label="Rend" value={rend} onChange={(_, { value }) => setRend(value)} />
            <TextField className={classes.field} label="Damage" value={damage} onChange={(_, { value }) => setDamage(value)} />
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchModifiers, editWeaponProfile,
}, dispatch);


export default connect(null, mapDispatchToProps)(ProfileModal);
