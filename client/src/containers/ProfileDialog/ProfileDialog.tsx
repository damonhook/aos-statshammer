import { Button, Dialog, DialogActions, Slide, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { unitByUuidSelector, unitIndexByUuidSelector } from 'store/selectors';
import { units } from 'store/slices';
import { IWeaponProfile } from 'types/unit';

import DialogContent from './DialogContent';
import DialogTitle from './DialogTitle';
import { errorReducer, profileReducer } from './reducers';

const useStyles = makeStyles(theme => ({
  dialog: {},
  actions: {
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0.5, 1.5, 2, 0),
    },
  },
}));

const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const connector = connect(null, { editWeaponProfile: units.actions.editWeaponProfile });
interface IProfileDialogProps extends ConnectedProps<typeof connector> {
  open: boolean;
}

const ProfileDialog: React.FC<IProfileDialogProps> = ({ editWeaponProfile, open }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const history = useHistory();
  const { unitUuid, profileIndex } = useParams();

  const unitId = useSelector(unitIndexByUuidSelector)(unitUuid ?? 'no-match');
  const unit = useSelector(unitByUuidSelector)(unitUuid ?? 'no-match');
  const id = Number(profileIndex);
  let profile: IWeaponProfile | null = null;
  if (unit && id != null && !Number.isNaN(id)) {
    profile = unit.weapon_profiles[id];
  }

  if (!unit || !profile || unitId == null || id == null) {
    history.replace('/');
  }

  const [state, dispatchState] = useReducer(profileReducer, {
    name: '',
    num_models: 1,
    attacks: 1,
    to_hit: 4,
    to_wound: 4,
    rend: 0,
    damage: 1,
    modifiers: [],
  });

  const [errors, dispatchErrors] = useReducer(errorReducer, {
    num_models: false,
    attacks: false,
    to_hit: false,
    to_wound: false,
    rend: false,
    damage: false,
    modifiers: false,
  });

  useEffect(() => {
    if (profile) {
      dispatchState({ type: 'INIT_PROFILE', profile });
    }
  }, [profile]);

  const setStateByName = useCallback((name, val) => {
    dispatchState({ type: 'SET_PROFILE', name, val });
  }, []);

  const setErrorByName = useCallback((name, error) => {
    dispatchErrors({ type: 'SET_ERROR', name, error });
  }, []);

  const handleClose = useCallback(() => {
    history.goBack();
  }, [history]);

  const submit = useCallback(() => {
    editWeaponProfile({ index: unitId, profileIndex: id, weaponProfile: state });
    handleClose();
  }, [editWeaponProfile, handleClose, id, state, unitId]);

  const submitDisabled = useMemo(() => Object.keys(errors).some(k => errors[k]), [errors]);

  if (!profile) return null;
  return (
    <Dialog
      open={open}
      className={classes.dialog}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      fullScreen={mobile}
      scroll="paper"
      TransitionComponent={Transition}
    >
      <DialogTitle header="Edit Profile" fullScreen={mobile} onClose={handleClose} />
      <DialogContent
        profile={state}
        onChange={setStateByName}
        onSubmit={submit}
        errorCallback={setErrorByName}
        submitDisabled={submitDisabled}
        dispatchState={dispatchState}
      />
      <DialogActions className={classes.actions}>
        <Button
          size={mobile ? 'large' : 'medium'}
          onClick={handleClose}
          color="secondary"
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          size={mobile ? 'large' : 'medium'}
          onClick={() => submit()}
          color="primary"
          variant="contained"
          disabled={submitDisabled}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connector(ProfileDialog);
