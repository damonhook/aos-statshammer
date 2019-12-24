export const applyResultsMapping = (mapping, data, fixedKey = 'save') => (
  data.map((result) => Object.keys(result).reduce((acc, key) => {
    if (key == null || key === fixedKey) return acc;
    const name = mapping[key];
    if (name) acc[name] = result[key];
    return acc;
  }, fixedKey ? { [fixedKey]: result[fixedKey] } : {}))
);

export const applyProbabilitiesMapping = (mapping, data) => (
  data.map(({ save, buckets, metrics }) => ({
    save,
    buckets: applyResultsMapping(mapping, buckets, 'damage'),
    metrics: Object.keys(metrics).reduce((acc, metric) => ({
      ...acc, [metric]: applyResultsMapping(mapping, [metrics[metric]], null)[0],
    }), {}),
  }))
);

export const getResultsMapping = (mapping) => (data) => applyResultsMapping(mapping, data);

export const getProbabilitiesMapping = (mapping) => (
  (data) => applyProbabilitiesMapping(mapping, data)
);

export const applyUnitNameMapping = (units) => (
  units.reduce((acc, { uuid, name }) => { acc[uuid] = name; return acc; }, {})
);
