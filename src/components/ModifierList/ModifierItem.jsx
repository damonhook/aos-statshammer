import React from 'react';
import Card from 'components/Card';
import { Input, Button } from "semantic-ui-react";
import "./index.scss";

const ModifierItem = ({ index, name, description, options, removeModifier, onOptionChange }) => (
  <Card className="modifier">
    <div className="modifier-content">
      <div className="modifier-title">
        <b>{name}</b>
      </div>
      <div className="modifier-description">
        {description}
      </div>
      {options && Object.keys(options).length ?
        <div className="modifier-options">
          {Object.keys(options).map((key) => (
            <Input
              label={key}
              name={key}
              value={options[key]}
              fluid
              onChange={(_, { value }) => onOptionChange(index, key, value)}
            />
          ))}
        </div>
        : null
      }
    </div>
    <div className="modifier-delete">
      <Button icon="delete" negative onClick={() => removeModifier(index)} />
    </div>
  </Card>
)

export default ModifierItem
