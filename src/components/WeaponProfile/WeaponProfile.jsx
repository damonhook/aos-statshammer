import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toggleWeaponProfile, deleteWeaponProfile, addWeaponProfile } from 'actions/units.action';
import ProfileModal from 'components/ProfileModal';
import { List, ListItem as Item, Switch } from '@material-ui/core';
import ListItem from 'components/ListItem';
import { makeStyles } from '@material-ui/core/styles';

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
});


const WeaponProfile = ({
  unitId, id, profile, toggleWeaponProfile, deleteWeaponProfile, addWeaponProfile,
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <ListItem
      className={`${classes.profile} ${profile.active ? '' : classes.inactive}`}
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
        <div className={classes.characteristics}>
          <span className={classes.characteristic}>
            <b>Models: </b>
            {profile.num_models}
          </span>
          <span className={classes.characteristic}>
            <b>Attacks: </b>
            {profile.attacks}
          </span>
          <span className={classes.characteristic}>
            <b>To Hit: </b>
            {profile.to_hit}
            +
          </span>
          <span className={classes.characteristic}>
            <b>To Wound: </b>
            {profile.to_wound}
            +
          </span>
          <span className={classes.characteristic}>
            <b>Rend: </b>
            {profile.rend}
          </span>
          <span className={classes.characteristic}>
            <b>Damage: </b>
            {profile.damage}
          </span>
        </div>
        {profile.modifiers && profile.modifiers.length
          ? (
            <div>
              <b>Modifiers: </b>
              <List>
                {profile.modifiers.map((modifier) => (
                  <Item>{modifier.name}</Item>
                ))}
              </List>
            </div>
          )
          : null}
      </div>
      <ProfileModal
        open={open}
        close={() => setOpen(false)}
        unitId={unitId}
        id={id}
        header="Edit Profile"
        profile={profile}
      />
    </ListItem>
  );
};

export default connect(
  null, { toggleWeaponProfile, deleteWeaponProfile, addWeaponProfile },
)(WeaponProfile);
