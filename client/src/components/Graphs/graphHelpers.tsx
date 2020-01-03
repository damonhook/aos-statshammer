import React from 'react';
export const getInitOpacity = series =>
  series.reduce(
    (acc, name) => ({
      ...acc,
      [name]: 1,
    }),
    {},
  );

export const getMouseEnterHandler = (opacity, setOpacity) => ({ dataKey }) => {
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

export const getMouseLeaveHandler = (opacity, setOpacity) => () => {
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

export const getLegendFormatter = (theme, opacity) => value => (
  <span
    style={{
      color: theme.palette.getContrastText(theme.palette.background.paper),
      opacity: opacity[value] !== null ? opacity[value] : 1,
    }}
  >
    {value}
  </span>
);

interface IXAxis {
  dataKey: string;
  tickFormatter?: any;
  domain?: (number | string)[] | null;
  ticks?: (number | string)[] | null;
  type?: 'number' | 'category' | null;
  tickCount?: number | null;
}

interface IyAxis {
  tickFormatter?: any;
  domain?: (number | string)[] | null;
  ticks?: (number | string)[] | null;
  type?: 'number' | 'category' | null;
  tickCount?: number | null;
}

export interface IReferenceLine {
  x: any;
  stroke?: string;
  dataKey: string;
}

export interface ILabel {
  value: string;
  position?: string;
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
  yAxis?: IyAxis;
  tooltip?: React.ReactNode;
}
