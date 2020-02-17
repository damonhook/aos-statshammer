import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, Delete, FileCopy } from '@material-ui/icons';
import appConfig from 'appConfig';
import clsx from 'clsx';
import ListItem from 'components/ListItem';
import NoItemsCard from 'components/NoItemsCard';
import WeaponProfile from 'containers/WeaponProfile';
import _ from 'lodash';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUnitEnabledSelector, numUnitsSelector } from 'store/selectors';
import { notificationsStore, unitsStore } from 'store/slices';
import { IUnit } from 'types/unit';
import { scrollToRef } from 'utils/scrollIntoView';

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

interface IUnitProps {
  id: number;
  unit: IUnit;
  className?: string;
}

const Unit = React.memo(
  ({ id, unit, className }: IUnitProps) => {
    const unitRef = useRef(null);
    const classes = useStyles();
    const adUnitEnabled = useSelector(addUnitEnabledSelector);
    const numUnits = useSelector(numUnitsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
      scrollToRef(unitRef);
    }, [unit.uuid]);

    const handleDeleteUnit = useCallback(() => {
      dispatch(
        notificationsStore.actions.addNotification({
          message: 'Deleted Unit',
          action: {
            label: 'Undo',
            onClick: () => dispatch(unitsStore.actions.addUnit({ unit, atPosition: id })),
          },
        }),
      );
      dispatch(unitsStore.actions.deleteUnit({ index: id }));
    }, [dispatch, id, unit]);

    const exportUnit = useCallback(() => {
      downloadUnit(unit);
      dispatch(notificationsStore.actions.addNotification({ message: 'Exported Unit', variant: 'success' }));
    }, [dispatch, unit]);

    const numProfiles = unit.weapon_profiles ? unit.weapon_profiles.length : 0;
    const addProfileEnabled = numProfiles < appConfig.limits.profiles;

    const unitNameError = !unit.name || unit.name === '';

    const copyUnit = () => {
      dispatch(
        unitsStore.actions.addUnit({
          unit: { name: `${unit.name} copy`, weapon_profiles: [...unit.weapon_profiles] },
        }),
      );
    };

    const moveUnitUp = () => {
      dispatch(unitsStore.actions.moveUnit({ index: id, newIndex: id - 1 }));
    };

    const moveUnitDown = () => {
      dispatch(unitsStore.actions.moveUnit({ index: id, newIndex: id + 1 }));
    };

    const handleEditName = (event: any) => {
      dispatch(unitsStore.actions.editUnitName({ index: id, name: event.target.value }));
    };

    const handleAddProfile = () => {
      dispatch(unitsStore.actions.addWeaponProfile({ index: id }));
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
              disabled: !adUnitEnabled,
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
            onChange={handleEditName}
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
            onClick={handleAddProfile}
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

export default Unit;
