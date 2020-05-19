import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from 'components/AppBar';
import BottomNavigation from 'components/BottomNavigation';
import Drawer from 'components/Drawer';
import Footer from 'components/Footer';
import Loader from 'components/Loader';
import FloatedContainer from 'containers/FloatedContainer';
import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import getTheme from 'themes';
import { IStore } from 'types/store';
import { ROUTES } from 'utils/urls';

import Wrapper from './Wrapper';

const Home = lazy(() => import('containers/Home'));
const Simulations = lazy(() => import('containers/Simulations'));
const PdfContainer = lazy(() => import('containers/PdfContainer'));
const About = lazy(() => import('containers/About'));

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'center',
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}));

const App = () => {
  const classes = useStyles();
  const config = useSelector((state: IStore) => state.config);

  return (
    <Router>
      <ThemeProvider theme={getTheme(config)}>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar />
          <div className={classes.inner}>
            <Drawer />
            <div className={classes.contentWrapper}>
              <Wrapper>
                <Suspense fallback={<Loader />}>
                  <Switch>
                    <Route exact path={ROUTES.HOME} component={Home} />
                    <Route path={['/units', '/target', '/stats']} component={Home} />
                    <Route exact path={ROUTES.SIMULATIONS} component={Simulations} />
                    <Route exact path={ROUTES.PDF} component={PdfContainer} />
                    <Route exact path={ROUTES.ABOUT} component={About} />

                    <Redirect exact from="/units" to={ROUTES.HOME} />
                    <Redirect from="/advanced" to={ROUTES.SIMULATIONS} />
                    <Redirect to={ROUTES.HOME} />
                  </Switch>
                </Suspense>
              </Wrapper>
              <FloatedContainer />
              <Footer />
            </div>
          </div>
          <BottomNavigation />
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
