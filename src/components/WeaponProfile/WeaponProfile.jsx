import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { toggleWeaponProfile, deleteWeaponProfile, addWeaponProfile } from 'actions/units.action';
import ProfileDialog from 'containers/ProfileDialog';
import { List, ListItem as Item, Switch } from '@material-ui/core';
import ListItem from 'components/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { ChevronRight } from '@material-ui/icons';
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
  characteristics: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 'auto 0',
  },
  characteristic: {
    marginRight: '1em',
    padding: '0.25em 0',

    '&:last-child': {
      marginRight: 0,
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  modifiers: {
    marginTop: '1em',
  },
});


const WeaponProfile = ({
  unitId, id, profile, toggleWeaponProfile, deleteWeaponProfile, addWeaponProfile,
}) => {
  const classes = useStyles();
  const profileRef = useRef(null);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (profileRef.current) profileRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [id]);

  return (
    <div ref={profileRef}>
      <ListItem
        className={clsx(classes.profile, profile.active ? '' : classes.inactive)}
        header="Weapon Profile"
        onEdit={() => setOpen(true)}
        onDelete={() => deleteWeaponProfile(id, unitId)}
        onCopy={() => addWeaponProfile(unitId, { ...profile })}
        collapsible
      >
        <div className={classes.content}>
          <Switch
            className={classes.switch}
            onChange={() => toggleWeaponProfile(id, unitId)}
            checked={profile.active}
          />
          <div className={classes.details} onClick={() => setOpen(true)} role="button">
            <Characteristics profile={profile} />
            {profile.modifiers && profile.modifiers.length
              ? (
                <div className={classes.modifiers}>
                  <b>Modifiers: </b>
                  <List dense disablePadding>
                    {profile.modifiers.map((modifier) => (
                      <Item dense>
                        <ChevronRight />
                        {modifier.name}
                      </Item>
                    ))}
                  </List>
                </div>
              )
              : null}
          </div>
        </div>
        <ProfileDialog
          open={open}
          close={() => setOpen(false)}
          unitId={unitId}
          id={id}
          header="Edit Profile"
          profile={profile}
        />
      </ListItem>
    </div>
  );
};

export default connect(
  null, { toggleWeaponProfile, deleteWeaponProfile, addWeaponProfile },
)(WeaponProfile);
