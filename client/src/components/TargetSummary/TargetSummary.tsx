import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { InfoOutlined } from '@material-ui/icons';
import ListItem from 'components/ListItem';
import ModifierSummary from 'components/ModifierSummary';
import React from 'react';
import { useSelector } from 'react-redux';
import { targetAppliedModifiersSelector } from 'store/selectors';

const useStyles = makeStyles((theme) => ({
  noItems: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  list: {
    marginTop: 0,
  },
}));

const TargetSummary = () => {
  const classes = useStyles();
  const modifiers = useSelector(targetAppliedModifiersSelector);

  return (
    <ListItem header="Target Summary" collapsible>
      {modifiers && modifiers.length ? (
        <ModifierSummary modifiers={modifiers} isTarget className={classes.list} />
      ) : (
        <Typography className={classes.noItems}>
          <InfoOutlined className={classes.icon} />
          No modifiers present
        </Typography>
      )}
    </ListItem>
  );
};

export default TargetSummary;
