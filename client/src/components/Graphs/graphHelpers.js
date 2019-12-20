import React from 'react';

export const getInitOpacity = (series) => series.reduce((acc, name) => ({
  ...acc, [name]: 1,
}), {});

export const getMouseEnterHandler = (opacity, setOpacity) => ({ dataKey }) => {
  setOpacity(Object.keys(opacity).reduce((acc, name) => ({
    ...acc, [name]: (name === dataKey) ? 1 : 0.25,
  }), {}));
};

export const getMouseLeaveHandler = (opacity, setOpacity) => () => {
  setOpacity(Object.keys(opacity).reduce((acc, name) => ({
    ...acc, [name]: 1,
  }), {}));
};

export const getLegendFormatter = (theme, opacity) => (value) => (
  <span
    style={{
      color: theme.palette.getContrastText(theme.palette.background.paper),
      opacity: (opacity[value] !== null) ? opacity[value] : 1,
    }}
  >
    {value}
  </span>
);
