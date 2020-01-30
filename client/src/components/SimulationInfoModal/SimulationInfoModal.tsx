import React from 'react';
import {
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  DialogActions,
  IconButton,
  useMediaQuery,
  Tooltip,
} from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Close, InfoOutlined } from '@material-ui/icons';
import { useHashMatch, useReadFromFile } from 'hooks';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { IStore } from 'types/store';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  closeIcon: {
    marginRight: theme.spacing(1),
  },
}));

const SimulationInfoModal = () => {
  const classes = useStyles();
  const open = useHashMatch('#info');
  const history = useHistory();
  const theme = useTheme();

  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const numSimulations = useSelector((state: IStore) => state.config.numSimulations);
  const content = useReadFromFile('simInfo.md', { numSim: numSimulations, totSim: numSimulations * 6 });

  const handleOpen = () => {
    history.push('#info');
  };

  const handleClose = () => {
    history.goBack();
  };

  return (
    <>
      {xs ? (
        <Tooltip title="Info">
          <IconButton onClick={handleOpen}>
            <InfoOutlined />
          </IconButton>
        </Tooltip>
      ) : (
        <Button onClick={handleOpen} endIcon={<InfoOutlined />}>
          Info
        </Button>
      )}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" scroll="paper">
        <DialogTitle className={classes.title}>
          <IconButton onClick={handleClose} size="small" className={classes.closeIcon}>
            <Close />
          </IconButton>
          <span>Simulation Info</span>
        </DialogTitle>
        <DialogContent>
          <ReactMarkdown source={content} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" startIcon={<Close />} onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SimulationInfoModal;
