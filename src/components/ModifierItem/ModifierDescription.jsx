import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

const formatUnicorn = require('format-unicorn/safe');

const useStyles = makeStyles({
  description: {
    color: 'darkgray',
    marginBottom: '1em',
  },
});

const ModifierDescription = ({ description, options, className }) => {
  const classes = useStyles();

  const getHtmlForValue = (key, value) => `<b style="cursor:help;" title=${key}>${value}</b>`;

  const getFormattedDescription = () => {
    const params = Object.keys(options).reduce((acc, key) => {
      if (options[key]) {
        if (options[key].type === 'boolean') {
          acc[key] = options[key].value ? getHtmlForValue(key, key) : '';
        } else if (options[key].value != null && options[key].value !== '') {
          acc[key] = getHtmlForValue(key, options[key].value);
        }
      }
      return acc;
    }, {});
    const desc = formatUnicorn(description, params).trim().replace(/\s+/g, ' ').replace(/_/g, ' ');
    return desc[0].toUpperCase() + desc.slice(1);
  };

  return (
    <Typography component="div" className={clsx(classes.description, className)}>
      {/* eslint-disable-next-line react/no-danger */}
      <span dangerouslySetInnerHTML={{ __html: getFormattedDescription() }} />
    </Typography>
  );
};

export default ModifierDescription;
