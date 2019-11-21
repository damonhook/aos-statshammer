import React from 'react';
import { Input } from "semantic-ui-react";
import "./index.scss";

const ModifierInput = ({ index, option, val, onOptionChange }) => {
  console.log(index, option, val, onOptionChange)

  return (
    <Input
      label={option}
      name={option}
      value={val}
      fluid
      onChange={(_, { value }) => onOptionChange(index, option, value)}
    />
  )
}

export default ModifierInput
