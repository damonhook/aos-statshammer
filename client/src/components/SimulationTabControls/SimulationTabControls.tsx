import React from 'react';
import SimulationInfoModal from 'components/SimulationInfoModal';
import { IconButton, Button, useMediaQuery, Tooltip } from '@material-ui/core';
import { ArrowBack, Refresh } from '@material-ui/icons';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { getRoute, EPages } from 'types/routes';
import { fetchSimulations } from 'api';
import { useDispatch } from 'react-redux';
import SimulationConfigDialog from 'components/SimulationConfigDialog';

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
}));

interface ISimulationTabControlsProps {
  pending?: boolean;
}

const SimulationTabControls: React.FC<ISimulationTabControlsProps> = ({ pending }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClick = () => {
    history.push(getRoute(EPages.HOME));
  };

  const handleRerun = () => {
    dispatch(fetchSimulations());
  };

  return (
    <div className={classes.simTabControls}>
      <div className={classes.group}>
        {xs ? (
          <>
            <Tooltip title="Return">
              <IconButton className={classes.spacedItem} onClick={handleClick}>
                <ArrowBack />
              </IconButton>
            </Tooltip>
            <Tooltip title="Rerun Simulations">
              <IconButton className={classes.spacedItem} onClick={handleRerun}>
                <Refresh />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Button startIcon={<ArrowBack />} className={classes.spacedItem} onClick={handleClick}>
              Return
            </Button>
            <Button startIcon={<Refresh />} onClick={handleRerun} disabled={pending}>
              {`Rerun ${md ? '' : 'Simulations'}`}
            </Button>
          </>
        )}
      </div>
      <div className={classes.group}>
        <SimulationConfigDialog />
        <SimulationInfoModal />
      </div>
    </div>
  );
};
export default SimulationTabControls;
