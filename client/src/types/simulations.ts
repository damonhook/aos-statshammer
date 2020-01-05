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
  buckets: any[];
  cumulative: any[];
  metrics: any;
}

export type TResult = {
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

export interface ISimulation {
  results: TResult[];
  probabilities: IProbability[];
}
