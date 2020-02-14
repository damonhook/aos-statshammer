export type TUnitSimulationMetrics = {
  max: number;
  mean: number;
  variance: number;
  standardDeviation: number;
};

export type TUnitSimulationBucket = {
  damage: number;
  count: number;
  probability: number;
};

export interface IUnitSimulation {
  buckets: TUnitSimulationBucket[];
  metrics: TUnitSimulationMetrics;
}
