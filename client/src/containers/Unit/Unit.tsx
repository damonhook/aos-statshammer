import React, { useEffect, useRef, useCallback } from 'react';
import WeaponProfile from 'containers/WeaponProfile';
import { connect, ConnectedProps } from 'react-redux';
import { notifications, units } from 'store/slices';
import ListItem from 'components/ListItem';
import { TextField, Button } from '@material-ui/core';
import { Add, Delete, FileCopy } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { MAX_PROFILES } from 'appConstants';
import clsx from 'clsx';
import NoItemsCard from 'components/NoItemsCard';
import { addUnitEnabled } from 'utils/unitHelpers';
import _ from 'lodash';
import { scrollToRef } from 'utils/scrollIntoView';
import { IStore } from 'types/store';
import { IUnit } from 'types/unit';
import { INotificationAction } from 'types/notification';

const useStyles = makeStyles(theme => ({
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

const downloadUnit = (unit: IUnit) => {
  const data = encodeURIComponent(JSON.stringify(unit));
  // eslint-disable-next-line no-undef
  const a = document.createElement('a');
  a.href = `data:text/json;charset=utf-8,${data}`;
  a.download = `${unit.name}.json`;
  a.click();
};

const mapStateToProps = (state: IStore) => ({
  numUnits: state.units.length,
});

const connector = connect(mapStateToProps, {
  addWeaponProfile: units.actions.addWeaponProfile,
  deleteUnit: units.actions.deleteUnit,
  editUnitName: units.actions.editUnitName,
  addUnit: units.actions.addUnit,
  moveUnit: units.actions.moveUnit,
  addNotification: notifications.actions.addNotification,
});
interface IUnitProps extends ConnectedProps<typeof connector> {
  id: number;
  unit: IUnit;
  className?: string;
}

const Unit: React.FC<IUnitProps> = React.memo(
  ({
    id,
    unit,
    numUnits,
    addWeaponProfile,
    deleteUnit,
    editUnitName,
    addUnit,
    addNotification,
    moveUnit,
    className,
  }) => {
    const unitRef = useRef(null);
    const classes = useStyles();

    useEffect(() => {
      scrollToRef(unitRef);
    }, [unit.uuid]);

    const handleDeleteUnit = useCallback(() => {
      const action: INotificationAction = {
        label: 'Undo',
        onClick: () => addUnit({ unit, atPosition: id }),
      };
      addNotification({ message: 'Deleted Unit', action });
      deleteUnit({ index: id });
    }, [unit, addNotification, addUnit, deleteUnit, id]);

    const exportUnit = useCallback(() => {
      downloadUnit(unit);
      addNotification({ message: 'Exported Unit', variant: 'success' });
    }, [unit, addNotification]);

    const numProfiles = unit.weapon_profiles ? unit.weapon_profiles.length : 0;
    const addProfileEnabled = numProfiles < MAX_PROFILES;

    const unitNameError = !unit.name || unit.name === '';

    const copyUnit = () => {
      addUnit({ unit: { name: `${unit.name} copy`, weapon_profiles: [...unit.weapon_profiles] } });
    };

    const moveUnitUp = () => {
      moveUnit({ index: id, newIndex: id - 1 });
    };
    const moveUnitDown = () => {
      moveUnit({ index: id, newIndex: id + 1 });
    };

    return (
      <div ref={unitRef}>
        <ListItem
          className={clsx(classes.unit, className)}
          header={`Unit (${unit.name})`}
          primaryItems={[
            {
              name: 'Copy',
              onClick: copyUnit,
              icon: <FileCopy />,
              disabled: !addUnitEnabled(),
            },
            { name: 'Delete', onClick: handleDeleteUnit, icon: <Delete /> },
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
            onChange={event => editUnitName({ index: id, name: event.target.value })}
            error={unitNameError}
            helperText={unitNameError ? 'required' : null}
            fullWidth
          />
          <div className={classes.profiles}>
            {unit && unit.weapon_profiles && unit.weapon_profiles.length ? (
              unit.weapon_profiles.map((profile, index) => (
                <WeaponProfile
                  unitId={id}
                  id={index}
                  profile={profile}
                  key={profile.uuid}
                  addProfileEnabled={addProfileEnabled}
                  numProfiles={numProfiles}
                />
              ))
            ) : (
              <NoItemsCard
                header="No Profiles"
                body="No profiles have been added for this unit"
                dense
                nested
              />
            )}
          </div>
          <Button
            onClick={() => addWeaponProfile({ index: id })}
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
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default connector(Unit);
