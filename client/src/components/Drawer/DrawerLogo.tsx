import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { LogoIcon } from 'components/Icons';
import Link from 'components/Link';
import React from 'react';
import { ROUTES } from 'utils/urls';

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    margin: theme.spacing(1, 0, 1.5),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '3.5rem',
    display: 'flex',
  },
  mini: {
    margin: theme.spacing(0.5, 0, 1),
    fontSize: '2.75rem',
  },
}));

interface IDrawerLogoProps {
  mini?: boolean;
}

const DrawerLogo = ({ mini }: IDrawerLogoProps) => {
  const classes = useStyles();
  return (
    <Link to={ROUTES.HOME} replace className={clsx(classes.logo, { [classes.mini]: mini })}>
      <LogoIcon color="primary" fontSize="inherit" />
    </Link>
  );
};

export default DrawerLogo;
