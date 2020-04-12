import React from 'react';
import { Switch, Route } from 'react-router-dom';

// App is the main app containing all of the routes.
const App = () => (
  <Switch>
    {/* <Route exact path="/" component={} /> */}
    <Route exact path="/" />
  </Switch>
);

export default App;
