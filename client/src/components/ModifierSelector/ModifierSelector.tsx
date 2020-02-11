import React, { useCallback } from 'react';
import { Button, Collapse, useMediaQuery, Paper } from '@material-ui/core';
import { Add, Remove, Sync } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useHashMatch } from 'hooks';
import { IModifierDefinition } from 'types/modifiers';
import { TError } from 'types/store';
import { HASHES } from 'utils/urls';
import ModifierOption from './ModifierOption';
import SelectorDialog from './SelectorDialog';

const useStyles = makeStyles(() => ({
  selector: { marginTop: '1em', marginBottom: '1em' },
  list: {},
  button: { justifyContent: 'left' },
}));

interface IModifierSelectorProps {
  modifiers: IModifierDefinition[];
  pending: boolean;
  error: TError;
  onClick: (mod: IModifierDefinition) => void;
  disabled?: boolean;
  nested?: boolean;
}

/**
 * A component used to select new modifiers to apply
 */
const ModifierSelector: React.FC<IModifierSelectorProps> = React.memo(
  ({ modifiers, pending, error, onClick, disabled, nested }) => {
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const history = useHistory();
    const open = useHashMatch(HASHES.MODIFIERS);

    const handleOpen = () => {
      history.push(HASHES.MODIFIERS);
    };

    const handleClose = useCallback(() => {
      history.goBack();
    }, [history]);

    const addModifier = useCallback(
      modifier => {
        handleClose();
        onClick(modifier);
      },
      [handleClose, onClick],
    );

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
    if (error || !modifiers?.length) {
      return null;
    }
    return (
      <div className={classes.selector}>
        {open && !mobile ? (
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
        ) : (
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
        {mobile ? (
          <SelectorDialog modifiers={modifiers} addModifier={addModifier} hash={HASHES.MODIFIERS} />
        ) : (
          <Collapse in={open} timeout={{ enter: 200, exit: 0 }}>
            <Paper className={classes.list} square>
              {modifiers.map(modifier => (
                <ModifierOption modifier={modifier} onClick={addModifier} key={modifier.id} nested={nested} />
              ))}
            </Paper>
          </Collapse>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

ModifierSelector.defaultProps = {
  disabled: false,
  nested: false,
};

export default ModifierSelector;
