import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import formatUnicorn from 'format-unicorn/safe';
import _ from 'lodash';
import React, { useMemo } from 'react';
import type { IModifierDefinition, TOptionValue } from 'types/modifiers';

const useStyles = makeStyles({
  description: {
    color: 'darkgray',
  },
});

const getHtmlForValue = (key: string, value: string | number | boolean) =>
  `<b style="cursor:help;" title=${key}>${value}</b>`;

const getValue = (key: string, value: string | number | boolean, asHtml: boolean) =>
  asHtml ? getHtmlForValue(key, value) : value;

const getFormattedDescription = (
  definition: IModifierDefinition,
  options: { [name: string]: TOptionValue },
  asHtml = false,
): string => {
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

interface IModifierDescriptionProps {
  definition: IModifierDefinition;
  options: { [name: string]: TOptionValue };
  className?: string;
}

/**
 * A component used to render the modifier description. It will use the definition description
 * as a base and substitute the current values into it
 * */
const ModifierDescription: React.FC<IModifierDescriptionProps> = React.memo(
  ({ definition, options, className }) => {
    const classes = useStyles();

    const description = useMemo(() => getFormattedDescription(definition, options, true), [
      definition,
      options,
    ]);

    return (
      <Typography component="div" className={clsx(classes.description, className)}>
        {/* eslint-disable-next-line react/no-danger */}
        <span dangerouslySetInnerHTML={{ __html: description }} />
      </Typography>
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export { ModifierDescription as default, getFormattedDescription };
