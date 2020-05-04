import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { apiEndpoint } from './utils';
import Post from './Post';
import TopBar, { BottomBar } from './Bar';

// Feed is the main window containing the post feed.
const Feed = () => {
  const [posts, setPosts] = useState({});
  const cookies = new Cookies();

  const getPosts = () => {
    fetch(
      apiEndpoint('getPosts'),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${cookies.get('token')}`,
        },
      },
    ).then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          console.log(res);
        }

        setPosts(res.data);
      });
  };

  const renderPosts = () => {
    if (posts == null) {
      return <p>No posts</p>;
    }
    return Object.values(posts).map((post) => <Post postData={post} key={post.id} />);
  };

  useEffect(getPosts, []);

  return (
    <div>
      <TopBar loginText="Logout" />
      <div className="main-content">
        { renderPosts() }
        {/* { Object.values(posts).map((post) => <Post postData={post} key={post.id} />) } */}
      </div>
      <BottomBar />
    </div>
  );
};

export default Feed;
