import React from 'react';
import Typography from '@material-ui/core/Typography';
import Content from './Content';

// Home is the landing page.
const Home = () => (
  <Content bottomBar={false}>
    <Typography>Welcome to the homepage</Typography>
  </Content>
);

export default Home;
