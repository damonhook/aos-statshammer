const addDefault = (option: any, defaultVal: any = null) => {
  if (defaultVal != null) {
    return { ...option, default: defaultVal };
  }
  return option;
};

interface INumberOption {
  defaultVal?: number | string | null;
  allowDice?: boolean;
}

interface IChoiceOption {
  defaultVal?: string | null;
  items: string[];
}

interface IBooleanOption {
  defaultVal?: boolean | null;
}

interface IRollOption {
  defaultVal?: number | null;
  allowOnes?: boolean;
}

export const numberOption = ({ defaultVal = null, allowDice = false }: INumberOption) => {
  let option = { type: 'number', allowDice };
  option = addDefault(option, defaultVal);
  return option;
};

export const choiceOption = ({ defaultVal = null, items }: IChoiceOption) => {
  let option = { type: 'choice', items };
  let newDefaultVal = defaultVal;
  if (newDefaultVal == null && items && items.length === 1) {
    [newDefaultVal] = items;
  }
  option = addDefault(option, newDefaultVal);
  return option;
};

export const booleanOption = ({ defaultVal = null }: IBooleanOption) => {
  let option = { type: 'boolean' };
  option = addDefault(option, defaultVal);
  return option;
};

export const rollOption = ({ defaultVal = null, allowOnes = false }: IRollOption) => {
  let option = { type: 'roll', allowOnes };
  option = addDefault(option, defaultVal);
  return option;
};
