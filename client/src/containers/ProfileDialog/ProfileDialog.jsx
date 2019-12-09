import React, { useState, useEffect } from 'react';
import {
  Button, Dialog, useMediaQuery, DialogActions,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { editWeaponProfile } from 'actions/weaponProfiles.action';
import { bindActionCreators } from 'redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import DialogTitle from './DialogTitle';
import DialogContent from './DialogContent';


const useStyles = makeStyles(() => ({
  dialog: {},
  actionButton: {},
}));

const ProfileDialog = ({
  id, editWeaponProfile, unitId, profile, header, open,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const [state, setState] = useState({
    num_models: 1,
    attacks: 1,
    to_hit: 4,
    to_wound: 4,
    rend: 0,
    damage: 1,
    modifiers: [],
  });

  const [errors, setErrors] = useState({
    num_models: false,
    attacks: false,
    to_hit: false,
    to_wound: false,
    rend: false,
    damage: false,
    modifiers: false,
  });

  useEffect(() => {
    if (open) {
      setState({
        num_models: profile.num_models,
        attacks: profile.attacks,
        to_hit: profile.to_hit,
        to_wound: profile.to_wound,
        rend: profile.rend,
        damage: profile.damage,
        modifiers: profile.modifiers,
      });
    }
  }, [open, profile]);

  const setStateByName = (name, newVal) => {
    setState({
      ...state,
      [name]: newVal,
    });
  };

  const setErrorByName = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const submitDisabled = Object.keys(errors).some((k) => errors[k]);

  const handleClose = () => {
    history.goBack();
  };

  const submit = () => {
    editWeaponProfile(id, state, unitId);
    handleClose();
  };

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
    >
      <DialogTitle header={header} fullScreen={mobile} onClose={handleClose} />
      <DialogContent
        profile={state}
        onChange={setStateByName}
        onSubmit={submit}
        errorCallback={setErrorByName}
        submitDisabled={submitDisabled}
      />
      <DialogActions>
        <Button
          className={classes.actionButton}
          size={mobile ? 'large' : 'medium'}
          onClick={handleClose}
          color="secondary"
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          className={classes.actionButton}
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


const mapDispatchToProps = (dispatch) => bindActionCreators({
  editWeaponProfile,
}, dispatch);

export default connect(null, mapDispatchToProps)(ProfileDialog);
