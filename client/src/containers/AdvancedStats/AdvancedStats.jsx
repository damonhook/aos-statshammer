import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { fetchSimulations } from 'api';
import { bindActionCreators } from 'redux';
import AppBar from 'components/AppBar';
import _ from 'lodash';
import MetricsTables from './MetricsTables';
import ProbabilityCurves from './ProbabilityCurves';

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
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.default,
  },
  inner: {
    flex: 1,
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  item: {
    marginBottom: '1em',
    display: 'flex',
    flex: 1,
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
  },
}));

const AdvancedStats = React.memo(({
  units, simulations, fetchSimulations,
}) => {
  const classes = useStyles();
  const [results, setResults] = useState(null);
  const [probabilities, setProbabilities] = useState(null);

  const nameMapping = useMemo(() => (
    units.reduce((acc, { uuid, name }) => { acc[uuid] = name; return acc; }, {})
  ), [units]);
  const unitNames = Object.values(nameMapping);

  useEffect(() => {
    fetchSimulations();
  }, [fetchSimulations]);


  useEffect(() => {
    if (simulations && !simulations.pending) {
      if (simulations.results && simulations.results.length) {
        const mappedResults = applyResultsMapping(nameMapping, simulations.results);
        setResults(mappedResults);
      }
      if (simulations.probabilities && simulations.probabilities.length) {
        const mappedProbabilities = applyProbabilitiesMapping(nameMapping, simulations.probabilities);
        setProbabilities(mappedProbabilities);
      }
    }
  }, [nameMapping, simulations, simulations.probabilities, simulations.results]);

  if (simulations.pending) {
    return null;
  }
  if (!results || !results.length || !probabilities || !probabilities.length) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <AppBar title="AoS Statshammer" />
      <div className={classes.inner}>
        <div className={classes.item}>
          <ProbabilityCurves
            probabilities={probabilities}
            unitNames={unitNames}
            className={classes.item}
          />
        </div>
        <div className={classes.item}>
          <MetricsTables
            pending={simulations.pending}
            results={results}
            unitNames={unitNames}
            className={classes.item}
          />
        </div>
      </div>
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
