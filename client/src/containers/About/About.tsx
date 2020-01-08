import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from 'components/AppBar';
import { EPages } from 'types/routes';
import { useReadFromFile } from 'hooks';
import ReactMarkdown from 'react-markdown';
import { Paper, Theme, Typography, Divider, Button } from '@material-ui/core';
import { GitHub, Reddit, Assessment as Logo } from '@material-ui/icons';
import Footer from 'components/Footer';
import BottomNavigation from 'components/BottomNavigation';
import { grey } from '@material-ui/core/colors';
import { scrollToRef } from 'utils/scrollIntoView';

const useStyles = makeStyles((theme: Theme) => ({
  about: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
  },
  paper: {
    flex: 1,
    width: 'auto',
    maxWidth: '900px',
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    fontSize: '128px',
    margin: '0 auto',
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  spacer: {
    flex: 1,
  },
  version: {
    display: 'flex',
    justifyContent: 'flex-end',
    color: grey[500],
  },
  socialActions: {
    marginTop: theme.spacing(1),
  },
  socialButton: {
    marginRight: theme.spacing(2),
  },
}));

const About = () => {
  const classes = useStyles();
  const content = useReadFromFile('about.md');
  const ref = useRef(null);

  useEffect(() => {
    scrollToRef(ref, true);
  });

  return (
    <div className={classes.about} ref={ref}>
      <AppBar variant={EPages.ABOUT} />
      <Paper className={classes.paper}>
        <Logo className={classes.logo} />
        <ReactMarkdown source={content} />
        <Divider className={classes.divider} />
        <Typography variant="h6">Social:</Typography>
        <div className={classes.socialActions}>
          <Button
            className={classes.socialButton}
            startIcon={<GitHub />}
            variant="contained"
            href="https://github.com/damonhook/aos-statshammer"
            target="_blank"
          >
            GitHub
          </Button>
          <Button
            className={classes.socialButton}
            startIcon={<Reddit />}
            variant="contained"
            href="https://www.reddit.com/r/AoSStatshammer"
            target="_blank"
          >
            Reddit
          </Button>
        </div>
        <div className={classes.spacer} />
        <Divider className={classes.divider} />
        {process.env.REACT_APP_VERSION && (
          <Typography variant="caption" className={classes.version}>
            {`Current Version: v${process.env.REACT_APP_VERSION}`}
          </Typography>
        )}
      </Paper>
      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default About;
