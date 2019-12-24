import React, { useEffect, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { fetchStatsCompare, fetchModifiers, fetchSimulations } from 'api';
import { bindActionCreators } from 'redux';
import PdfGenerator from 'pdf';
import { useMapping } from 'hooks';
import { getResultsMapping, getProbabilitiesMapping, applyUnitNameMapping } from 'utils/mappers';
import _ from 'lodash';

const PdfContainer = React.memo(({
  units, modifiers, stats, simulations, fetchStatsCompare, fetchModifiers, fetchSimulations,
}) => {
  const nameMapping = useMemo(() => applyUnitNameMapping(units), [units]);
  const resultsMapper = useCallback(getResultsMapping(nameMapping), [nameMapping]);
  const simMapper = useCallback(getProbabilitiesMapping(nameMapping), [nameMapping]);

  const results = useMapping(stats.payload, resultsMapper, stats.pending);
  const probabilities = useMapping(simulations.probabilities, simMapper, simulations.pending);

  useEffect(() => {
    fetchStatsCompare();
    fetchModifiers();
    fetchSimulations();
  }, [fetchStatsCompare, fetchModifiers, fetchSimulations]);

  const modifiersReady = modifiers.modifiers && modifiers.modifiers.length;
  const resultsReady = results && results.length;
  const probabilitiesReady = probabilities && probabilities.length;

  if (modifiersReady && resultsReady && probabilitiesReady) {
    return (
      <PdfGenerator
        units={units}
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
  modifiers: state.modifiers,
  stats: state.stats,
  simulations: state.simulations,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchStatsCompare,
  fetchModifiers,
  fetchSimulations,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PdfContainer);
