import React from 'react';
import ModifierDescription from 'components/ModifierItem/ModifierDescription';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem as Item, Tooltip } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';

const useStyles = makeStyles({
  modifiers: {
    marginTop: '1em',
  },
  modifierTooltip: {
    color: '#fff',
    fontSize: '12px',
    marginBottom: 0,
  },
});


const ModifierSummary = ({ modifiers }) => {
  const classes = useStyles();

  return (modifiers && modifiers.length
    ? (
      <div className={classes.modifiers}>
        <b>Modifiers: </b>
        <List dense disablePadding>
          {modifiers.map((modifier) => (
            <Item dense>
              <ChevronRight />
              <Tooltip
                enterDelay={300}
                arrow
                key={modifier.name}
                title={(
                  <ModifierDescription
                    description={modifier.description}
                    options={modifier.options}
                    className={classes.modifierTooltip}
                  />
                )}
              >
                <span>{modifier.name}</span>
              </Tooltip>
            </Item>
          ))}
        </List>
      </div>
    )
    : null
  );
};

export default ModifierSummary;
