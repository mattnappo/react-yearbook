import React, { useEffect, useState } from 'react';
import {
  CircularProgress, Link, Typography, makeStyles, Box,
} from '@material-ui/core';
import Cookies from 'universal-cookie';
import { useSnackbar } from 'notistack';
import { apiEndpoint, handleError } from './utils';
import Post from './Post';
import TopBar, { BottomBar } from './Bar';

const useStyles = makeStyles(() => ({
  centered: {
    'text-align': 'center',
    padding: '24px 0px 12px 0px',
  },
}));

// Feed is the main window containing the post feed.
const Feed = () => {
  const n = 3;
  const [posts, setPosts] = useState({});
  const [offset, setOffset] = useState(0);
  const cookies = new Cookies();
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const toast = (text, variant) => {
    enqueueSnackbar(text, {
      variant, autoHideDuration: 3000,
    });
  };

  const getPosts = () => {
    fetch(
      apiEndpoint(`getnPostsOffset/${n}/${offset}`),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${cookies.get('token')}`,
        },
      },
    ).then((res) => res.json())
      .then((res) => {
        const err = handleError(res.errors);
        if (err) { toast(err, 'error'); return; }
        setOffset(offset + n);
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
    return <span />;
  };

  const renderLoadMore = () => {
    console.log(Object.values(posts).length);
    if (Object.values(posts).length !== 0) {
      return (
        <Typography className={classes.centered}>
          <Link onClick={loadMorePosts}>
            Load More
          </Link>
        </Typography>
      );
    }
    return <span />;
  };

  const renderPosts = () => {
    if (posts == null) return <p>No Posts</p>;
    renderLoadMore();
    // const reversedPosts = Object.values(posts).slice(0).reverse();
    return Object.values(posts).map((post) => <Post postData={post} key={post.id} />);
  };

  const loadMorePosts = (event) => {
    event.preventDefault();

    getPosts();
  };

  useEffect(getPosts, []);

  return (
    <div>
      <TopBar />
      <div className="main-content">
        <Box className="header">Feed</Box>
        { renderLoading() }
        { renderPosts() }

      </div>
      <BottomBar defaultValue="feed" />
    </div>
  );
};

export default Feed;
