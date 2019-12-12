import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { ImportExport, Add } from '@material-ui/icons';
import { addUnitEnabled } from 'utils/unitHelpers';
import { addNotification } from 'actions/notifications.action';
import Uploader from 'components/Uploader';

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

const AddUnitButton = ({ units, addUnit, addNotification }) => {
  const classes = useStyles();

  const onUpload = (data) => {
    if (data && data.name && data.weapon_profiles) {
      addNotification({ message: 'Successfully imported unit', variant: 'success' });
      addUnit(data.name, data.weapon_profiles);
    }
  };

  return (
    <div className={classes.group}>
      <Button
        fullWidth
        onClick={() => addUnit(`Unit ${units.length + 1}`)}
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
        component={(
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
        )}
      />
    </div>
  );
};

export default connect(null, { addNotification })(AddUnitButton);
