import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModifierDescription from 'components/ModifierItem/ModifierDescription';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  List, ListItem as Item, Tooltip, useMediaQuery,
} from '@material-ui/core';
import { ChevronRight, HelpOutline, ArrowRight } from '@material-ui/icons';
import { getModifierById } from 'utils/modifierHelpers';
import SummaryLoading from './SummaryLoading';

const useStyles = makeStyles((theme) => ({
  modifiers: {
    marginTop: '1em',
  },
  item: {
    display: 'flex',
    alignItems: 'start',
  },
  modifierTooltip: {
    color: '#fff',
    fontSize: '12px',
    marginBottom: 0,
  },
  helpIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  descriptionFull: {
    marginLeft: theme.spacing(1),
    fontSize: theme.typography.caption.fontSize,
    color: theme.typography.caption.color,
    margin: 'auto',
    flex: '1 1 25%',
  },
}));

/**
 * A brief summary of the applied modifiers, used for the main page
 */
const ModifierSummary = ({ modifiers, modifierState }) => {
  const classes = useStyles();
  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.up('lg'));

  return (modifiers && modifiers.length
    ? (
      <div className={classes.modifiers}>
        <b>Modifiers: </b>
        {modifierState.pending ? <SummaryLoading /> : null}
        <List dense disablePadding>
          {modifiers.map((modifier, index) => {
            const modDefinition = getModifierById(modifier.id);
            if (!modDefinition) return null;
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Item dense key={`${modDefinition.name}-${index}`} className={classes.item}>
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
                  disableFocusListener
                  disableTouchListener
                >
                  {large ? <span>:</span> : <HelpOutline className={classes.helpIcon} />}
                </Tooltip>
                {large
                  && (
                    <ModifierDescription
                      definition={modDefinition}
                      options={modifier.options}
                      className={classes.descriptionFull}
                    />
                  )}
              </Item>
            );
          })}
        </List>
      </div>
    )
    : null
  );
};

ModifierSummary.defaultProps = {
  modifiers: [],
};

ModifierSummary.propTypes = {
  /** The list of currently applied modifiers */
  modifiers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    options: PropTypes.object,
  })),
  /** The current modifier definitions state in the store */
  modifierState: PropTypes.shape({
    modifiers: PropTypes.array,
    pending: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  modifierState: state.modifiers,
});

export default connect(mapStateToProps)(ModifierSummary);
