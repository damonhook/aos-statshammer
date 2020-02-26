import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from 'components/AppBar';
import BottomNavigation from 'components/BottomNavigation';
import Drawer from 'components/Drawer';
import Footer from 'components/Footer';
import About from 'containers/About';
import FloatedContainer from 'containers/FloatedContainer';
import Home from 'containers/Home';
import PdfContainer from 'containers/PdfContainer';
import Simulations from 'containers/Simulations';
import { GoogleApiProvider } from 'context';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import getTheme from 'themes';
import { IStore } from 'types/store';
import { ROUTES } from 'utils/urls';

import Wrapper from './Wrapper';

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
        <GoogleApiProvider>
          <CssBaseline />
          <div className={classes.root}>
            <AppBar />
            <div className={classes.inner}>
              <Drawer />
              <div className={classes.contentWrapper}>
                <Wrapper>
                  <Switch>
                    <Route exact path={ROUTES.HOME} component={Home} />
                    <Route exact path={ROUTES.SIMULATIONS} component={Simulations} />
                    <Route exact path={ROUTES.PDF} component={PdfContainer} />
                    <Route exact path={ROUTES.ABOUT} component={About} />
                    <Route path={['/units', '/target', '/stats']} component={Home} />

                    <Redirect exact from="/units" to={ROUTES.HOME} />
                    <Redirect from="/advanced" to={ROUTES.SIMULATIONS} />
                    <Redirect to={ROUTES.HOME} />
                  </Switch>
                </Wrapper>
                <FloatedContainer />
                <Footer />
              </div>
            </div>
            <BottomNavigation />
          </div>
        </GoogleApiProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
