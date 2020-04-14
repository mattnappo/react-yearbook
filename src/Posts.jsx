import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const Posts = ({ posts }) => (
  <div className="posts">
    { Object.values(posts).map((post) => <Post postData={post} key={post.id} />) }
  </div>
);

Posts.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  posts: PropTypes.array.isRequired,
};

export default Posts;
