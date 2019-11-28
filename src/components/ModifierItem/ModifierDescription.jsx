import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const formatUnicorn = require('format-unicorn/safe');

const useStyles = makeStyles({
  description: {
    color: 'darkgray',
    marginBottom: '1em',
  },
});

const ModifierDescription = ({ description, options }) => {
  const classes = useStyles();

  const getFormattedDescription = () => {
    const params = Object.keys(options).reduce((acc, key) => {
      if (options[key]) {
        if (options[key].type === 'boolean') acc[key] = options[key].value ? key : '';
        else if (options[key].value != null && options[key].value !== '') acc[key] = options[key].value;
      }
      return acc;
    }, {});
    const desc = formatUnicorn(description, params).trim().replace(/\s+/g, ' ').replace(/_/g, ' ');
    return desc[0].toUpperCase() + desc.slice(1);
  };

  return (
    <Typography component="div" className={classes.description}>
      {getFormattedDescription()}
    </Typography>
  );
};

export default ModifierDescription;
