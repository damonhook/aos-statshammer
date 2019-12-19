import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { fetchSimulations } from 'api';
import { bindActionCreators } from 'redux';
import AppBar from 'components/AppBar';
import MetricsTables from './MetricsTables';

const applyMapping = (mapping, results) => (
  results.map((result) => Object.keys(result).reduce((acc, key) => {
    if (key == null || key === 'save') return acc;
    const name = mapping[key];
    if (name) acc[name] = result[key];
    return acc;
  }, { save: result.save }))
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
    maxWidth: '1366px',
    margin: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto',
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
  item: {
    marginBottom: '1em',
    flexGrow: 1,
    flexBasis: 0,
    [theme.breakpoints.down('sm')]: {
      marginBottom: '4em',
    },
    overflowX: 'hidden',
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
  },
}));

const AdvancedStats = ({
  units, pending, payload, error, fetchSimulations,
}) => {
  const classes = useStyles();
  const [results, setResults] = useState(null);

  const nameMapping = useMemo(() => (
    units.reduce((acc, { uuid, name }) => { acc[uuid] = name; return acc; }, {})
  ), [units]);
  const unitNames = Object.values(nameMapping);

  useEffect(() => {
    fetchSimulations();
  }, [fetchSimulations]);


  useEffect(() => {
    if (!pending && payload && payload.length) {
      const mappedResults = applyMapping(nameMapping, payload);
      setResults(mappedResults);
    }
  }, [payload, nameMapping, pending]);

  if (pending || !payload || !payload.length) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <AppBar title="AoS Statshammer" />
      <div className={classes.inner}>
        <MetricsTables
          pending={pending}
          results={results}
          unitNames={unitNames}
          className={classes.item}
        />
        <span className={classes.item}>PLACEHOLDER</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  units: state.units,
  ...state.simulations,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchSimulations,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedStats);
