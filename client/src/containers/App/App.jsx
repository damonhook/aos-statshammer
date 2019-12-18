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
import PDFViewer from 'pdf';
import AppContentWrapper from './AppContentWrapper';


const App = ({ config }) => (
  <Router>
    <ThemeProvider theme={getTheme(config)}>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={AppContentWrapper} />
        <Redirect exact from="/units" to="/" />
        <Route path="/units" component={AppContentWrapper} />
        <Route exact path="/pdf" component={PDFViewer} />
        <Redirect to="/" />
      </Switch>
    </ThemeProvider>
  </Router>
);

App.propTypes = {
  config: PropTypes.shape({
    darkMode: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  config: state.config,
});

export default connect(mapStateToProps)(App);
