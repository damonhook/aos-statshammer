import React from 'react';
import SimulationInfoModal from 'components/SimulationInfoModal';
import { Button, Typography, Tooltip, useMediaQuery } from '@material-ui/core';
import { ArrowBack, Refresh } from '@material-ui/icons';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { getRoute, EPages } from 'types/routes';
import { NUM_SIMULATIONS } from 'appConstants';
import { fetchSimulations } from 'api';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) => ({
  simTabControls: {
    padding: theme.spacing(1, 2),
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.palette.background.paper,
  },
  group: {
    display: 'flex',
    alignItems: 'center',
  },
  spacedItem: {
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1),
    },
  },
  numSimText: {
    cursor: 'help',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

const SimulationTabControls = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));

  const handleClick = () => {
    history.push(getRoute(EPages.HOME));
  };

  const handleRerun = () => {
    dispatch(fetchSimulations());
  };

  return (
    <div className={classes.simTabControls}>
      <div className={classes.group}>
        <Button startIcon={<ArrowBack />} className={classes.spacedItem} onClick={handleClick}>
          Return
        </Button>
        <Button startIcon={<Refresh />} onClick={handleRerun}>
          {`Rerun ${md ? '' : 'Simulations'}`}
        </Button>
      </div>
      <div className={classes.group}>
        <Tooltip title="Number of simulations run per save (sample size)">
          <Typography className={clsx(classes.spacedItem, classes.numSimText)}>
            <b># Simulations: </b>
            {NUM_SIMULATIONS}
          </Typography>
        </Tooltip>
        <SimulationInfoModal />
      </div>
    </div>
  );
};
export default SimulationTabControls;
