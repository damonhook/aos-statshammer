const addDefault = (option, defaultVal = null) => {
  if (defaultVal != null) {
    return {
      ...option,
      default: defaultVal,
    };
  }
  return option;
};

export const numberOption = ({ defaultVal = null, allowDice = false }) => {
  const option = { type: 'number', allowDice };
  addDefault(option, defaultVal);
  return option;
};

export const choiceOption = ({ defaultVal = null, items }) => {
  const option = { type: 'choice', items };
  let newDefaultVal = defaultVal;
  if (newDefaultVal == null && items && items.length === 1) {
    [newDefaultVal] = items;
  }
  addDefault(option, newDefaultVal);
  return option;
};

export const booleanOption = ({ defaultVal = null }) => {
  const option = { type: 'boolean' };
  addDefault(option, defaultVal);
  return option;
};

export const rollOption = ({ defaultVal = null, allowOnes = false }) => {
  const option = { type: 'roll', allowOnes };
  addDefault(option, defaultVal);
  return option;
};
