import { makeStyles } from '@material-ui/core/styles';
import { fetchModifiers, fetchSimulations, fetchStatsCompare, fetchTargetModifiers } from 'api';
import { useMapping } from 'hooks';
import _ from 'lodash';
import PdfGenerator from 'pdf';
import React, { useCallback, useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IStore } from 'types/store';
import { applyUnitNameMapping, getProbabilitiesMapping, getResultsMapping } from 'utils/mappers';

const useStyles = makeStyles(() => ({
  pdfContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  generatorInner: {
    flex: 1,
    display: 'flex',
  },
}));

const mapStateToProps = (state: IStore) => ({
  units: state.units,
  target: state.target,
  modifiers: state.modifiers,
  targetModifiers: state.targetModifiers,
  stats: state.stats,
  simulations: state.simulations,
});

const connector = connect(mapStateToProps, {
  fetchStatsCompare,
  fetchModifiers,
  fetchTargetModifiers,
  fetchSimulations,
});

interface PdfContainerProps extends ConnectedProps<typeof connector> {}

const PdfContainer: React.FC<PdfContainerProps> = React.memo(
  ({
    units,
    target,
    modifiers,
    targetModifiers,
    stats,
    simulations,
    fetchStatsCompare,
    fetchModifiers,
    fetchTargetModifiers,
    fetchSimulations,
  }) => {
    const classes = useStyles();
    const nameMapping = useMemo(() => applyUnitNameMapping(units), [units]);
    const resultsMapper = useCallback(getResultsMapping(nameMapping), [nameMapping]);
    const simMapper = useCallback(getProbabilitiesMapping(nameMapping), [nameMapping]);

    const results = useMapping(stats.payload, resultsMapper, stats.pending);
    const probabilities = useMapping(simulations.probabilities, simMapper, simulations.pending);

    useEffect(() => {
      fetchStatsCompare();
      fetchModifiers();
      fetchTargetModifiers();
      fetchSimulations();
    }, [fetchStatsCompare, fetchModifiers, fetchSimulations, fetchTargetModifiers]);

    const modifiersReady = modifiers.modifiers && modifiers.modifiers.length;
    const targetModifiersReady = targetModifiers.modifiers && targetModifiers.modifiers.length;
    const resultsReady = results && results.length;
    const probabilitiesReady = probabilities && probabilities.length;

    if (modifiersReady && targetModifiersReady && resultsReady && probabilitiesReady) {
      return (
        <div className={classes.pdfContainer}>
          <div className={classes.generatorInner}>
            <PdfGenerator units={units} target={target} results={results} probabilities={probabilities} />
          </div>
        </div>
      );
    }
    return null;
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default connector(PdfContainer);
