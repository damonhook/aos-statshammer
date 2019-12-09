import React from 'react';
import PropTypes from 'prop-types';
import ModifierDescription from 'components/ModifierItem/ModifierDescription';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem as Item, Tooltip } from '@material-ui/core';
import { ChevronRight, HelpOutline } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  modifiers: {
    marginTop: '1em',
  },
  modifierTooltip: {
    color: '#fff',
    fontSize: '12px',
    marginBottom: 0,
  },
  helpIcon: {
    marginLeft: theme.spacing(1),
  },
}));


const ModifierSummary = ({ modifiers }) => {
  const classes = useStyles();

  return (modifiers && modifiers.length
    ? (
      <div className={classes.modifiers}>
        <b>Modifiers: </b>
        <List dense disablePadding>
          {modifiers.map((modifier) => (
            <Item dense key={modifier.name}>
              <ChevronRight />
              <span>{modifier.name}</span>
              <Tooltip
                arrow
                title={(
                  <ModifierDescription
                    description={modifier.description}
                    options={modifier.options}
                    className={classes.modifierTooltip}
                  />
                  )}
                onClick={(e) => { e.stopPropagation(); }}
                className={classes.helpIcon}
                disableFocusListener
                disableTouchListener
              >
                <HelpOutline />
              </Tooltip>
            </Item>
          ))}
        </List>
      </div>
    )
    : null
  );
};

ModifierSummary.propTypes = {
  modifiers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
  })).isRequired,
};

export default ModifierSummary;
