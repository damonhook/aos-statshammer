import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import getTheme from 'themes';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import PdfContainer from 'containers/PdfContainer';
import Simulations from 'containers/Simulations';
import { IStore } from 'types/store';
import About from 'containers/About';
import { ROUTES } from 'utils/urls';
import AppBar from 'components/AppBar';
import Drawer from 'components/Drawer';
import Footer from 'components/Footer';
import BottomNavigation from 'components/BottomNavigation';
import FloatedContainer from 'containers/FloatedContainer';
import Home from 'containers/Home';
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

const mapStateToProps = (state: IStore) => ({
  config: state.config,
});

const connector = connect(mapStateToProps);
interface AppProps extends ConnectedProps<typeof connector> {}

const App: React.FC<AppProps> = ({ config }) => {
  const classes = useStyles();

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

export default connector(App);
