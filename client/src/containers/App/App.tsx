import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import getTheme from 'themes';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import PdfContainer from 'containers/PdfContainer';
import Simulations from 'containers/Simulations';
import { IStore } from 'types/store';
import About from 'containers/About';
import { ROUTES } from 'utils/urls';
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
        <Route exact path={ROUTES.HOME} component={AppContentWrapper} />
        <Route path={['/units', '/target', '/stats']} component={AppContentWrapper} />
        <Route exact path={ROUTES.SIMULATIONS} component={Simulations} />
        <Route exact path={ROUTES.PDF} component={PdfContainer} />
        <Route exact path={ROUTES.ABOUT} component={About} />

        <Redirect exact from="/units" to={ROUTES.HOME} />
        <Redirect from="/advanced" to={ROUTES.SIMULATIONS} />
        <Redirect to={ROUTES.HOME} />
      </Switch>
    </ThemeProvider>
  </Router>
);

export default connector(App);
