import React, {
  useRef, useEffect, useState, useCallback,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from 'components/ListItem';
import _ from 'lodash';
import ModifierInput from './ModifierInput';
import ModifierDescription from './ModifierDescription';

const useStyles = makeStyles({
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
    color: 'darkgray',
    marginBottom: '1em',
  },
});

const ModifierItem = ({
  index, name, description, options, removeModifier, onOptionChange, errorCallback,
}) => {
  const classes = useStyles();
  const itemRef = useRef(null);
  const [errors, setErrors] = useState({});

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


  return (
    <div ref={itemRef}>
      <ListItem
        className={classes.modifier}
        onDelete={() => removeModifier(index)}
        header={name}
        collapsible
      >
        <div className={classes.modifierContent}>
          <ModifierDescription description={description} options={options} />
          {options && Object.keys(options).length
            ? (
              <div className={classes.modifierSettings}>
                {Object.keys(options).map((n) => (
                  <ModifierInput
                    index={index}
                    name={n}
                    option={options[n]}
                    val={options[n].value}
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
