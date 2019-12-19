import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { fetchStatsCompare, fetchModifiers } from 'api';
import { bindActionCreators } from 'redux';
import PdfGenerator from 'pdf';

const applyMapping = (mapping, results) => (
  results.map((result) => Object.keys(result).reduce((acc, key) => {
    if (key == null || key === 'save') return acc;
    const name = mapping[key];
    if (name) acc[name] = result[key];
    return acc;
  }, { save: result.save }))
);

const PdfContainer = ({
  units, statsPending, payload, modifiersPending, modifiers, fetchStatsCompare, fetchModifiers,
}) => {
  const [results, setResults] = useState(null);

  const nameMapping = useMemo(() => (
    units.reduce((acc, { uuid, name }) => { acc[uuid] = name; return acc; }, {})
  ), [units]);

  useEffect(() => {
    fetchStatsCompare();
    fetchModifiers();
  }, [fetchStatsCompare, fetchModifiers]);

  useEffect(() => {
    if (!statsPending && payload && payload.length) {
      const mappedResults = applyMapping(nameMapping, payload);
      setResults(mappedResults);
    }
  }, [statsPending, payload, nameMapping]);

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
