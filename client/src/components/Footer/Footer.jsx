import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Typography, Paper, useMediaQuery, Button,
} from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  footer: {
    textAlign: 'center',
    width: '100%',
  },
  paper: {
    padding: '1em',
  },
  Actions: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
  mobileActions: {
    justifyContent: 'flex-start',
    padding: theme.spacing(1.5, 0),
  },
}));

/**
 * The footer that appears at the bottom of the page
 */
const Footer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <footer className={classes.footer}>
      <Paper className={clsx(classes.paper)}>
        <Typography variant="body2" component="p">
          Built by: Damon Hook
        </Typography>
        <Typography variant="body2" component="p">
          Disclaimer: This tool is in no way endorsed or sanctioned by Games Workshop - it is
          unofficial and fan-made. I take absolutely no credit for any of the Games Workshop
          content displayed above.
        </Typography>
        <Typography
          component="div"
          className={clsx(classes.Actions, mobile ? classes.mobileActions : null)}
        >
          <Button
            size={mobile ? 'medium' : 'small'}
            className={classes.icon}
            startIcon={<GitHub />}
            variant="contained"
            href="https://github.com/damonhook/aos-statshammer"
            target="_blank"
          >
            Github
          </Button>
        </Typography>
      </Paper>
    </footer>
  );
};

export default Footer;
