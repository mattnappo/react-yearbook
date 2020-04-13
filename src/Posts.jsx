import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const Posts = ({ posts }) => {
  console.log(typeof posts);
  // return <div />;
  return Object.values(posts).map(
    (post) => <Post postData={post} key={post.id} />,
  );
};

Posts.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  posts: PropTypes.array.isRequired,
};

export default Posts;
