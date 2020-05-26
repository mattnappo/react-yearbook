import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Home from './Home';
import OAuth from './OAuth';
import Feed from './Feed';
import NewPost from './NewPost';
import Settings from './Settings';
import Search from './Search';
import Activity from './Activity';
import User from './User';
import SinglePost from './SinglePost';
import Beta from './Beta';

// App is the main app containing all of the routes.
const App = () => {
  const cookies = new Cookies();

  return (
    <Switch>
      {
        cookies.get('access') === 'testing_the_beta' ? (
          <Route exact path="/" component={Home} />
        ) : (
          <Route exact path="/" component={Beta} />
        )
      }
      <Route exact path="/oauth" component={OAuth} />

      <Route exact path="/feed" component={Feed} />
      <Route exact path="/post" component={NewPost} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/activity" component={Activity} />
      <Route exact path="/accounts/:username" component={User} />
      <Route exact path="/viewPost" component={SinglePost} />
    </Switch>
  );
};

export default App;
