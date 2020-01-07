import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import ModifierDescription from 'components/ModifierItem/ModifierDescription';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { List, ListItem as Item, Tooltip, useMediaQuery } from '@material-ui/core';
import { ChevronRight, HelpOutline } from '@material-ui/icons';
import clsx from 'clsx';
import { IModifierInstance } from 'types/modifiers';
import { IStore } from 'types/store';
import SummaryLoading from './SummaryLoading';

const useStyles = makeStyles(theme => ({
  modifiers: {
    marginTop: '1em',
  },
  item: {
    display: 'flex',
    alignItems: 'start',
    paddingLeft: theme.spacing(1),
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
    fontSize: theme.typography.body2.fontSize,
    color: theme.typography.caption.color,
    margin: 'auto',
    flex: '1 1 25%',
  },
  inactive: {
    color: theme.palette.action.disabledBackground,
  },
}));

const mapStateToProps = (state: IStore, ownProps: { isTarget?: boolean }) => ({
  modifierState: ownProps.isTarget ? state.targetModifiers : state.modifiers,
});

const connector = connect(mapStateToProps);
interface IModifierSummaryProps extends ConnectedProps<typeof connector> {
  modifiers: IModifierInstance[];
  active?: boolean;
  className?: string;
  isTarget?: boolean;
}

/**
 * A brief summary of the applied modifiers, used for the main page
 */
const ModifierSummary: React.FC<IModifierSummaryProps> = ({
  modifiers,
  modifierState,
  active = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isTarget = false,
  className,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.up('lg'));

  const getModifierById = (id: string) => ((modifierState || {}).modifiers || []).find(mod => mod.id === id);

  return modifiers && modifiers.length ? (
    <div className={clsx(classes.modifiers, className)}>
      <b>Modifiers: </b>
      {!modifierState || modifierState.pending ? <SummaryLoading /> : null}
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
                title={
                  <ModifierDescription
                    definition={modDefinition}
                    options={modifier.options}
                    className={classes.modifierTooltip}
                  />
                }
                onClick={e => {
                  e.stopPropagation();
                }}
                disableFocusListener
                disableTouchListener
              >
                {large ? <span>:</span> : <HelpOutline className={classes.helpIcon} />}
              </Tooltip>
              {large && (
                <ModifierDescription
                  definition={modDefinition}
                  options={modifier.options}
                  className={clsx(classes.descriptionFull, active ? '' : classes.inactive)}
                />
              )}
            </Item>
          );
        })}
      </List>
    </div>
  ) : null;
};

export default connector(ModifierSummary);
