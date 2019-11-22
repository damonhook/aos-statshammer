import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { editWeaponProfile } from 'actions/units.action';
import ModifierList from 'components/ModifierList';
import { fetchModifiers } from 'api';
import { bindActionCreators } from 'redux';
import './index.scss';


const ProfileModal = ({
  id, editWeaponProfile, unitId, profile, fetchModifiers, header, open, close,
}) => {
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
    <span>
      <Modal
        open={open}
        className="profile-modal"
        onClose={() => close()}
        centered={false}
      >
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content scrolling>
          <Form onSubmit={() => submit()}>
            <input type="submit" style={{ display: 'none' }} />
            <Form.Input focus type="number" label="Number of models" value={num_models} onChange={(_, { value }) => setNumModels(value)} />
            <Form.Input type="number" label="Attacks" value={attacks} onChange={(_, { value }) => setAttacks(value)} />
            <Form.Input type="number" label="To Hit" value={to_hit} onChange={(_, { value }) => setToHit(value)} />
            <Form.Input type="number" label="To Wound" value={to_wound} onChange={(_, { value }) => setToWound(value)} />
            <Form.Input type="number" label="Rend" value={rend} onChange={(_, { value }) => setRend(value)} />
            <Form.Input label="Damage" value={damage} onChange={(_, { value }) => setDamage(value)} />
            <ModifierList modifiers={modifiers} setModifiers={setModifiers} tabIndex={-1} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button content="Cancel" negative onClick={() => close()} />
          <Button content="Confirm" positive onClick={() => submit()} />
        </Modal.Actions>
      </Modal>
    </span>
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchModifiers, editWeaponProfile,
}, dispatch);


export default connect(null, mapDispatchToProps)(ProfileModal);
