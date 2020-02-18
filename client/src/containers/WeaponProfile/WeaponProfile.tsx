import { Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete, Edit, FileCopy } from '@material-ui/icons';
import clsx from 'clsx';
import ListItem from 'components/ListItem';
import ModifierSummary from 'components/ModifierSummary';
import _ from 'lodash';
import React, { useCallback, useEffect, useRef } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { unitByIndexSelector } from 'store/selectors';
import { notificationsStore, unitsStore } from 'store/slices';
import { IWeaponProfile } from 'types/unit';
import { scrollToRef } from 'utils/scrollIntoView';

import Characteristics from './Characteristics';

const useStyles = makeStyles(theme => ({
  profile: {
    display: 'flex',
    background: theme.palette.background.nested,
    marginBottom: '-1em',
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

interface IWeaponProfileProps {
  unitId: number;
  id: number;
  profile: IWeaponProfile;
  numProfiles?: number;
  addProfileEnabled: boolean;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

const WeaponProfile = React.memo(
  ({ unitId, id, profile, numProfiles = 0, addProfileEnabled, dragHandleProps }: IWeaponProfileProps) => {
    const classes = useStyles();
    const profileRef = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();

    /** The unit that this profile belongs to */
    const unit = useSelector(unitByIndexSelector, _.isEqual)(unitId);
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
        dispatch(
          notificationsStore.actions.addNotification({
            message: 'Deleted Profile',
            action: {
              label: 'Undo',
              onClick: () =>
                dispatch(
                  unitsStore.actions.addWeaponProfile({
                    index: unitId,
                    weaponProfile: profile,
                    atPosition: id,
                  }),
                ),
            },
          }),
        );
        dispatch(unitsStore.actions.deleteWeaponProfile({ index: unitId, profileIndex: id }));
      },
      [dispatch, profile],
    );

    /** Whether the move up button is enabled or not */
    const moveUpEnabled = id > 0;
    /** Whether the move down button is enabled or not */
    const moveDownEnabled = id < numProfiles - 1;

    /** Move this profile up by one space */
    const moveProfileUp = () => {
      dispatch(
        unitsStore.actions.moveWeaponProfile({ index: unitId, profileIndex: id, newProfileIndex: id - 1 }),
      );
    };
    /** Move this profile down by one space */
    const moveProfileDown = () => {
      dispatch(
        unitsStore.actions.moveWeaponProfile({ index: unitId, profileIndex: id, newProfileIndex: id + 1 }),
      );
    };

    const handleCopyProfile = () => {
      dispatch(unitsStore.actions.addWeaponProfile({ index: unitId, weaponProfile: { ...profile } }));
    };

    const handleToggleProfile = () => {
      dispatch(unitsStore.actions.toggleWeaponProfile({ index: unitId, profileIndex: id }));
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
              onClick: handleCopyProfile,
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
          dragHandleProps={dragHandleProps}
        >
          <div className={classes.content}>
            <Switch className={classes.switch} onChange={handleToggleProfile} checked={profile.active} />
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

export default WeaponProfile;
