import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, ImportExport } from '@material-ui/icons';
import Uploader from 'components/Uploader';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUnitEnabledSelector } from 'store/selectors';
import { notificationsStore, unitsStore } from 'store/slices';
import type { IUnitStore } from 'types/store';
import type { IUnit } from 'types/unit';

const useStyles = makeStyles({
  group: {
    display: 'flex',
  },
  button: {
    marginRight: '0.5em',

    '&:last-child': {
      marginRight: 0,
    },
  },
});

interface IAddUnitButtonProps {
  units: IUnitStore;
}

const AddUnitButton = ({ units }: IAddUnitButtonProps) => {
  const classes = useStyles();
  const addUnitEnabled = useSelector(addUnitEnabledSelector);
  const dispatch = useDispatch();

  const onUpload = (data: IUnit) => {
    if (data && data.name && data.weapon_profiles) {
      dispatch(
        notificationsStore.actions.addNotification({
          message: 'Successfully imported unit',
          variant: 'success',
        }),
      );
      dispatch(unitsStore.actions.addUnit({ unit: data }));
    }
  };

  const handleaddUnit = () => {
    dispatch(unitsStore.actions.addUnit({ unit: { name: `Unit ${units.length + 1}` } }));
  };

  return (
    <div className={classes.group}>
      <Button
        fullWidth
        onClick={handleaddUnit}
        variant="contained"
        startIcon={<Add />}
        color="primary"
        disabled={!addUnitEnabled}
        className={classes.button}
      >
        Add Unit
      </Button>
      <Uploader
        onUpload={onUpload}
        disabled={!addUnitEnabled}
        component={
          <Button
            variant="contained"
            startIcon={<ImportExport />}
            color="primary"
            disabled={!addUnitEnabled}
            className={classes.button}
            component="span"
          >
            Import
          </Button>
        }
      />
    </div>
  );
};

export default AddUnitButton;
