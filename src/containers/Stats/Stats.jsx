import React from 'react';
import { connect } from 'react-redux';
import { fetchStatsCompare } from 'api';
import { bindActionCreators } from 'redux';
import { Button } from '@material-ui/core';
import { BarChart } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Results from './Results';

const useStyles = makeStyles({
  statsContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: 0,
  },
  results: {
    marginTop: '1em',
  },
});

const App = ({ units, fetchStatsCompare }) => {
  const classes = useStyles();
  return (
    <div className={classes.statsContainer}>
      <Button
        className="stats-button"
        fullWidth
        onClick={() => fetchStatsCompare(units)}
        startIcon={<BarChart />}
        variant="contained"
      >
        Generate Data
      </Button>
      <Results className={classes.results} />
    </div>
  );
};

const mapStateToProps = (state) => (state);

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchStatsCompare,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
