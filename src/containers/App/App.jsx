import React from 'react';
import Units from 'containers/Units';
import Stats from 'containers/Stats';
import { connect } from 'react-redux';
import { fetchStatsCompare } from 'api';
import { bindActionCreators } from 'redux';
import { Button } from '@material-ui/core';
import { BarChart } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  app: {
    maxWidth: '1366px',
    margin: '0 auto',

    '@media only screen  and (max-width : 712px)': {
      maxWidth: '100%',
    },
  },
  container: {
    margin: '2em',

    '@media only screen  and (max-width : 712px)': {
      margin: '2em 0',
    },
  },
});

const App = ({ units, fetchStatsCompare }) => {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <div className={classes.container}>
        <Units />
        <Button
          className="stats-button"
          fullWidth
          onClick={() => fetchStatsCompare(units)}
          startIcon={<BarChart />}
          variant="contained"
        >
        Generate Data
        </Button>
        <Stats />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => (state);

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchStatsCompare,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
