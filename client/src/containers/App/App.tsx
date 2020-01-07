import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import getTheme from 'themes';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import PdfContainer from 'containers/PdfContainer';
import AdvancedStats from 'containers/AdvancedStats';
import { IStore } from 'types/store';
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

export default connector(App);
