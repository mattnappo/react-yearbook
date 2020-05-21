import React from 'react';
import Box from '@material-ui/core/Box';
import Post from './Post';
import TopBar, { BottomBar } from './Bar';

const SinglePost = (props) => (
  <div>
    <TopBar />
    <div className="main-content">
      <Box className="header">Post</Box>
      <Post postData={props.location.state.post} single />
    </div>
    <BottomBar />
  </div>
);

export default SinglePost;
