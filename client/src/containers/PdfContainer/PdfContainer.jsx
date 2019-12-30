import React, { useEffect, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  fetchStatsCompare, fetchModifiers, fetchTargetModifiers, fetchSimulations,
} from 'api';
import { bindActionCreators } from 'redux';
import PdfGenerator from 'pdf';
import { useMapping } from 'hooks';
import { getResultsMapping, getProbabilitiesMapping, applyUnitNameMapping } from 'utils/mappers';
import _ from 'lodash';

const PdfContainer = React.memo(({
  units, target, modifiers, targetModifiers, stats, simulations, fetchStatsCompare,
  fetchModifiers, fetchTargetModifiers, fetchSimulations,
}) => {
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
      <PdfGenerator
        units={units}
        target={target}
        results={results}
        modifiers={modifiers.modifiers}
        probabilities={probabilities}
      />
    );
  }
  return null;
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));


const mapStateToProps = (state) => ({
  units: state.units,
  target: state.target,
  modifiers: state.modifiers,
  targetModifiers: state.targetModifiers,
  stats: state.stats,
  simulations: state.simulations,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchStatsCompare,
  fetchModifiers,
  fetchTargetModifiers,
  fetchSimulations,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PdfContainer);
