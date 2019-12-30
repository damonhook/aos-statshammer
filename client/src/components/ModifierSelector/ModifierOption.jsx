import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import { ListItem, Typography } from '@material-ui/core';
import _ from 'lodash';
import clsx from 'clsx';

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

/**
 * A single modifier definition
 */
const ModifierOption = React.memo(({ modifier, onClick, nested }) => {
  const classes = useStyles();
  return (
    <ListItem
      className={clsx(classes.modifierOption, { [classes.nested]: nested })}
      onClick={() => onClick(modifier)}
      button
    >
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
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

ModifierOption.defaultProps = {
  nested: false,
};

ModifierOption.propTypes = {
  /** The modifier definition object */
  modifier: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  /** The callback function to call when the option is clicked */
  onClick: PropTypes.func.isRequired,
  nested: PropTypes.bool,
};

export default ModifierOption;
