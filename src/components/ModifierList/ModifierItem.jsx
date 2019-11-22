import React from 'react';
import './index.scss';
import ListItem from 'components/ListItem';
import ModifierInput from './ModifierInput';

const ModifierItem = ({
  index, name, description, options, removeModifier, onOptionChange,
}) => (
  <ListItem
    className="modifier"
    onDelete={() => removeModifier(index)}
    header={name}
    collapsible
  >
    <div className="modifier-content">
      <div className="modifier-description">
        {description}
      </div>
      {options && Object.keys(options).length
        ? (
          <div className="modifier-settings">
            {Object.keys(options).map((n) => (
              <ModifierInput
                index={index}
                name={n}
                option={options[n]}
                val={options[n].value}
                onOptionChange={onOptionChange}
              />
            ))}
          </div>
        )
        : null}
    </div>
  </ListItem>
);

export default ModifierItem;
