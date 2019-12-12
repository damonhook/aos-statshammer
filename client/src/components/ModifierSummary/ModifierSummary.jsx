import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModifierDescription from 'components/ModifierItem/ModifierDescription';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  List, ListItem as Item, Tooltip, Typography, CircularProgress,
} from '@material-ui/core';
import { ChevronRight, HelpOutline } from '@material-ui/icons';
import { getModifierById } from 'utils/modifierHelpers';
import SummaryLoading from './SummaryLoading';

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


const ModifierSummary = ({ modifiers, modifierState }) => {
  const classes = useStyles();

  return (modifiers && modifiers.length
    ? (
      <div className={classes.modifiers}>
        <b>Modifiers: </b>
        {modifierState.pending ? <SummaryLoading /> : null}
        <List dense disablePadding>
          {modifiers.map((modifier) => {
            const modDefinition = getModifierById(modifier.id);
            if (!modDefinition) return null;
            return (
              <Item dense key={modDefinition.name}>
                <ChevronRight />
                <span>{modDefinition.name}</span>
                <Tooltip
                  arrow
                  title={(
                    <ModifierDescription
                      definition={modDefinition}
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
            );
          })}
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

const mapStateToProps = (state) => ({
  modifierState: state.modifiers,
});

export default connect(mapStateToProps)(ModifierSummary);
