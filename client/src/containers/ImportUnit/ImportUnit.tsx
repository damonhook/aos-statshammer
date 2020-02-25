import { Button, Collapse, Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AttachFile, Close } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import GooglePicker from 'components/GooglePicker';
import Uploader from 'components/Uploader';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { notificationsStore, unitsStore } from 'store/slices';
import { IUnit } from 'types/unit';
import { validateUnit } from 'utils/validators';

const useStyles = makeStyles((theme: Theme) => ({
  import: {
    marginTop: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(0.5),
  },
  desc: {
    marginBottom: theme.spacing(2),
  },
  error: {
    marginBottom: theme.spacing(2),
  },
}));

const ImportUnit = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [error, setError] = useState<string | undefined>(undefined);

  const onUpload = (data: IUnit) => {
    const err = validateUnit(data);
    setError(err);
    if (!err) {
      dispatch(
        notificationsStore.actions.addNotification({
          message: 'Successfully imported unit',
          variant: 'success',
        }),
      );
      dispatch(unitsStore.actions.addUnit({ unit: data }));
      history.goBack();
    }
  };

  const onGDriveUpload = (data: string[]) => {
    data.forEach(datum => {
      onUpload(JSON.parse(datum));
    });
  };

  return (
    <div className={classes.import}>
      <Typography variant="h6" component="h2" className={classes.title}>
        Import Units
      </Typography>
      <Typography className={classes.desc}>Import a unit from Google Drive, or your local machine</Typography>
      <Collapse in={Boolean(error)}>
        <Alert
          className={classes.error}
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError(undefined);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Error Importing Unit</AlertTitle>
          {error ?? 'Invalid Data Format'}
        </Alert>
      </Collapse>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <GooglePicker onUpload={onGDriveUpload} />
        </Grid>
        <Grid item xs={6}>
          <Uploader
            onUpload={onUpload}
            // disabled={!addUnitEnabled}
            component={
              <Button
                variant="contained"
                startIcon={<AttachFile />}
                color="primary"
                // disabled={!addUnitEnabled}
                component="span"
                size="large"
                fullWidth
              >
                Import File
              </Button>
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ImportUnit;
