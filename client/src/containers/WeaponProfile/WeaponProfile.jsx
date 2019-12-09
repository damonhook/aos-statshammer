import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  toggleWeaponProfile, deleteWeaponProfile, addWeaponProfile,
} from 'actions/weaponProfiles.action';
import { addNotification } from 'actions/notifications.action';
import ProfileDialog from 'containers/ProfileDialog';
import { Switch } from '@material-ui/core';
import ListItem from 'components/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ModifierSummary from 'components/ModifierSummary';
import { Route, useHistory } from 'react-router-dom';
import { getUnitByPosition } from 'utils/unitHelpers';
import Characteristics from './Characteristics';

const useStyles = makeStyles({
  profile: {
    display: 'flex',
  },
  inactive: {
    color: 'gray',
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
});

const WeaponProfile = ({
  unitId, id, profile, toggleWeaponProfile, deleteWeaponProfile,
  addWeaponProfile, addProfileEnabled, addNotification,
}) => {
  const classes = useStyles();
  const profileRef = useRef(null);
  const history = useHistory();

  const unit = getUnitByPosition(unitId);
  const editPath = `/units/${unit.uuid}/${id}`;

  useEffect(() => {
    if (profileRef.current) profileRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [id]);

  const handleOpen = () => {
    history.push(editPath);
  };

  const handleDelete = (id, unitId) => {
    addNotification({ message: 'Deleted Profile' });
    deleteWeaponProfile(id, unitId);
  };

  return (
    <div ref={profileRef}>
      <ListItem
        className={clsx(classes.profile, profile.active ? '' : classes.inactive)}
        header="Weapon Profile"
        onEdit={handleOpen}
        onDelete={() => handleDelete(id, unitId)}
        onCopy={addProfileEnabled ? () => addWeaponProfile(unitId, { ...profile }) : 'disabled'}
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
              <ModifierSummary modifiers={profile.modifiers} />
            ) : null}
          </div>
        </div>
        <Route path="/units/:unitUuid/:profileIndex">
          <ProfileDialog open />
        </Route>
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
};

export default connect(null, {
  toggleWeaponProfile, deleteWeaponProfile, addWeaponProfile, addNotification,
})(WeaponProfile);
