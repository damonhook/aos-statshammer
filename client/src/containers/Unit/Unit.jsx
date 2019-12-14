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
import { Add, Delete, FileCopy } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { MAX_PROFILES } from 'appConstants';
import clsx from 'clsx';
import NoItemsCard from 'components/NoItemsCard';
import { addUnitEnabled } from 'utils/unitHelpers';
import _ from 'lodash';


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

const downloadUnit = (unit) => {
  const data = encodeURIComponent(JSON.stringify(unit));
  // eslint-disable-next-line no-undef
  const a = document.createElement('a');
  a.href = `data:text/json;charset=utf-8,${data}`;
  a.download = `${unit.name}.json`;
  a.click();
};

const Unit = React.memo(({
  id, unit, addWeaponProfile, deleteUnit, editUnitName, addUnit, className,
  addNotification, moveUnit, numUnits,
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
    downloadUnit(unit);
    addNotification({ message: 'Exported Unit', variant: 'success' });
  }, [unit, addNotification]);

  const numProfiles = unit.weapon_profiles ? unit.weapon_profiles.length : 0;
  const addProfileEnabled = numProfiles < MAX_PROFILES;

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
        primaryItems={[
          {
            name: 'Copy', onClick: copyUnit, icon: <FileCopy />, disabled: !addUnitEnabled(),
          },
          { name: 'Delete', onClick: () => handleDeleteUnit(id), icon: <Delete /> },
        ]}
        secondaryItems={[
          { name: 'Export', onClick: exportUnit },
          { name: 'Move Up', onClick: moveUnitUp, disabled: id <= 0 },
          { name: 'Move Down', onClick: moveUnitDown, disabled: id >= numUnits - 1 },
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
                numProfiles={numProfiles}
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
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

const mapStateToProps = (state) => ({
  numUnits: state.units.length,
});

export default connect(mapStateToProps, {
  addWeaponProfile, deleteUnit, editUnitName, addUnit, addNotification, moveUnit,
})(Unit);
