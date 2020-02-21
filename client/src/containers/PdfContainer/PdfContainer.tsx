import { makeStyles } from '@material-ui/core/styles';
import { fetchModifiers, fetchSimulations, fetchStatsCompare, fetchTargetModifiers } from 'api';
import { useMapping } from 'hooks';
import _ from 'lodash';
import PdfGenerator from 'pdf';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSanitizedTargetSelector, getSanitizedUnitsSelector } from 'store/selectors';
import { IStore } from 'types/store';
import { applyUnitNameMapping, getResultsMapping } from 'utils/mappers';

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

const PdfContainer = () => {
  const classes = useStyles();
  const { units, modifiers, targetModifiers, stats, simulations } = useSelector(
    (state: IStore) => state,
    _.isEqual,
  );
  const sanitizedUnits = useSelector(getSanitizedUnitsSelector)(false);
  const target = useSelector(getSanitizedTargetSelector);
  const dispatch = useDispatch();

  const nameMapping = useMemo(() => applyUnitNameMapping(units), [units]);
  const resultsMapper = useCallback(getResultsMapping(nameMapping), [nameMapping]);

  const results = useMapping(stats.payload, resultsMapper, stats.pending);
  const probabilities = simulations.results;

  useEffect(() => {
    dispatch(fetchStatsCompare());
    dispatch(fetchModifiers());
    dispatch(fetchTargetModifiers());
    dispatch(fetchSimulations());
  }, [dispatch]);

  const modifiersReady = modifiers.items && modifiers.items.length;
  const targetModifiersReady = targetModifiers.items && targetModifiers.items.length;
  const resultsReady = results && results.length;
  const probabilitiesReady = probabilities && probabilities.length;

  if (modifiersReady && targetModifiersReady && resultsReady && probabilitiesReady) {
    return (
      <div className={classes.pdfContainer}>
        <div className={classes.generatorInner}>
          <PdfGenerator
            units={sanitizedUnits}
            target={target}
            results={results}
            probabilities={probabilities}
          />
        </div>
      </div>
    );
  }
  return null;
};

export default PdfContainer;
