export type TCompareResult = {
  save: number;
  [name: string]: number;
};

export interface ICompareResponse {
  results: TCompareResult[];
}
