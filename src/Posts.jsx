import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const Posts = ({ posts }) => {
  posts.map(
    (post) => <Post postData={post} />,
  );
};

Posts.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  posts: PropTypes.array.isRequired,
};

export default Posts;
