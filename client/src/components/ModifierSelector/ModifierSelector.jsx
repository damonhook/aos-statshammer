import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Collapse, useMediaQuery, Paper,
} from '@material-ui/core';
import { Add, Remove, Sync } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useHashMatch } from 'hooks';
import ModifierOption from './ModifierOption';
import SelectorDialog from './SelectorDialog';

const useStyles = makeStyles(() => ({
  selector: { marginTop: '1em', marginBottom: '1em' },
  list: {},
  button: { justifyContent: 'left' },
}));

/**
 * A component used to select new modifiers to apply
 */
const ModifierSelector = React.memo(({
  modifiers, pending, error, onClick, disabled, nested,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  const editPath = '#modifiers';
  const open = useHashMatch(editPath);

  const handleOpen = () => {
    history.push(editPath);
  };

  const handleClose = useCallback(() => {
    history.goBack();
  }, [history]);

  const addModifier = useCallback((modifier) => {
    handleClose();
    onClick(modifier);
  }, [handleClose, onClick]);

  if (pending) {
    return (
      <div className={classes.selector}>
        <Button
          startIcon={<Sync />}
          variant="contained"
          disabled
          fullWidth
          className={classes.button}
          size={mobile ? 'large' : 'medium'}
        >
          Loading Modifiers
        </Button>
      </div>
    );
  }
  if (error || !modifiers || !modifiers.length) {
    return null;
  }
  return (
    <div className={classes.selector}>
      {open && !mobile
        ? (
          <Button
            className={classes.button}
            fullWidth
            variant="contained"
            onClick={handleClose}
            startIcon={<Remove />}
            color="secondary"
            size={mobile ? 'large' : 'medium'}
          >
            Cancel
          </Button>
        )
        : (
          <Button
            className={classes.button}
            fullWidth
            variant="contained"
            onClick={handleOpen}
            startIcon={<Add />}
            color="primary"
            disabled={pending || disabled}
            size={mobile ? 'large' : 'medium'}
          >
            Add Modifier
          </Button>
        )}
      {mobile
        ? (
          <SelectorDialog modifiers={modifiers} addModifier={addModifier} hash={editPath} />
        )
        : (
          <Collapse in={open} timeout={{ enter: 200, exit: 0 }}>
            <Paper className={classes.list} square>
              {modifiers.map((modifier) => (
                <ModifierOption
                  modifier={modifier}
                  onClick={addModifier}
                  key={modifier.id}
                  nested={nested}
                />
              ))}
            </Paper>
          </Collapse>
        )}
    </div>
  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

ModifierSelector.defaultProps = {
  error: null,
  disabled: false,
  nested: false,
};

ModifierSelector.propTypes = {
  /** A list of modifier definitions to display in the selector */
  modifiers: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Whether the modifier definitions are currently loading */
  pending: PropTypes.bool.isRequired,
  /** Whether there was an error loading the modifier definitions */
  error: PropTypes.string,
  /** A callback function to call when an item in the list is clicked */
  onClick: PropTypes.func.isRequired,
  /** Whether the selector is disabled or not */
  disabled: PropTypes.bool,
  nested: PropTypes.bool,
};

export default ModifierSelector;
