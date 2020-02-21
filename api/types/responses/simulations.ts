export type TProbabilityResult = {
  damage: number;
  [name: string]: number;
};

export type TMetric = { [name: string]: number };

export type TMetrics = {
  max: TMetric;
  mean: TMetric;
  variance: TMetric;
  standardDeviation: TMetric;
};

export interface ISimulationResult {
  save: number;
  discrete: TProbabilityResult[];
  cumulative: TProbabilityResult[];
  metrics: TMetrics;
}

/**
 * Response structure for `/api/simulate/save`
 */
export interface ISimulationsForSaveResponse {
  results: ISimulationResult;
}

/**
 * Response structure for `/api/simulate`
 */
export interface ISimulationsResponse {
  results: ISimulationResult[];
}
