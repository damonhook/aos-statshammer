import React from 'react';
import Card from 'components/Card';
import { Button } from "semantic-ui-react";
import "./index.scss";
import ModifierInput from "./ModifierInput";

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
          {Object.keys(options).map((option) => (
            <ModifierInput
              index={index}
              option={option}
              val={options[option].value}
              onOptionChange={onOptionChange}
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
