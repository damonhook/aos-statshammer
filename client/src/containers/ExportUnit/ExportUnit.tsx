import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ArrowBack, Close, Computer, Refresh } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import { GoogleFileUploader } from 'components/GooglePicker';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { unitByUuidSelector } from 'store/selectors';
import { notificationsStore } from 'store/slices';

const useStyles = makeStyles((theme: Theme) => ({
  export: {
    margin: theme.spacing(2, 1),
    overflow: 'hidden',
  },
  title: {
    marginBottom: theme.spacing(0.5),
  },
  desc: {
    marginBottom: theme.spacing(1),
  },
  name: {
    marginBottom: theme.spacing(2),
  },
  error: {
    marginBottom: theme.spacing(2),
  },
}));

const ExportUnit = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { unitUuid } = useParams();
  const [name, setName] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const unit = useSelector(unitByUuidSelector)(unitUuid ?? 'no-match');
  if (!unit) {
    history.replace('/');
  }

  useEffect(() => {
    setName(unit.name);
  }, [unit.name]);

  const handleResetName = () => {
    setName(unit.name);
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleDownload = () => {
    const data = encodeURIComponent(JSON.stringify(unit));
    const a = document.createElement('a');
    a.href = `data:text/json;charset=utf-8,${data}`;
    a.download = `${name}.json`;
    a.click();
    const message = `Exported Unit: ${name}`;
    dispatch(notificationsStore.actions.addNotification({ message, variant: 'success' }));
    handleBack();
  };

  const onGdriveUpload = (err: string | undefined) => {
    setError(err);
    if (!err) {
      const message = `Exported Unit: ${name}`;
      dispatch(notificationsStore.actions.addNotification({ message, variant: 'success' }));
      handleBack();
    }
  };

  return (
    <div className={classes.export}>
      <Grid container spacing={2} justify="space-between" alignItems="center" className={classes.title}>
        <Grid item>
          <Typography variant="h6" component="h2">
            {`Export Unit: ${unit.name}`}
          </Typography>
        </Grid>
        <Grid item>
          <Button startIcon={<ArrowBack />} onClick={handleBack}>
            Return
          </Button>
        </Grid>
      </Grid>
      <Typography className={classes.desc}>
        Export the selected unit to Google Drive, or your local machine
      </Typography>
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
          <AlertTitle>Error Exporting Unit</AlertTitle>
          {error ?? 'Invalid Data Format'}
        </Alert>
      </Collapse>
      <Grid container spacing={1} className={classes.name} alignItems="center">
        <Grid item style={{ flex: 1 }}>
          <TextField
            fullWidth
            variant="filled"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
            label="Filename"
            InputProps={{
              endAdornment: <span>.json</span>,
            }}
          />
        </Grid>
        <Grid item>
          <IconButton onClick={handleResetName}>
            <Refresh />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <GoogleFileUploader fileName={`${name}.json`} data={unit} onUpload={onGdriveUpload} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="Download Local" titleTypographyProps={{ align: 'center' }} />
            <CardContent>
              <Button
                variant="contained"
                startIcon={<Computer />}
                color="primary"
                component="span"
                size="large"
                fullWidth
                onClick={handleDownload}
              >
                Save Local
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExportUnit;
