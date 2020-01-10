export type TSimResult = {
  save: string;
} & {
  buckets: {
    count: number;
    damage: number;
    probability: number;
  };
  metrics: {
    [name: string]: number;
  };
};

export interface IProbabilityBucket {
  damage: number;
  [name: string]: number;
}

export interface IProbabilityCumulative {
  damage: number;
  [name: string]: number;
}

export type IProbabilityMetric = { [name: string]: number };

export interface IProbabilityMetrics {
  mean: IProbabilityMetric;
  max: IProbabilityMetric;
  median: IProbabilityMetric;
}

export interface IProbability {
  save: string;
  buckets: IProbabilityBucket[];
  cumulative: IProbabilityCumulative[];
  metrics: IProbabilityMetrics;
}

export interface ISimulation {
  results: TSimResult[];
  probabilities: IProbability[];
}
