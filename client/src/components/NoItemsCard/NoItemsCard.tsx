import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { InfoOutlined } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  noItemsContainer: {
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(2),
    display: 'flex',
  },
  content: {
    flex: '90%',
  },
  dense: {
    padding: theme.spacing(2),
  },
  icon: {
    paddingRight: theme.spacing(2),
    margin: 'auto 0',
    flex: '25%',
    height: 'auto',
    maxWidth: '3rem',
  },
  nested: {
    backgroundColor: theme.palette.background.nested,
  },
}));

interface INoItemsCardProps {
  header: string;
  body: string;
  dense?: boolean;
  nested?: boolean;
}

/**
 * A card used to represent the lack of items in a list
 */
const NoItemsCard: React.FC<INoItemsCardProps> = ({ header, body, dense, nested }) => {
  const classes = useStyles();

  return (
    <Paper className={clsx(classes.noItemsContainer, dense && classes.dense, nested && classes.nested)}>
      <InfoOutlined className={classes.icon} />
      <div className={classes.content}>
        <Typography variant={dense ? 'h6' : 'h5'} component="h3">
          {header}
        </Typography>
        <Typography variant={dense ? 'body2' : 'body1'} component="p">
          {body}
        </Typography>
      </div>
    </Paper>
  );
};

NoItemsCard.defaultProps = {
  dense: false,
  nested: false,
};

export default NoItemsCard;
