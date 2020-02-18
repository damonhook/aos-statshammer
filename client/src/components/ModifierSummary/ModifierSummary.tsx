import { List, ListItem as Item, Tooltip, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ChevronRight, HelpOutline } from '@material-ui/icons';
import clsx from 'clsx';
import ModifierDescription from 'components/ModifierItem/ModifierDescription';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { modifiersSelector, targetModifiersSelector } from 'store/selectors';
import { IModifierInstance } from 'types/modifiers';

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
  inactiveModifier: {
    color: theme.palette.action.disabledBackground,
    textDecoration: 'line-through',
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
  inactiveProfile: {
    color: theme.palette.action.disabledBackground,
  },
}));

const modifiersStateSelector = createSelector(
  modifiersSelector,
  targetModifiersSelector,
  (modifiers, targetModifiers) => _.memoize((isTarget: boolean) => (isTarget ? targetModifiers : modifiers)),
);

interface IModifierSummaryProps {
  modifiers: IModifierInstance[];
  active?: boolean;
  className?: string;
  isTarget?: boolean;
}

/**
 * A brief summary of the applied modifiers, used for the main page
 */
const ModifierSummary = ({
  modifiers,
  active = true,
  isTarget = false,
  className,
}: IModifierSummaryProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.up('lg'));
  const modifierState = useSelector(modifiersStateSelector)(isTarget);

  const getModifierById = (id: string) => (modifierState?.items ?? []).find(mod => mod.id === id);

  return modifiers && modifiers.length ? (
    <div className={clsx(classes.modifiers, className)}>
      <b>Modifiers: </b>
      {!modifierState || modifierState.pending ? <SummaryLoading /> : null}
      <List dense disablePadding>
        {modifiers.map((modifier, index) => {
          const modDefinition = getModifierById(modifier.id);
          if (!modDefinition) return null;
          const isModifierActive = modifier.active ?? true;

          return (
            // eslint-disable-next-line react/no-array-index-key
            <Item dense key={`${modDefinition.name}-${index}`} className={classes.item}>
              <ChevronRight className={clsx({ [classes.inactiveModifier]: !isModifierActive })} />
              <span className={clsx({ [classes.inactiveModifier]: !isModifierActive })}>
                {`${modDefinition.name}${large ? ':' : ''}`}
              </span>
              {large ? (
                <ModifierDescription
                  definition={modDefinition}
                  options={modifier.options}
                  className={clsx(classes.descriptionFull, {
                    [classes.inactiveProfile]: !active,
                    [classes.inactiveModifier]: !isModifierActive,
                  })}
                />
              ) : (
                <Tooltip
                  arrow
                  className={clsx({ [classes.inactiveModifier]: !isModifierActive })}
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
                  <HelpOutline className={classes.helpIcon} />
                </Tooltip>
              )}
            </Item>
          );
        })}
      </List>
    </div>
  ) : null;
};

export default ModifierSummary;
