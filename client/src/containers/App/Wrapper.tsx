import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ROUTES } from 'utils/urls';
import useRouteFind from 'hooks/useRouteFind';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    flex: 1,
    width: '100%',
    maxWidth: 1600,
    padding: theme.spacing(0, 4),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(0, 2),
    },
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  fullWidth: {
    padding: 0,
    maxWidth: '100%',
  },
  home: {
    padding: theme.spacing(0, 2, 0, 0),
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
    maxWidth: 1900,
  },
}));

interface IWrapperProps {
  children?: React.ReactNode;
}
const Wrapper = ({ children }: IWrapperProps) => {
  const classes = useStyles();
  const [, , page] = useRouteFind(Object.values(ROUTES));

  const useFullWidth = [ROUTES.PDF, ROUTES.SIMULATIONS].includes(page);
  const isHome = [ROUTES.HOME, ROUTES.TARGET].includes(page);

  return (
    <div
      className={clsx(classes.content, {
        [classes.fullWidth]: useFullWidth,
        [classes.home]: isHome,
      })}
    >
      {children}
    </div>
  );
};

export default Wrapper;
