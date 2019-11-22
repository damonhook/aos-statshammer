import React from 'react';
import ModifierItem from './ModifierItem';
import ModifierSelector from './ModifierSelector';
import './index.scss';


const ModifierList = ({ modifiers, setModifiers }) => {
  const addModifier = (modifier) => {
    const newModifier = {
      ...modifier,
    };
    Object.keys(newModifier.options).forEach((k) => {
      newModifier.options[k].value = '';
    });
    setModifiers([
      ...modifiers,
      newModifier,
    ]);
  };

  const removeModifier = (index) => {
    setModifiers(modifiers.filter((_, i) => i !== index));
  };

  const onOptionChange = (index, name, value) => {
    if (!modifiers) return;
    setModifiers(modifiers.map((modifier, i) => {
      if (i === index) {
        return {
          ...modifier,
          options: {
            ...modifier.options,
            [name]: {
              ...modifier.options[name],
              value,
            },
          },
        };
      }
      return modifier;
    }));
  };

  return (
    <div className="modifier-list field">
      <label>Modifiers:</label>
      {modifiers && modifiers.length
        ? (
          <div className="active-modifiers">
            {modifiers.map((modifier, index) => (
              <ModifierItem
                {...modifier}
                removeModifier={removeModifier}
                index={index}
                onOptionChange={onOptionChange}
              />
            ))}
          </div>
        )
        : null}
      <ModifierSelector onClick={addModifier} />
    </div>
  );
};

export default ModifierList;
