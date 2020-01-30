import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from 'types/store';
import { useHashMatch } from 'hooks';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Slider,
  Button,
  Tooltip,
  Typography,
  DialogActions,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import appConfig from 'appConfig';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { config as configStore } from 'store/slices';

const useStyles = makeStyles((theme: Theme) => ({
  numSimText: {},
  slider: {
    display: 'flex',
    margin: theme.spacing(5, 0, 2),
  },
  sliderText: {
    marginLeft: theme.spacing(2.5),
  },
}));

interface ISimulationConfigDialogProps {
  className?: string;
}

const SimulationConfigDialog: React.FC<ISimulationConfigDialogProps> = ({ className }) => {
  const classes = useStyles();
  const open = useHashMatch('#num-sims');
  const history = useHistory();
  const dispatch = useDispatch();
  const numSimulations = useSelector((state: IStore) => state.config.numSimulations);
  const [numSims, setNumSims] = useState(numSimulations);

  const handleOpen = () => {
    history.push('#num-sims');
    setNumSims(numSimulations);
  };

  const handleClose = () => {
    history.goBack();
  };

  const handleConfirm = () => {
    dispatch(configStore.actions.changeNumSimulations({ newValue: numSims }));
    handleClose();
  };

  const handleReset = () => {
    setNumSims(appConfig.simulations.default);
  };

  const handleChangeNumSimulations = (event: any, value: number | number[]) => {
    let newValue: number;
    if (Array.isArray(value)) [newValue] = value;
    else newValue = value;
    setNumSims(newValue);
  };

  return (
    <>
      <Tooltip title="Number of simulations run per save (sample size)">
        <Button className={clsx(classes.numSimText, className)} onClick={handleOpen}>
          <b># Simulations:&nbsp;</b>
          {numSimulations}
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Number of Simulations</DialogTitle>
        <DialogContent>
          <Typography>
            Customize the number of simulations used (per save). Lower simulation counts may result in less
            accurate results, while Higher simulation counts may result in longer load times
          </Typography>
          <div className={classes.slider}>
            <Slider
              defaultValue={appConfig.simulations.default}
              valueLabelDisplay="auto"
              step={1000}
              marks={[{ value: appConfig.simulations.default, label: 'Default' }]}
              min={appConfig.simulations.min}
              max={appConfig.simulations.max}
              value={numSims}
              onChange={handleChangeNumSimulations}
            />
            <Typography className={classes.sliderText}>{numSims}</Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SimulationConfigDialog;
