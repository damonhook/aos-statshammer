import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { basicTheme } from 'themes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AppContentWrapper from './AppContentWrapper';


const App = () => (
  <Router>
    <ThemeProvider theme={basicTheme}>
      <Switch>
        <Route exact path="/" component={AppContentWrapper} />
        <Route path="/units" component={AppContentWrapper} />
        <Redirect to="/" />
      </Switch>
    </ThemeProvider>
  </Router>
);


export default App;
