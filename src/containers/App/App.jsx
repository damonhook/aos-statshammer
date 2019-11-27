import React from 'react';
import Units from 'containers/Units';
import Stats from 'containers/Stats';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  app: {
    margin: '2em 0',
  },
  container: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1366px',
    margin: '0 auto',

    '@media only screen  and (max-width : 712px)': {
      width: '100%',
      maxWidth: '100%',
    },

    '@media only screen  and (min-width : 1366px)': {
      flexDirection: 'row',
      width: '95%',
    },
  },
  separator: {
    height: '1em',
    width: '1em',
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <div className={classes.container}>
        <Units />
        <div className={classes.separator} />
        <Stats />
      </div>
    </div>
  );
};


export default App;
