import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import clsx from 'clsx';

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
}));

const NoItemsCard = ({ header, body, dense = false }) => {
  const classes = useStyles();

  return (
    <Paper className={clsx(classes.noItemsContainer, dense ? classes.dense : '')}>
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


export default NoItemsCard;
