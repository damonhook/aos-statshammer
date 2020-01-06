import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { ImportExport, Add } from '@material-ui/icons';
import { addUnitEnabled } from 'utils/unitHelpers';
import { notifications } from 'store/slices';
import Uploader from 'components/Uploader';
import { IUnitStore } from 'types/store';
import { IUnit } from 'types/unit';
import { units } from 'store/slices';

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

const connector = connect(null, {
  addNotification: notifications.actions.addNotification,
  addUnit: units.actions.addUnit,
});
interface AddUnitButtonProps extends ConnectedProps<typeof connector> {
  units: IUnitStore;
}

const AddUnitButton: React.FC<AddUnitButtonProps> = ({ units, addUnit, addNotification }) => {
  const classes = useStyles();

  const onUpload = (data: IUnit) => {
    if (data && data.name && data.weapon_profiles) {
      addNotification({ message: 'Successfully imported unit', variant: 'success' });
      addUnit({ name: data.name, weapon_profiles: data.weapon_profiles });
    }
  };

  return (
    <div className={classes.group}>
      <Button
        fullWidth
        onClick={() => addUnit({ name: `Unit ${units.length + 1}` })}
        variant="contained"
        startIcon={<Add />}
        color="primary"
        disabled={!addUnitEnabled()}
        className={classes.button}
      >
        Add Unit
      </Button>
      <Uploader
        onUpload={onUpload}
        disabled={!addUnitEnabled()}
        component={
          <Button
            variant="contained"
            startIcon={<ImportExport />}
            color="primary"
            disabled={!addUnitEnabled()}
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

export default connector(AddUnitButton);
