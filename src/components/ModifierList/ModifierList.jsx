import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ModifierItem from './ModifierItem';
import ModifierSelector from './ModifierSelector';

const useStyles = makeStyles({
  modifierList: {
    marginTop: '1em',
    flex: '1 1 auto',
    width: '100%',
  },
  activeModifiers: { marginTop: '1em' },
  activeModifierCard: {},
});


const ModifierList = ({ modifiers, setModifiers }) => {
  const classes = useStyles();

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
    <div className={classes.modifierList}>
      <label>Modifiers:</label>
      {modifiers && modifiers.length
        ? (
          <div className={classes.activeModifiers}>
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