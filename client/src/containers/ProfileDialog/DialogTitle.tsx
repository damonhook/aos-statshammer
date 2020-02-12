import { AppBar, DialogTitle as Title, IconButton, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    color: theme.palette.primary.contrastText,
  },
}));

interface IDialogTitleProps {
  header: string;
  fullScreen?: boolean;
  onClose: () => void;
}

const DialogTitle: React.FC<IDialogTitleProps> = ({ header, fullScreen = false, onClose }) => {
  const classes = useStyles();
  return fullScreen ? (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton onClick={onClose}>
          <Close className={classes.icon} />
        </IconButton>
        <Typography variant="h6">{header}</Typography>
      </Toolbar>
    </AppBar>
  ) : (
    <Title>{header}</Title>
  );
};

export default DialogTitle;
