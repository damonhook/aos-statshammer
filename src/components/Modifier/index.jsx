import React from 'react';
import Card from 'components/Card';
import { Input, Button } from "semantic-ui-react";
import "./index.scss";

const Modifier = ({ index, name, description, options, removeModifier }) => (
  <Card className="modifier">
    <div className="modifier-content">
      <div className="modifier-title">
        <b>{name}</b>
      </div>
      <div className="modifier-description">
        {description}
      </div>
      {options && options.length ?
        <div className="modifier-options">
          {options.map((option) => (
            <Input label={option} fluid />
          ))}
        </div>
        : null
      }
    </div>
    <div className="modifier-delete">
      <Button icon="delete" negative onClick={() => removeModifier(index)}/>
    </div>
  </Card>
)

export default Modifier
