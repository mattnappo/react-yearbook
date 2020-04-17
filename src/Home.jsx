import React from 'react';
import Typography from '@material-ui/core/Typography';
import TopBar from './Bar';

// Home is the landing page.
const Home = () => (
  <div>
    <TopBar loginText="Login" />
    <div className="main-content">
      <Typography>Welcome!</Typography>
    </div>
  </div>
);

export default Home;
