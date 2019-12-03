import React from 'react';
import Units from 'containers/Units';
import Stats from 'containers/Stats';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  container: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1366px',
    margin: '2em auto',
    [theme.breakpoints.down('md')]: {
      width: '95%',
      marginTop: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '100%',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      maxWidth: '2166px',
      width: '95%',
    },
  },
  separator: {
    height: '1em',
    width: '1em',
  },
}));

const DesktopAppContent = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Units />
      <div className={classes.separator} />
      <Stats />
    </div>
  );
};

export default DesktopAppContent;
