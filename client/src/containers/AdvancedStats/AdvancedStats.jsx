import React, {
  useEffect, useMemo, useCallback,
} from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { fetchSimulations } from 'api';
import { bindActionCreators } from 'redux';
import AppBar from 'components/AppBar';
import _ from 'lodash';
import Footer from 'components/Footer';
import Tabbed from 'components/Tabbed';
import BottomNavigation from 'components/BottomNavigation';
import { useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useMapping } from 'hooks';
import { applyResultsMapping, applyProbabilitiesMapping } from 'utils/mappers';
import MetricsTables from './MetricsTables';
import ProbabilityCurves from './ProbabilityCurves';
import ProbabilityTables from './ProbabilityTables';

const useStyles = makeStyles((theme) => ({
  app: {
    fontFamily: '"Roboto", sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.default,
  },
  container: {
    display: 'flex',
    flex: 1,
  },
  tabs: {
    marginTop: 0,
    maxWidth: '100vw',
  },
  tab: {
    padding: theme.spacing(2),
    maxWidth: '1366px',
    margin: '0 auto',

    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      padding: theme.spacing(1),
    },
  },
}));

const AdvancedStats = React.memo(({
  units, simulations, fetchSimulations,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (units.length <= 0) {
    history.replace('/');
  }

  const nameMapping = useMemo(() => (
    units.reduce((acc, { uuid, name }) => { acc[uuid] = name; return acc; }, {})
  ), [units]);
  const unitNames = Object.values(nameMapping);

  const resultMapper = useCallback((data) => (
    applyResultsMapping(nameMapping, data)
  ), [nameMapping]);

  const simMapper = useCallback((data) => (
    applyProbabilitiesMapping(nameMapping, data)
  ), [nameMapping]);

  const results = useMapping(simulations.results, resultMapper, simulations.pending);
  const probabilities = useMapping(simulations.probabilities, simMapper, simulations.pending);

  useEffect(() => {
    fetchSimulations();
  }, [fetchSimulations]);

  return (
    <div className={classes.app}>
      <AppBar title="AoS Statshammer" variant="advanced" />
      <div className={classes.container}>
        <Tabbed
          className={classes.tabs}
          tabNames={['Graphs', 'Tables']}
          tabContent={[
            <div className={classes.tab}>
              <ProbabilityCurves
                pending={simulations.pending}
                error={simulations.error}
                probabilities={probabilities}
                unitNames={unitNames}
              />
            </div>,
            <div className={classes.tab}>
              <MetricsTables
                pending={simulations.pending}
                error={simulations.error}
                results={results}
                unitNames={unitNames}
              />
              <ProbabilityTables
                pending={simulations.pending}
                error={simulations.error}
                probabilities={probabilities}
                unitNames={unitNames}
              />
            </div>,
          ]}
        />
      </div>
      {mobile && <BottomNavigation activeIndex={1} />}
      <Footer />
    </div>
  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

const mapStateToProps = (state) => ({
  units: state.units,
  simulations: state.simulations,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchSimulations,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedStats);
