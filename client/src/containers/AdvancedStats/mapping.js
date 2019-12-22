export const applyResultsMapping = (mapping, results, fixedKey = 'save') => (
  results.map((result) => Object.keys(result).reduce((acc, key) => {
    if (key == null || key === fixedKey) return acc;
    const name = mapping[key];
    if (name) acc[name] = result[key];
    return acc;
  }, fixedKey ? { [fixedKey]: result[fixedKey] } : {}))
);

export const applyProbabilitiesMapping = (mapping, results) => (
  results.map(({ save, buckets, metrics }) => ({
    save,
    buckets: applyResultsMapping(mapping, buckets, 'damage'),
    metrics: Object.keys(metrics).reduce((acc, metric) => ({
      ...acc, [metric]: applyResultsMapping(mapping, [metrics[metric]], null)[0],
    }), {}),
  }))
);
