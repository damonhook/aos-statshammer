import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from 'components/AppBar';
import { EPages, getRoute } from 'types/routes';
import { useReadFromFile } from 'hooks';
import ReactMarkdown from 'react-markdown';
import { Paper, Theme, Typography, Divider, CircularProgress, IconButton, Icon } from '@material-ui/core';
import Footer from 'components/Footer';
import BottomNavigation from 'components/BottomNavigation';
import { grey } from '@material-ui/core/colors';
import { scrollToRef } from 'utils/scrollIntoView';
import { useHistory } from 'react-router-dom';
import { Github, Reddit, Releases } from 'components/SocialButtons';

const useStyles = makeStyles((theme: Theme) => ({
  about: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    width: '100%',
    maxWidth: '900px',
    textAlign: 'center',
    flexDirection: 'column',
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    flexDirection: 'column',
    display: 'flex',
    flex: 1,
  },
  loader: {
    margin: theme.spacing(4),
  },
  logo: {
    margin: '0 auto',
  },
  logoIcon: {
    fontSize: '7rem',
  },
  md: {
    margin: 'auto',
    marginTop: -theme.spacing(2),
    maxWidth: 600,
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
  socialButton: {
    margin: theme.spacing(1),
  },
}));

const About = () => {
  const classes = useStyles();
  const content = useReadFromFile('about.md');
  const history = useHistory();
  const ref = useRef(null);

  useEffect(() => {
    scrollToRef(ref, true);
  });

  const handleLogoClick = () => {
    history.push(getRoute(EPages.HOME));
  };

  return (
    <div className={classes.about} ref={ref}>
      <AppBar variant={EPages.ABOUT} />
      <div className={classes.wrapper}>
        <Paper className={classes.paper}>
          <IconButton onClick={handleLogoClick} className={classes.logo}>
            <Icon color="primary" className={classes.logoIcon}>
              <img src="/logo.svg" alt="Logo" style={{ height: '100%' }} />
            </Icon>
          </IconButton>
          {!content && (
            <div className={classes.loader}>
              <CircularProgress size="6rem" />
            </div>
          )}
          <ReactMarkdown source={content} className={classes.md} />
          <Divider className={classes.divider} />
          <Typography variant="h6">Social:</Typography>
          <div>
            <Github className={classes.socialButton} />
            <Reddit className={classes.socialButton} />
            <Releases className={classes.socialButton} />
          </div>
          <div className={classes.spacer} />
          <Divider className={classes.divider} />
          {process.env.REACT_APP_VERSION && (
            <Typography variant="caption" className={classes.version}>
              {`Current Version: v${process.env.REACT_APP_VERSION}`}
            </Typography>
          )}
        </Paper>
      </div>
      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default About;
