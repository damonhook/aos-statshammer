import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { fetchSimulations } from 'api';
import { bindActionCreators } from 'redux';
import AppBar from 'components/AppBar';
import _ from 'lodash';
import Footer from 'components/Footer';
import Tabbed from 'components/Tabbed';
import MetricsTables from './MetricsTables';
import ProbabilityCurves from './ProbabilityCurves';
import ProbabilityTables from './ProbabilityTables';

const applyResultsMapping = (mapping, results, fixedKey = 'save') => (
  results.map((result) => Object.keys(result).reduce((acc, key) => {
    if (key == null || key === fixedKey) return acc;
    const name = mapping[key];
    if (name) acc[name] = result[key];
    return acc;
  }, { [fixedKey]: result[fixedKey] }))
);

const applyProbabilitiesMapping = (mapping, results) => (
  results.map(({ save, buckets }) => ({
    save, buckets: applyResultsMapping(mapping, buckets, 'damage'),
  }))
);

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
  const [results, setResults] = useState([]);
  const [probabilities, setProbabilities] = useState([]);

  const nameMapping = useMemo(() => (
    units.reduce((acc, { uuid, name }) => { acc[uuid] = name; return acc; }, {})
  ), [units]);
  const unitNames = Object.values(nameMapping);

  useEffect(() => {
    fetchSimulations();
  }, [fetchSimulations]);


  useEffect(() => {
    if (!simulations.pending) {
      if (simulations.results && simulations.results.length) {
        const mappedResults = applyResultsMapping(nameMapping, simulations.results);
        setResults(mappedResults);
      }
      if (simulations.probabilities && simulations.probabilities.length) {
        const mappedProbabilities = applyProbabilitiesMapping(
          nameMapping, simulations.probabilities,
        );
        setProbabilities(mappedProbabilities);
      }
    }
  }, [nameMapping, simulations.pending, simulations.probabilities, simulations.results]);

  return (
    <div className={classes.app}>
      <AppBar title="AoS Statshammer" />
      <div className={classes.container}>
        <Tabbed
          className={classes.tabs}
          tabNames={['Probability', 'Metrics']}
          tabContent={[
            <div className={classes.tab}>
              <ProbabilityCurves
                pending={simulations.pending}
                probabilities={probabilities}
                unitNames={unitNames}
              />
              <ProbabilityTables
                pending={simulations.pending}
                probabilities={probabilities}
                unitNames={unitNames}
              />
            </div>,
            <div className={classes.tab}>
              <MetricsTables
                pending={simulations.pending}
                results={results}
                unitNames={unitNames}
              />
            </div>,
          ]}
        />
      </div>
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
