import React, {
  useRef, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  toggleWeaponProfile, deleteWeaponProfile, addWeaponProfile, moveWeaponProfile,
} from 'actions/weaponProfiles.action';
import { addNotification } from 'actions/notifications.action';
import { Switch } from '@material-ui/core';
import ListItem from 'components/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ModifierSummary from 'components/ModifierSummary';
import { useHistory } from 'react-router-dom';
import { getUnitByPosition } from 'utils/unitHelpers';
import Characteristics from './Characteristics';

const useStyles = makeStyles((theme) => ({
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

const WeaponProfile = ({
  unitId, id, profile, toggleWeaponProfile, deleteWeaponProfile,
  addWeaponProfile, addProfileEnabled, addNotification, moveWeaponProfile,
}) => {
  const classes = useStyles();
  const profileRef = useRef(null);
  const history = useHistory();

  const unit = useMemo(() => getUnitByPosition(unitId), [unitId]);
  const editPath = `/units/${unit.uuid}/${id}`;

  useEffect(() => {
    if (profileRef.current) profileRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [profile.uuid]);

  const handleOpen = useCallback(() => {
    history.push(editPath);
  }, [editPath, history]);

  const handleDelete = useCallback((id, unitId) => {
    addNotification({ message: 'Deleted Profile' });
    deleteWeaponProfile(id, unitId);
  }, [addNotification, deleteWeaponProfile]);

  const moveUpEnabled = id > 0;
  const moveDownEnabled = id < (unit.weapon_profiles.length - 1);

  const moveProfileUp = () => { moveWeaponProfile(id, id - 1, unitId); };
  const moveProfileDown = () => { moveWeaponProfile(id, id + 1, unitId); };

  return (
    <div ref={profileRef}>
      <ListItem
        className={clsx(classes.profile, profile.active ? '' : classes.inactive)}
        header="Weapon Profile"
        onEdit={handleOpen}
        onDelete={() => handleDelete(id, unitId)}
        onCopy={addProfileEnabled ? () => addWeaponProfile(unitId, { ...profile }) : 'disabled'}
        extraItems={[
          { name: 'Move Up', onClick: moveProfileUp, disabled: !moveUpEnabled },
          { name: 'Move Down', onClick: moveProfileDown, disabled: !moveDownEnabled },
        ]}
        collapsible
      >
        <div className={classes.content}>
          <Switch
            className={classes.switch}
            onChange={() => toggleWeaponProfile(id, unitId)}
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
};

WeaponProfile.propTypes = {
  unitId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  profile: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  toggleWeaponProfile: PropTypes.func.isRequired,
  deleteWeaponProfile: PropTypes.func.isRequired,
  addWeaponProfile: PropTypes.func.isRequired,
  addProfileEnabled: PropTypes.bool.isRequired,
  addNotification: PropTypes.func.isRequired,
  moveWeaponProfile: PropTypes.func.isRequired,
};

export default connect(null, {
  toggleWeaponProfile, deleteWeaponProfile, addWeaponProfile, addNotification, moveWeaponProfile,
})(WeaponProfile);
