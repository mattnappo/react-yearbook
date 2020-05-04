import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Feed from './Feed';
import NewPost from './NewPost';
import Settings from './Settings';
import Search from './Search';
import Activity from './Activity';
import User from './User';

// App is the main app containing all of the routes.
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/feed" component={Feed} />
    <Route exact path="/post" component={NewPost} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/settings" component={Settings} />
    <Route exact path="/activity" component={Activity} />
    <Route exact path="/accounts/:username" component={User} />
  </Switch>
);

export default App;
