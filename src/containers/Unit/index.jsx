import React from "react";
import WeaponProfile from "components/WeaponProfile"
import { connect } from "react-redux"
import "./index.scss";
import { addWeaponProfile } from "actions/unit.action";
import { Button } from "semantic-ui-react";

const Unit = ({ unit, addWeaponProfile }) => (
  <div className="unit">
    {unit && unit.weapon_profiles
      ? unit.weapon_profiles.map((profile, index) => {
        return <WeaponProfile id={index} profile={profile} />
      })
      : null
    }
    <Button content="Add Profile" icon="add" labelPosition="left" onClick={() => addWeaponProfile()} fluid positive />
  </div>
)

const mapStateToProps = state => (state)

export default connect(mapStateToProps, { addWeaponProfile })(Unit);
