import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toggleWeaponProfile, deleteWeaponProfile } from 'actions/units.action';
import ProfileModal from 'components/ProfileModal';
import { List } from 'semantic-ui-react';
import ListItem from 'components/ListItem';
import './index.scss';

const WeaponProfile = ({
  unitId, id, profile, toggleWeaponProfile, deleteWeaponProfile,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <ListItem
      className={`profile ${profile.active ? 'active' : 'inactive'}`}
      header="Weapon Profile"
      onEdit={() => setOpen(true)}
      onDelete={() => deleteWeaponProfile(id, unitId)}
    >
      <input type="checkbox" onChange={() => toggleWeaponProfile(id, unitId)} checked={profile.active} />
      <div className="content">
        <div className="characteristics">
          <span className="characteristic">
            <b>Models: </b>
            {profile.num_models}
          </span>
          <span className="characteristic">
            <b>Attacks: </b>
            {profile.attacks}
          </span>
          <span className="characteristic">
            <b>To Hit: </b>
            {profile.to_hit}
            +
          </span>
          <span className="characteristic">
            <b>To Wound: </b>
            {profile.to_wound}
            +
          </span>
          <span className="characteristic">
            <b>Rend: </b>
            {profile.rend}
          </span>
          <span className="characteristic">
            <b>Damage: </b>
            {profile.damage}
          </span>
        </div>
        {profile.modifiers && profile.modifiers.length
          ? (
            <div className="modifiers">
              <b>Modifiers: </b>
              <List
                bulleted
                items={profile.modifiers.map((modifier) => modifier.name)}
              />
            </div>
          )
          : null}
      </div>
      <ProfileModal
        open={open}
        close={() => setOpen(false)}
        unitId={unitId}
        id={id}
        header="Edit Profile"
        profile={profile}
      />
    </ListItem>
  );
};

export default connect(null, { toggleWeaponProfile, deleteWeaponProfile })(WeaponProfile);
