export interface INumberOption {
  type: 'number';
  allowDice?: boolean;
  default?: number | string;
}

export interface IChoiceOption {
  type: 'choice';
  items: string[];
  default?: string;
}

export interface IBooleanOption {
  type: 'boolean';
  default?: boolean;
}

export interface IRollOption {
  type: 'roll';
  allowOnes?: boolean;
  default?: number | string;
}

export type TOptionTypes = INumberOption | IChoiceOption | IBooleanOption | IRollOption;

export interface IModifierDefinition {
  id: string;
  name: string;
  description: string;
  options: { [name: string]: TOptionTypes };
}

export type TOptionValue = number | string | boolean;

export interface IModifierInstance {
  id: string;
  uuid: string;
  options: { [name: string]: TOptionValue };
}
