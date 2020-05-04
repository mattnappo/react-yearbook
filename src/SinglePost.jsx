import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import TopBar, { BottomBar } from './Bar';

const SinglePost = (props) => (
  <div>
    <TopBar loginText="Logout" />
    <div className="main-content">
      {
        <Post postData={props.location.state.post} />
      }
      {/* {post} */}
    </div>
    <BottomBar />
  </div>
);
SinglePost.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  post: PropTypes.object.isRequired,
};

export default SinglePost;
