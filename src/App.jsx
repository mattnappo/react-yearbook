import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import MainApp from './MainApp';

// App is the main app containing all of the routes.
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/app" component={MainApp} />
  </Switch>
);

export default App;
