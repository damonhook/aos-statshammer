import React, { useEffect, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { fetchStatsCompare, fetchModifiers } from 'api';
import { bindActionCreators } from 'redux';
import PdfGenerator from 'pdf';
import { useMapping } from 'hooks';
import { applyResultsMapping } from 'utils/mappers';

const PdfContainer = ({
  units, statsPending, payload, modifiersPending, modifiers, fetchStatsCompare, fetchModifiers,
}) => {
  const nameMapping = useMemo(() => (
    units.reduce((acc, { uuid, name }) => { acc[uuid] = name; return acc; }, {})
  ), [units]);

  const resultsMapper = useCallback((data) => (
    applyResultsMapping(nameMapping, data)
  ), [nameMapping]);

  const results = useMapping(payload, resultsMapper, statsPending);

  useEffect(() => {
    fetchStatsCompare();
    fetchModifiers();
  }, [fetchStatsCompare, fetchModifiers]);

  if (!modifiers || !modifiers.length || !results || !results.length) {
    return null;
  }
  return <PdfGenerator units={units} results={results} modifiers={modifiers} />;
};


const mapStateToProps = (state) => ({
  units: state.units,
  statsPending: state.stats.pending,
  payload: state.stats.payload,
  modifiersPending: state.modifiers.pending,
  modifiers: state.modifiers.modifiers,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchStatsCompare,
  fetchModifiers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PdfContainer);
