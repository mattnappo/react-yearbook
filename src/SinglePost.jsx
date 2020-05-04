import React from 'react';
import PropTypes from 'prop-types';
import TopBar, { BottomBar } from './Bar';

const SinglePost = ({ post }) => (
  <div>
    <TopBar loginText="Logout" />
    <div className="main-content">
      {post}
    </div>
    <BottomBar />
  </div>
);
SinglePost.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  post: PropTypes.object.isRequired,
};

export default SinglePost;
