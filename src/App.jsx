import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import MainApp from './MainApp';
import User from './User';

// App is the main app containing all of the routes.
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/app" component={MainApp} />
    <Route exact path="/accounts/:username" component={User} />
  </Switch>
);

export default App;
