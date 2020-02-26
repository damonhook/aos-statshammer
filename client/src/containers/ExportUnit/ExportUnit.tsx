import { Button, Collapse, Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ArrowBack, Close } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import { GoogleFileUploader } from 'components/GooglePicker';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { unitByUuidSelector } from 'store/selectors';

const useStyles = makeStyles((theme: Theme) => ({
  export: {
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

const ExportUnit = () => {
  const classes = useStyles();
  const history = useHistory();
  const { unitUuid } = useParams();
  const [error, setError] = useState<string | undefined>(undefined);

  const unit = useSelector(unitByUuidSelector)(unitUuid ?? 'no-match');
  if (!unit) {
    history.replace('/');
  }

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.export}>
      <Grid container spacing={2} justify="space-between" alignItems="center" className={classes.title}>
        <Grid item>
          <Typography variant="h6" component="h2">
            Export Unit
          </Typography>
        </Grid>
        <Grid item>
          <Button startIcon={<ArrowBack />} onClick={handleBack}>
            Return
          </Button>
        </Grid>
      </Grid>
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
          <GoogleFileUploader fileName={`${unit.name}.json`} data={unit} />
        </Grid>
        <Grid item xs={6}>
          {/* <Uploader
            onUpload={onUpload}
            component={
              <Button
                variant="contained"
                startIcon={<AttachFile />}
                color="primary"
                component="span"
                size="large"
                fullWidth
              >
                Import File
              </Button>
            }
          /> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default ExportUnit;
