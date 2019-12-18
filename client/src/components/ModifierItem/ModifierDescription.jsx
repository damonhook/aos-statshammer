import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import _ from 'lodash';

const formatUnicorn = require('format-unicorn/safe');

const useStyles = makeStyles({
  description: {
    color: 'darkgray',
    marginBottom: '1em',
  },
});

const getHtmlForValue = (key, value) => `<b style="cursor:help;" title=${key}>${value}</b>`;

const getValue = (key, value, asHtml) => (asHtml ? getHtmlForValue(key, value) : value);

const getFormattedDescription = (definition, options, asHtml = false) => {
  const params = Object.keys(options).reduce((acc, key) => {
    if (options[key] != null) {
      if (definition.options[key].type === 'boolean') {
        acc[key] = options[key] ? getValue(key, key, asHtml) : '';
      } else if (options[key] != null && options[key] !== '') {
        acc[key] = getValue(key, options[key], asHtml);
      }
    }
    return acc;
  }, {});
  const desc = formatUnicorn(definition.description, params).trim().replace(/\s+/g, ' ').replace(/_/g, ' ');
  return desc[0].toUpperCase() + desc.slice(1);
};

/**
 * A component used to render the modifier description. It will use the definition description
 * as a base and substitute the current values into it
 * */
const ModifierDescription = React.memo(({ definition, options, className }) => {
  const classes = useStyles();

  const description = useMemo(() => (
    getFormattedDescription(definition, options, true)
  ), [definition, options]);

  return (
    <Typography component="div" className={clsx(classes.description, className)}>
      {/* eslint-disable-next-line react/no-danger */}
      <span dangerouslySetInnerHTML={{ __html: description }} />
    </Typography>
  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

ModifierDescription.defaultProps = {
  className: null,
};

ModifierDescription.propTypes = {
  /** The modifier definition */
  definition: PropTypes.shape({
    description: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
  }).isRequired,
  /** The object containing the values for the modifier instance */
  options: PropTypes.shape().isRequired,
  /** Optional additional class names to apply to the component */
  className: PropTypes.string,
};

export { ModifierDescription as default, getFormattedDescription };
