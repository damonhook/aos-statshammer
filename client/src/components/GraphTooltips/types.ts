export interface IPayload {
  color: string;
  name: string;
  value: any;
}

export interface ITooltipProps {
  active?: boolean;
  payload?: IPayload[];
  label?: string | number;
}
