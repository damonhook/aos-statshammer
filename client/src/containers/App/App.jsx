import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import getTheme from 'themes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppContentWrapper from './AppContentWrapper';


const App = ({ config }) => (
  <Router>
    <ThemeProvider theme={getTheme(config)}>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={AppContentWrapper} />
        <Route path="/units" component={AppContentWrapper} />
        <Redirect to="/" />
      </Switch>
    </ThemeProvider>
  </Router>
);

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  config: state.config,
});

export default connect(mapStateToProps)(App);
