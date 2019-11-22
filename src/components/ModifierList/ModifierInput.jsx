import React from 'react';
import { Input, Dropdown, Checkbox } from 'semantic-ui-react';
import './index.scss';

const ModifierInput = ({
  index, name, option, val, onOptionChange,
}) => {
  const cName = `modifier-input ${option.type}`;
  switch (option.type) {
    case 'choice':
      return (
        <Dropdown
          label={name}
          name={name}
          className={cName}
          placeholder="Select a characteristic"
          selection
          options={option.items.map((item) => ({ key: item, value: item, text: item }))}
        />
      );
    case 'boolean':
      return (
        <Checkbox
          toggle
          label={name}
          name={name}
          className={cName}
          value={val}
          onChange={(_, { value }) => onOptionChange(index, name, value)}
        />
      );
    default:
      return (
        <Input
          label={name}
          name={name}
          className={cName}
          value={val}
          onChange={(_, { value }) => onOptionChange(index, name, value)}
        />
      );
  }
};

export default ModifierInput;
