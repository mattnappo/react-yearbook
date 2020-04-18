import React from 'react';
import TopBar, { BottomBar } from './Bar';

const NewPost = () => (
  <div>
    <TopBar loginText="Logout" />
    <div className="main-content">
      New Post
    </div>
    <BottomBar />
  </div>
);

export default NewPost;
