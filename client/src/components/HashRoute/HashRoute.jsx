import React from 'react';
import { Route } from 'react-router-dom';

const HashRoute = ({ hash, ...routeProps }) => (
  <Route
    render={({ location }) => (
      (location.hash === hash) && <Route {...routeProps} />
    )}
  />
);

export default HashRoute;
