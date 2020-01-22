import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import ListItem from 'components/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import ModifierSummary from 'components/ModifierSummary';
import { IStore } from 'types/store';

const useStyles = makeStyles(theme => ({
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

const mapStateToProps = (state: IStore) => ({
  ...state.target,
});

const connector = connect(mapStateToProps);
interface ITargetSummaryProps extends ConnectedProps<typeof connector> {}

const TargetSummary: React.FC<ITargetSummaryProps> = ({ modifiers }) => {
  const classes = useStyles();
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

export default connector(TargetSummary);
