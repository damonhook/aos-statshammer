import React, { useEffect, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { fetchSimulations } from 'api';
import AppBar from 'components/AppBar';
import _ from 'lodash';
import Footer from 'components/Footer';
import Tabbed from 'components/Tabbed';
import BottomNavigation from 'components/BottomNavigation';
import { useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useMapping } from 'hooks';
import { getResultsMapping, getProbabilitiesMapping, applyUnitNameMapping } from 'utils/mappers';
import BasicCurves from 'containers/ProbabilityCurves/BasicCurves';
import CumulativeCurves from 'containers/ProbabilityCurves/CumulativeCurves';
import MetricsTables from './MetricsTables';
import ProbabilityTables from './ProbabilityTables';
import { ISimulationsStore, IUnitStore, IStore } from 'types/store';

const useStyles = makeStyles(theme => ({
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

interface AdvancedStatsProps {
  units: IUnitStore;
  simulations: ISimulationsStore;
  fetchSimulations: any;
}

const AdvancedStats: React.FC<AdvancedStatsProps> = React.memo(
  ({ units, simulations, fetchSimulations }) => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (units.length <= 0) {
      history.replace('/');
    }

    const nameMapping = useMemo(() => applyUnitNameMapping(units), [units]);
    const unitNames = Object.values(nameMapping);

    const resultMapper = useCallback(getResultsMapping(nameMapping), [nameMapping]);
    const simMapper = useCallback(getProbabilitiesMapping(nameMapping), [nameMapping]);

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
            tabNames={['Cumulative', 'Single', 'Tables']}
            tabContent={[
              <div className={classes.tab}>
                <CumulativeCurves
                  pending={simulations.pending}
                  error={simulations.error}
                  probabilities={probabilities}
                  unitNames={unitNames}
                />
              </div>,
              <div className={classes.tab}>
                <BasicCurves
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
        {mobile && <BottomNavigation />}
        <Footer />
      </div>
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

const mapStateToProps = (state: IStore) => ({
  units: state.units,
  simulations: state.simulations,
});

export default connect(mapStateToProps, { fetchSimulations })(AdvancedStats);
