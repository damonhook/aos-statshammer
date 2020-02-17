const appConfig = {
  limits: {
    units: 5,
    profiles: 8,
    modifiers: 5,
  },
  simulations: {
    min: 3000,
    default: 5000,
    max: 10000,
  },
  timers: {
    debounce: 300,
    retry: 3000,
    longPress: 600,
  },
};

export default appConfig;
