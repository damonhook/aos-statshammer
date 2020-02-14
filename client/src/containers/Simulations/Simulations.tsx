import { makeStyles, Theme } from '@material-ui/core/styles';
import { fetchSimulations } from 'api';
import Tabbed from 'components/Tabbed';
import BasicCurves from 'containers/ProbabilityCurves/BasicCurves';
import CumulativeCurves from 'containers/ProbabilityCurves/CumulativeCurves';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNumUnits, getUnitNames } from 'store/selectors';
import { IStore } from 'types/store';
import { scrollToTop } from 'utils/scrollIntoView';

import MetricsTables from './MetricsTables';

const useStyles = makeStyles((theme: Theme) => ({
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

const Simulations = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const unitNames = useSelector(getUnitNames, _.isEqual);
  const numUnits = useSelector(getNumUnits);
  const simulations = useSelector((state: IStore) => state.simulations, _.isEqual);

  if (numUnits <= 0) {
    history.replace('/');
  }

  useEffect(() => {
    dispatch(fetchSimulations());
  }, [dispatch]);

  useEffect(() => {
    scrollToTop(true);
  }, []);

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
                probabilities={simulations.results}
                unitNames={unitNames}
              />
            </div>,
            <div className={classes.tab}>
              <BasicCurves
                pending={simulations.pending}
                error={simulations.error}
                probabilities={simulations.results}
                unitNames={unitNames}
              />
            </div>,
            <div className={classes.tab}>
              <MetricsTables
                pending={simulations.pending}
                error={simulations.error}
                results={simulations.results}
                unitNames={unitNames}
              />
            </div>,
          ]}
        />
      </div>
    </div>
  );
};

export default Simulations;
