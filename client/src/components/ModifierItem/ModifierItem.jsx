import React, {
  useRef, useEffect, useState, useCallback, useMemo,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from 'components/ListItem';
import _ from 'lodash';
import { getModifierById } from 'utils/modifierHelpers';
import ModifierInput from './ModifierInput';
import ModifierDescription from './ModifierDescription';

const useStyles = makeStyles((theme) => ({
  modifier: {},
  modifierContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  modifierSettings: {
    justifyContent: 'space-between',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  modifierDescription: {
    color: theme.palette.text.secondary,
    marginBottom: '1em',
  },
}));

const ModifierItem = ({
  index, id, options, removeModifier, onOptionChange, errorCallback,
}) => {
  const classes = useStyles();
  const itemRef = useRef(null);
  const [errors, setErrors] = useState({});
  const definition = getModifierById(id);

  useEffect(() => {
    if (itemRef.current) itemRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [index]);

  useEffect(() => {
    if (errorCallback) {
      errorCallback(Object.keys(errors).some((k) => errors[k]));
    }
  }, [errors, errorCallback]);

  const getErrorCallback = useCallback(_.memoize((name) => (error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  }), []);

  if (!definition) return null;

  return (
    <div ref={itemRef}>
      <ListItem
        className={classes.modifier}
        onDelete={() => removeModifier(index)}
        header={definition.name}
        collapsible
      >
        <div className={classes.modifierContent}>
          <ModifierDescription definition={definition} options={options} />
          {definition.options && Object.keys(definition.options).length
            ? (
              <div className={classes.modifierSettings}>
                {Object.keys(options).map((n) => (
                  <ModifierInput
                    index={index}
                    name={n}
                    option={definition.options[n]}
                    val={options[n]}
                    onOptionChange={onOptionChange}
                    key={n}
                    errorCallback={getErrorCallback(n)}
                  />
                ))}
              </div>
            )
            : null}
        </div>
      </ListItem>
    </div>
  );
};

export default ModifierItem;
