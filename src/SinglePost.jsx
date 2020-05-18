import React from 'react';
import Post from './Post';
import TopBar, { BottomBar } from './Bar';

const SinglePost = (props) => (
  <div>
    <TopBar />
    <div className="main-content">
      <Post postData={props.location.state.post} />
    </div>
    <BottomBar />
    {/* <BottomBar defaultValue="feed" /> */}
  </div>
);

export default SinglePost;
