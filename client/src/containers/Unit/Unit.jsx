import React, { useEffect, useRef } from 'react';
import WeaponProfile from 'components/WeaponProfile';
import { connect } from 'react-redux';
import {
  addWeaponProfile,
  deleteUnit,
  editUnitName,
  addUnit,
} from 'actions/units.action';
import ListItem from 'components/ListItem';
import { TextField, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { MAX_PROFILES } from 'appConstants';


const useStyles = makeStyles((theme) => ({
  unit: {
    marginBottom: '1em',
  },
  profiles: {
    marginTop: '1em',
  },
  button: {
    backgroundColor: theme.palette.primary.light,
  },
}));

const Unit = ({
  id, unit, addWeaponProfile, deleteUnit, editUnitName, addUnit,
}) => {
  const unitRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    if (unitRef.current) unitRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [id]);

  const exportUnit = () => {
    const data = encodeURIComponent(JSON.stringify(unit));
    // eslint-disable-next-line no-undef
    const a = document.createElement('a');
    a.href = `data:text/json;charset=utf-8,${data}`;
    a.download = `${unit.name}.json`;
    a.click();
  };

  const addProfileDisabled = unit.weapon_profiles.length >= MAX_PROFILES;

  return (
    <div ref={unitRef}>
      <ListItem
        className={classes.unit}
        header={`Unit (${unit.name})`}
        onDelete={() => deleteUnit(id)}
        onCopy={addProfileDisabled ? 'disabled' : () => addUnit(`${unit.name} copy`, [...unit.weapon_profiles])}
        extraItems={[{ name: 'Export', onClick: exportUnit }]}
        collapsible
      >
        <TextField
          label="Unit Name"
          value={unit.name}
          onChange={(event) => editUnitName(id, event.target.value)}
          fullWidth
        />
        <div className={classes.profiles}>
          {unit
            && unit.weapon_profiles
            && unit.weapon_profiles.map((profile, index) => (
              <WeaponProfile unitId={id} id={index} profile={profile} key={profile.uuid} />
            ))}
        </div>
        <Button
          onClick={() => addWeaponProfile(id)}
          className={classes.button}
          startIcon={<Add />}
          variant="contained"
          color="primary"
          disabled={addProfileDisabled}
          fullWidth
        >
          Add Profile
        </Button>
      </ListItem>
    </div>
  );
};

export default connect(null, {
  addWeaponProfile, deleteUnit, editUnitName, addUnit,
})(
  Unit,
);
