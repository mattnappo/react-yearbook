import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { useSnackbar } from 'notistack';
import { apiEndpoint } from './utils';
import Post from './Post';
import TopBar, { BottomBar } from './Bar';

// Feed is the main window containing the post feed.
const Feed = () => {
  const [posts, setPosts] = useState({});
  const cookies = new Cookies();

  const { enqueueSnackbar } = useSnackbar();
  const toast = (text, variant) => {
    enqueueSnackbar(text, {
      variant, autoHideDuration: 3000,
    });
  };

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
          window.location.replace('/?err=sessionExpired');
        }

        setPosts(res.data);
      });
  };

  const renderLoading = () => {
    if (Object.values(posts).length === 0) {
      return (
        <div className="loading">
          <CircularProgress />
        </div>
      );
    }
  };

  const renderPosts = () => {
    if (posts == null) return <p>No Posts</p>;
    const reversedPosts = Object.values(posts).slice(0).reverse();
    return reversedPosts.map((post) => <Post postData={post} key={post.id} />);
  };

  useEffect(getPosts, []);

  return (
    <div>
      <TopBar loginText="Logout" />
      <div className="main-content">
        { renderLoading() }
        { renderPosts() }
      </div>
      <BottomBar />
    </div>
  );
};

export default Feed;
