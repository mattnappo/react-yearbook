import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import OAuth from './OAuth';
import Feed from './Feed';
import NewPost from './NewPost';
import Settings from './Settings';
import Search from './Search';
import Activity from './Activity';
import User from './User';
import SinglePost from './SinglePost';
import Test from './Test';

// App is the main app containing all of the routes.
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/oauth" component={OAuth} />

    <Route exact path="/feed" component={Feed} />
    <Route exact path="/post" component={NewPost} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/settings" component={Settings} />
    <Route exact path="/activity" component={Activity} />
    <Route exact path="/accounts/:username" component={User} />
    <Route exact path="/viewPost" component={SinglePost} />

    <Route exact path="/test" component={Test} />
  </Switch>
);

export default App;
