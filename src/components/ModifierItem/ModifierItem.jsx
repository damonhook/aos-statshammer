import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from 'components/ListItem';
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
    flexDirection: 'row',
  },
  modifierDescription: {
    color: 'darkgray',
    marginBottom: '1em',
  },
});

const ModifierItem = ({
  index, name, description, options, removeModifier, onOptionChange,
}) => {
  const classes = useStyles();

  return (
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
                />
              ))}
            </div>
          )
          : null}
      </div>
    </ListItem>
  );
};

export default ModifierItem;
