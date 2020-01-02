import React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import getTheme from 'themes';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import PdfContainer from 'containers/PdfContainer';
import AdvancedStats from 'containers/AdvancedStats';
import AppContentWrapper from './AppContentWrapper';
import { IConfigStore, IStore } from 'types/store';

interface AppProps {
  config: IConfigStore;
}

const App: React.FC<AppProps> = ({ config }) => (
  <Router>
    <ThemeProvider theme={getTheme(config)}>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={AppContentWrapper} />
        <Redirect exact from="/units" to="/" />
        <Route path={['/units', '/target', '/stats']} component={AppContentWrapper} />
        <Route exact path="/advanced" component={AdvancedStats} />
        <Route exact path="/pdf" component={PdfContainer} />
        <Redirect to="/" />
      </Switch>
    </ThemeProvider>
  </Router>
);

const mapStateToProps = (state: IStore) => ({
  config: state.config,
});

export default connect(mapStateToProps)(App);
