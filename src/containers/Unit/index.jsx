import React from "react";
import WeaponProfile from "components/WeaponProfile"
import { connect } from "react-redux"
import "./index.scss";
import { addWeaponProfile } from "actions/units.action";
import { Button } from "semantic-ui-react";
import Card from "components/Card";

const Unit = ({ id, unit, addWeaponProfile }) => (
  <Card className="unit">
    <div className="unit-name"><h3>{unit.name}</h3></div>
    {unit && unit.weapon_profiles
      ? unit.weapon_profiles.map((profile, index) => {
        return <WeaponProfile unit_id={id} id={index} profile={profile} />
      })
      : null
    }
    <Button
      content="Add Profile"
      icon="add"
      labelPosition="left"
      onClick={() => addWeaponProfile(id)}
      fluid
      positive />
  </Card>
)

export default connect(null, { addWeaponProfile })(Unit);
