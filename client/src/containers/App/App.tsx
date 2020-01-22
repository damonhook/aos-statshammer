import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import getTheme from 'themes';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import PdfContainer from 'containers/PdfContainer';
import Simulations from 'containers/Simulations';
import { IStore } from 'types/store';
import { getRoute, EPages } from 'types/routes';
import About from 'containers/About';
import AppContentWrapper from './AppContentWrapper';

const mapStateToProps = (state: IStore) => ({
  config: state.config,
});

const connector = connect(mapStateToProps);
interface AppProps extends ConnectedProps<typeof connector> {}

const App: React.FC<AppProps> = ({ config }) => (
  <Router>
    <ThemeProvider theme={getTheme(config)}>
      <CssBaseline />
      <Switch>
        <Route exact path={getRoute(EPages.HOME)} component={AppContentWrapper} />
        <Route path={['/units', '/target', '/stats']} component={AppContentWrapper} />
        <Route exact path={getRoute(EPages.SIMULATIONS)} component={Simulations} />
        <Route exact path={getRoute(EPages.PDF)} component={PdfContainer} />
        <Route exact path={getRoute(EPages.ABOUT)} component={About} />

        <Redirect exact from="/units" to={getRoute(EPages.HOME)} />
        <Redirect from="/advanced" to={getRoute(EPages.SIMULATIONS)} />
        <Redirect to={getRoute(EPages.HOME)} />
      </Switch>
    </ThemeProvider>
  </Router>
);

export default connector(App);
