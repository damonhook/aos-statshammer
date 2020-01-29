import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Paper, useMediaQuery, Button, IconButton } from '@material-ui/core';
import { GitHub, Reddit } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  footer: {
    textAlign: 'center',
    width: '100%',
  },
  paper: {
    padding: '1em',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(7),
    },
  },
  Actions: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
  mobileActions: {
    justifyContent: 'flex-start',
    padding: theme.spacing(1.5, 0),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1, 0, 0),
    },
  },
  footerButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(0.5),
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
}));

/**
 * The footer that appears at the bottom of the page
 */
const Footer: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <footer className={classes.footer}>
      <Paper className={clsx(classes.paper)}>
        <Typography variant="body2" component="p">
          Built by: Damon Hook&nbsp;
          <i>(NoMaDhOoK)</i>
        </Typography>
        <Typography variant="body2" component="p">
          Disclaimer: This tool is in no way endorsed or sanctioned by Games Workshop - it is unofficial and
          fan-made. I take absolutely no credit for any of the Games Workshop content displayed above.
        </Typography>
        <Typography component="div" className={clsx(classes.Actions, mobile ? classes.mobileActions : null)}>
          {!xs ? (
            <div>
              <Button
                size={mobile ? 'medium' : 'small'}
                className={classes.footerButton}
                startIcon={<GitHub />}
                variant="contained"
                href="https://github.com/damonhook/aos-statshammer"
                target="_blank"
              >
                GitHub
              </Button>
              <Button
                size={mobile ? 'medium' : 'small'}
                className={classes.footerButton}
                startIcon={<Reddit />}
                variant="contained"
                href="https://www.reddit.com/r/AoSStatshammer"
                target="_blank"
              >
                Reddit
              </Button>
            </div>
          ) : (
            <div>
              <IconButton
                className={classes.footerButton}
                href="https://github.com/damonhook/aos-statshammer"
                target="_blank"
              >
                <GitHub fontSize="large" />
              </IconButton>
              <IconButton
                className={classes.footerButton}
                href="https://www.reddit.com/r/AoSStatshammer"
                target="_blank"
              >
                <Reddit fontSize="large" />
              </IconButton>
            </div>
          )}
        </Typography>
      </Paper>
    </footer>
  );
};

export default Footer;
