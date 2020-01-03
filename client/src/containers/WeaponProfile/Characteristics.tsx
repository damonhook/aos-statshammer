import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { IWeaponProfile } from 'types/store';

const useStyles = makeStyles({
  characteristics: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 'auto 0',
    cursor: 'pointer',
  },
  characteristic: {
    marginRight: '1em',
    padding: '0.25em 0',

    '&:last-child': {
      marginRight: 0,
    },
  },
});

interface ICharacteristicProps {
  name: string;
  text: string;
  className?: string;
}

const Characteristic: React.FC<ICharacteristicProps> = ({ name, text, className }) => {
  const classes = useStyles();

  const item = (
    <Typography component="span" className={clsx(classes.characteristic, className)}>
      <Typography component="span">{`${name}: `}</Typography>
      <Typography variant="h6" component="span">
        {text}
      </Typography>
    </Typography>
  );
  return item;
};

interface ICharacteristicsProps {
  profile: IWeaponProfile;
  className?: string;
}

const Characteristics: React.FC<ICharacteristicsProps> = ({ profile, className, ...other }) => {
  const classes = useStyles();

  return (
    <Typography component="div" fontSize={10} className={clsx(classes.characteristics, className)} {...other}>
      <Characteristic name="Models" text={`${profile.num_models}`} />
      <Characteristic name="Attacks" text={`${profile.attacks}`} />
      <Characteristic name="To Hit" text={`${profile.to_hit}+`} />
      <Characteristic name="To Wound" text={`${profile.to_wound}+`} />
      <Characteristic name="Rend" text={profile.rend ? `-${profile.rend}` : '0'} />
      <Characteristic name="Damage" text={`${profile.damage}`} />
    </Typography>
  );
};

export default Characteristics;
