import { Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete, Edit, FileCopy } from '@material-ui/icons';
import clsx from 'clsx';
import ListItem from 'components/ListItem';
import ModifierSummary from 'components/ModifierSummary';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUnitByPosition } from 'store/selectors/unitHelpers';
import { notifications, units } from 'store/slices';
import { IWeaponProfile } from 'types/unit';
import { scrollToRef } from 'utils/scrollIntoView';

import Characteristics from './Characteristics';

const useStyles = makeStyles(theme => ({
  profile: {
    display: 'flex',
    background: theme.palette.background.nested,
  },
  inactive: {
    color: theme.palette.action.disabled,
  },
  content: {
    display: 'flex',
    verticalAlign: 'middle',
    marginLeft: '-0.5em',
  },
  switch: {
    margin: 'auto 0',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  },
}));

const connector = connect(null, {
  toggleWeaponProfile: units.actions.toggleWeaponProfile,
  deleteWeaponProfile: units.actions.deleteWeaponProfile,
  addWeaponProfile: units.actions.addWeaponProfile,
  moveWeaponProfile: units.actions.moveWeaponProfile,
  addNotification: notifications.actions.addNotification,
});
interface IWeaponProfileProps extends ConnectedProps<typeof connector> {
  unitId: number;
  id: number;
  profile: IWeaponProfile;
  numProfiles?: number;
  addProfileEnabled: boolean;
}

const WeaponProfile: React.FC<IWeaponProfileProps> = React.memo(
  ({
    unitId,
    id,
    profile,
    numProfiles = 0,
    toggleWeaponProfile,
    deleteWeaponProfile,
    addWeaponProfile,
    addProfileEnabled,
    addNotification,
    moveWeaponProfile,
  }) => {
    const classes = useStyles();
    const profileRef = useRef(null);
    const history = useHistory();

    /** The unit that this profile belongs to */
    const unit = useMemo(() => getUnitByPosition(unitId), [unitId]);
    /** The URL used to open an edit dialog for this item */
    const editPath = `/units/${unit.uuid}/${id}`;

    // Scroll to the component when it is first created
    useEffect(() => {
      scrollToRef(profileRef);
    }, [profile.uuid]);

    /** Handle open/close of the edit profile dialog */
    const handleOpen = useCallback(() => {
      history.push(editPath);
    }, [editPath, history]);

    /**
     * Handle the delete button for the profile
     * @param {int} id The index of the profile to delete
     * @param {int} unitId The index of the unit that this profile belongs to
     */
    const handleDelete = useCallback(
      (id: number, unitId: number) => {
        addNotification({
          message: 'Deleted Profile',
          action: {
            label: 'Undo',
            onClick: () => addWeaponProfile({ index: unitId, weaponProfile: profile, atPosition: id }),
          },
        });
        deleteWeaponProfile({ index: unitId, profileIndex: id });
      },
      [addNotification, addWeaponProfile, deleteWeaponProfile, profile],
    );

    /** Whether the move up button is enabled or not */
    const moveUpEnabled = id > 0;
    /** Whether the move down button is enabled or not */
    const moveDownEnabled = id < numProfiles - 1;

    /** Move this profile up by one space */
    const moveProfileUp = () => {
      moveWeaponProfile({ index: unitId, profileIndex: id, newProfileIndex: id - 1 });
    };
    /** Move this profile down by one space */
    const moveProfileDown = () => {
      moveWeaponProfile({ index: unitId, profileIndex: id, newProfileIndex: id + 1 });
    };

    const header = `Weapon Profile ${profile.name ? `(${profile.name})` : ''}`;

    return (
      <div ref={profileRef}>
        <ListItem
          className={clsx(classes.profile, profile.active ? '' : classes.inactive)}
          header={header}
          primaryItems={[
            { name: 'Edit', onClick: handleOpen, icon: <Edit /> },
            {
              name: 'Copy',
              onClick: () => addWeaponProfile({ index: unitId, weaponProfile: { ...profile } }),
              icon: <FileCopy />,
              disabled: !addProfileEnabled,
            },
            { name: 'Delete', onClick: () => handleDelete(id, unitId), icon: <Delete /> },
          ]}
          secondaryItems={[
            { name: 'Move Up', onClick: moveProfileUp, disabled: !moveUpEnabled },
            { name: 'Move Down', onClick: moveProfileDown, disabled: !moveDownEnabled },
          ]}
          collapsible
        >
          <div className={classes.content}>
            <Switch
              className={classes.switch}
              onChange={() => toggleWeaponProfile({ index: unitId, profileIndex: id })}
              checked={profile.active}
            />
            <div className={classes.details} onClick={handleOpen} role="button">
              <Characteristics profile={profile} />
              {profile.modifiers && profile.modifiers.length ? (
                <ModifierSummary modifiers={profile.modifiers} active={profile.active} />
              ) : null}
            </div>
          </div>
        </ListItem>
      </div>
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default connector(WeaponProfile);
