import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { basicTheme } from 'themes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import AppContentWrapper from './AppContentWrapper';


const App = () => (
  <Router>
    <ThemeProvider theme={basicTheme}>
      <Switch>
        <Route path="/">
          <AppContentWrapper />
        </Route>
      </Switch>
    </ThemeProvider>
  </Router>
);


export default App;
