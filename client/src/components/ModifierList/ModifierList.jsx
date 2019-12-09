import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ModifierSelector from 'components/ModifierSelector';
import ModifierItem from 'components/ModifierItem';
import { MAX_MODIFIERS } from 'appConstants';

const useStyles = makeStyles({
  modifierList: {
    flex: '1 1 auto',
    width: '100%',
  },
  activeModifiers: { marginTop: '1em' },
  activeModifierCard: {},
});


const ModifierList = ({ modifiers, setModifiers, errorCallback }) => {
  const classes = useStyles();
  const [errors, setErrors] = useState([]);

  const sendErrorCallback = () => {
    if (errorCallback) {
      errorCallback(errors.some((e) => e));
    }
  };

  useEffect(() => {
    sendErrorCallback();
  }, [errors]);

  const addModifier = (modifier) => {
    const newModifier = {
      ...modifier,
    };
    Object.keys(newModifier.options).forEach((k) => {
      newModifier.options[k].value = '';
      if (newModifier.options[k].default != null) {
        newModifier.options[k].value = newModifier.options[k].default;
      }
    });
    if (!modifiers || !modifiers.length) {
      setModifiers([newModifier]);
      setErrors([false]);
    } else {
      setModifiers([...modifiers, newModifier]);
      setErrors([...errors, false]);
    }
  };

  const removeModifier = (index) => {
    setModifiers(modifiers.filter((_, i) => i !== index));
    setErrors(errors.filter((_, i) => i !== index));
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

  const handleErrorCallback = (index, error) => {
    setErrors(errors.map((e, i) => {
      if (i === index) {
        return error;
      }
      return e;
    }));
  };

  return (
    <Typography component="div" className={classes.modifierList}>
      <label>Modifiers:</label>
      {modifiers && modifiers.length
        ? (
          <div className={classes.activeModifiers}>
            {modifiers.map((modifier, index) => (
              <ModifierItem
                {...modifier}
                removeModifier={removeModifier}
                index={index}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                onOptionChange={onOptionChange}
                errorCallback={(error) => handleErrorCallback(index, error)}
              />
            ))}
          </div>
        )
        : null}
      <ModifierSelector
        onClick={addModifier}
        disabled={modifiers && modifiers.length >= MAX_MODIFIERS}
      />
    </Typography>
  );
};

export default ModifierList;
