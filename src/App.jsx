import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Other from './Other';

// App is the main app containing all of the routes.
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/other" component={Other} />
  </Switch>
);

export default App;
