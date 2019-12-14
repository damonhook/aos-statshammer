import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, DialogTitle as Title, AppBar, Toolbar, IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    color: theme.palette.primary.contrastText,
  },
}));

const DialogTitle = ({ header, fullScreen, onClose }) => {
  const classes = useStyles();
  return (
    fullScreen
      ? (
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton onClick={onClose}><Close className={classes.icon} /></IconButton>
            <Typography variant="h6">{header}</Typography>
          </Toolbar>
        </AppBar>
      )
      : <Title>{header}</Title>
  );
};

DialogTitle.defaultProps = {
  fullScreen: false,
};

DialogTitle.propTypes = {
  header: PropTypes.string.isRequired,
  fullScreen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default DialogTitle;
