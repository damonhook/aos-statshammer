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
  let option = { type: 'number', allowDice };
  option = addDefault(option, defaultVal);
  return option;
};

export const choiceOption = ({ defaultVal = null, items }) => {
  let option = { type: 'choice', items };
  let newDefaultVal = defaultVal;
  if (newDefaultVal == null && items && items.length === 1) {
    [newDefaultVal] = items;
  }
  option = addDefault(option, newDefaultVal);
  return option;
};

export const booleanOption = ({ defaultVal = null }) => {
  let option = { type: 'boolean' };
  option = addDefault(option, defaultVal);
  return option;
};

export const rollOption = ({ defaultVal = null, allowOnes = false }) => {
  let option = { type: 'roll', allowOnes };
  option = addDefault(option, defaultVal);
  return option;
};
