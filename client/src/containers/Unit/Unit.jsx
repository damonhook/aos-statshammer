import React, { useEffect, useRef, useCallback } from 'react';
import WeaponProfile from 'containers/WeaponProfile';
import { connect } from 'react-redux';
import {
  deleteUnit, editUnitName, addUnit, moveUnit,
} from 'actions/units.action';
import { addNotification } from 'actions/notifications.action';
import { addWeaponProfile } from 'actions/weaponProfiles.action';
import ListItem from 'components/ListItem';
import { TextField, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { MAX_PROFILES } from 'appConstants';
import clsx from 'clsx';
import NoItemsCard from 'components/NoItemsCard';
import { addUnitEnabled, getNumUnits } from 'utils/unitHelpers';


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
  id, unit, addWeaponProfile, deleteUnit, editUnitName, addUnit, className,
  addNotification, moveUnit,
}) => {
  const unitRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    if (unitRef.current) unitRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [unit.uuid]);

  const handleDeleteUnit = useCallback((id) => {
    addNotification({ message: 'Deleted Unit' });
    deleteUnit(id);
  }, [addNotification, deleteUnit]);

  const exportUnit = useCallback(() => {
    const data = encodeURIComponent(JSON.stringify(unit));
    // eslint-disable-next-line no-undef
    const a = document.createElement('a');
    a.href = `data:text/json;charset=utf-8,${data}`;
    a.download = `${unit.name}.json`;
    a.click();
    addNotification({ message: 'Exported Unit', variant: 'success' });
  }, [unit, addNotification]);

  const addProfileEnabled = unit.weapon_profiles.length < MAX_PROFILES;
  const moveUpEnabled = id > 0;
  const moveDownEnabled = id < getNumUnits() - 1;

  const unitNameError = (!unit.name || unit.name === '');

  const copyUnit = () => {
    addUnit(`${unit.name} copy`, [...unit.weapon_profiles]);
  };

  const moveUnitUp = () => { moveUnit(id, id - 1); };
  const moveUnitDown = () => { moveUnit(id, id + 1); };

  return (
    <div ref={unitRef}>
      <ListItem
        className={clsx(classes.unit, className)}
        header={`Unit (${unit.name})`}
        onDelete={() => handleDeleteUnit(id)}
        onCopy={addUnitEnabled() ? copyUnit : 'disabled'}
        extraItems={[
          { name: 'Export', onClick: exportUnit },
          { name: 'Move Up', onClick: moveUnitUp, disabled: !moveUpEnabled },
          { name: 'Move Down', onClick: moveUnitDown, disabled: !moveDownEnabled },
        ]}
        collapsible
      >
        <TextField
          label="Unit Name"
          value={unit.name}
          onChange={(event) => editUnitName(id, event.target.value)}
          error={unitNameError}
          helperText={unitNameError ? 'required' : null}
          fullWidth
        />
        <div className={classes.profiles}>
          {(unit && unit.weapon_profiles && unit.weapon_profiles.length)
            ? unit.weapon_profiles.map((profile, index) => (
              <WeaponProfile
                unitId={id}
                id={index}
                profile={profile}
                key={profile.uuid}
                addProfileEnabled={addProfileEnabled}
              />
            ))
            : (
              <NoItemsCard
                header="No Profiles"
                body="No profiles have been added for this unit"
                dense
              />
            )}
        </div>
        <Button
          onClick={() => addWeaponProfile(id)}
          className={classes.button}
          startIcon={<Add />}
          variant="contained"
          color="primary"
          disabled={!addProfileEnabled}
          fullWidth
        >
          Add Profile
        </Button>
      </ListItem>
    </div>
  );
};

const mapStateToProps = (state) => ({
  units: state.units,
});

export default connect(mapStateToProps, {
  addWeaponProfile, deleteUnit, editUnitName, addUnit, addNotification, moveUnit,
})(Unit);
