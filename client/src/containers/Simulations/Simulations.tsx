import React, { useEffect, useMemo, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { fetchSimulations } from 'api';
import _ from 'lodash';
import Tabbed from 'components/Tabbed';
import { useHistory } from 'react-router-dom';
import { useMapping } from 'hooks';
import { getResultsMapping, getProbabilitiesMapping, applyUnitNameMapping } from 'utils/mappers';
import BasicCurves from 'containers/ProbabilityCurves/BasicCurves';
import CumulativeCurves from 'containers/ProbabilityCurves/CumulativeCurves';
import { IStore } from 'types/store';
import { scrollToTop } from 'utils/scrollIntoView';
import MetricsTables from './MetricsTables';
import ProbabilityTables from './ProbabilityTables';

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
    flexDirection: 'column',
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

const mapStateToProps = (state: IStore) => ({
  units: state.units,
  simulations: state.simulations,
  numSimulations: state.config.numSimulations,
});

const connector = connect(mapStateToProps, { fetchSimulations });
interface ISimulationsProps extends ConnectedProps<typeof connector> {}

const Simulations: React.FC<ISimulationsProps> = React.memo(
  ({ units, numSimulations, simulations, fetchSimulations }) => {
    const classes = useStyles();
    const history = useHistory();

    if (units.length <= 0) {
      history.replace('/');
    }

    const nameMapping = useMemo(() => applyUnitNameMapping(units), [units]);
    const unitNames: string[] = Object.values(nameMapping);

    const resultMapper = useCallback(getResultsMapping(nameMapping), [nameMapping]);
    const simMapper = useCallback(getProbabilitiesMapping(nameMapping), [nameMapping]);

    const results = useMapping(simulations.results, resultMapper, simulations.pending);
    const probabilities = useMapping(simulations.probabilities, simMapper, simulations.pending);

    useEffect(() => {
      fetchSimulations();
    }, [fetchSimulations, numSimulations]);

    useEffect(() => {
      scrollToTop(true);
    }, [results]);

    return (
      <div className={classes.app}>
        <div className={classes.container}>
          <Tabbed
            className={classes.tabs}
            tabNames={['Cumulative', 'Discrete', 'Metrics']}
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
      </div>
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default connector(Simulations);
