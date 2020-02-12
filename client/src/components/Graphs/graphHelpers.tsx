import { Theme } from '@material-ui/core/styles';
import React from 'react';
import { AxisDomain, PositionType, TickFormatterFunction } from 'recharts';

export type TOpacity = { [name: string]: number };

export const getInitOpacity = (series: string[]): TOpacity =>
  series.reduce(
    (acc, name) => ({
      ...acc,
      [name]: 1,
    }),
    {},
  );

export const getMouseEnterHandler = (opacity: TOpacity, setOpacity: (value: TOpacity) => void) => ({
  dataKey,
}) => {
  setOpacity(
    Object.keys(opacity).reduce(
      (acc, name) => ({
        ...acc,
        [name]: name === dataKey ? 1 : 0.25,
      }),
      {},
    ),
  );
};

export const getMouseLeaveHandler = (opacity: TOpacity, setOpacity: (value: TOpacity) => void) => () => {
  setOpacity(
    Object.keys(opacity).reduce(
      (acc, name) => ({
        ...acc,
        [name]: 1,
      }),
      {},
    ),
  );
};

export const getLegendFormatter = (theme: Theme, opacity: TOpacity) => (value: string) => (
  <span
    style={{
      color: theme.palette.getContrastText(theme.palette.background.paper),
      opacity: opacity[value] !== null ? opacity[value] : 1,
    }}
  >
    {value}
  </span>
);

export interface IXAxis {
  dataKey: string;
  tickFormatter?: TickFormatterFunction;
  domain?: Readonly<[AxisDomain, AxisDomain]>;
  ticks?: ReadonlyArray<any>;
  type?: 'number' | 'category';
  tickCount?: number;
}

export interface IYAxis {
  tickFormatter?: TickFormatterFunction;
  domain?: Readonly<[AxisDomain, AxisDomain]>;
  ticks?: ReadonlyArray<any>;
  type?: 'number' | 'category';
  tickCount?: number;
}

export interface IReferenceLine {
  x: any;
  stroke?: string;
  dataKey: string;
}

export interface ILabel {
  value: number | string;
  position?: PositionType;
  offset?: number;
}

export interface GraphProps {
  data: object[];
  series: string[];
  className?: string;
  isAnimationActive?: boolean;
  title?: string;
  syncId?: string;
  xAxis: IXAxis;
  yAxis?: IYAxis;
  tooltip?: React.ReactElement;
}
