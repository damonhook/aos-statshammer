import { ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import clsx from 'clsx';
import _ from 'lodash';
import React from 'react';
import type { IModifierDefinition } from 'types/modifiers';

const useStyles = makeStyles((theme) => ({
  body: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  nested: {
    background: theme.palette.background.nested,
  },
  content: {
    flexDirection: 'column',
    flex: 1,
  },
  name: {
    flex: 1,
  },
  description: {
    color: theme.palette.text.secondary,
  },
  icon: {
    flexDirection: 'column',
    margin: 'auto',
  },
}));

interface IModifierOptionProps {
  modifier: IModifierDefinition;
  onClick: (modifier: IModifierDefinition) => void;
  nested?: boolean;
}

/**
 * A single modifier definition
 */
const ModifierOption: React.FC<IModifierOptionProps> = React.memo(
  ({ modifier, onClick, nested }) => {
    const classes = useStyles();
    return (
      <ListItem className={clsx({ [classes.nested]: nested })} onClick={() => onClick(modifier)} button>
        <div className={classes.body}>
          <div className={classes.content}>
            <Typography variant="body1" className={classes.name}>
              {modifier.name}
            </Typography>
            <Typography variant="body2" className={classes.description}>
              {modifier.description}
            </Typography>
          </div>
          <div className={classes.icon}>
            <Add />
          </div>
        </div>
      </ListItem>
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

ModifierOption.defaultProps = {
  nested: false,
};

export default ModifierOption;
