import React from 'react';
import WeaponProfile from 'components/WeaponProfile';
import { connect } from 'react-redux';
import './index.scss';
import { addWeaponProfile, deleteUnit, editUnitName } from 'actions/units.action';
import { Button, Input } from 'semantic-ui-react';
import ListItem from 'components/ListItem';


const Unit = ({
  id, unit, addWeaponProfile, deleteUnit, editUnitName,
}) => (
  <ListItem
    className="unit"
    header="Unit"
    onDelete={() => deleteUnit(id)}
  >
    <Input fluid label="Unit Name" value={unit.name} onChange={(_, { value }) => editUnitName(id, value)} />
    <div className="profiles">
      {unit && unit.weapon_profiles && unit.weapon_profiles.map((profile, index) => (
        <WeaponProfile unitId={id} id={index} profile={profile} />
      ))}
    </div>
    <Button
      content="Add Profile"
      icon="add"
      onClick={() => addWeaponProfile(id)}
      fluid
    />
  </ListItem>
);

export default connect(null, { addWeaponProfile, deleteUnit, editUnitName })(Unit);
