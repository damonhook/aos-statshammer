import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Paper, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  footer: {
    textAlign: 'center',
    width: '100%',
  },
  paper: {
    padding: '1em',
  },
  mobile: {
    paddingBottom: '76px',
  },
});

/**
 * The footer that appears at the bottom of the page
 */
const Footer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <footer className={classes.footer}>
      <Paper className={clsx(classes.paper, mobile ? classes.mobile : '')}>
        <Typography variant="body2" component="p">
          Built by: Damon Hook
        </Typography>
        <Typography variant="body2" component="p">
          Disclaimer: This tool is in no way endorsed or sanctioned by Games Workshop - it is
          unofficial and fan-made. I take absolutely no credit for any of the Games Workshop
          content displayed above.
        </Typography>
      </Paper>
    </footer>
  );
};

export default Footer;
