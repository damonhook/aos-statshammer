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

export interface ISimulation {
  results: ISimulationResult[];
}
