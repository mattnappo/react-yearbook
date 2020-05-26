import React, { useEffect, useState } from 'react';
import {
  CircularProgress, Typography, makeStyles, Box, Button,
} from '@material-ui/core';
import Cookies from 'universal-cookie';
import { useSnackbar } from 'notistack';
import { apiEndpoint, handleError } from './utils';
import Post from './Post';
import TopBar, { BottomBar } from './Bar';

const useStyles = makeStyles(() => ({
  loadMore: {
    'text-align': 'center',
    padding: '24px 0px 12px 0px',
    marginBottom: 64,
  },
}));

// Feed is the main window containing the post feed.
const Feed = () => {
  const n = 10; // The amount of posts to get at a time

  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [numPosts, setNumPosts] = useState(-1);
  const [postCounter, setPostCounter] = useState(0);
  const [loadMoreText, setLoadMoreText] = useState('Load More');
  const [gotPosts, setGotPosts] = useState(false);

  const cookies = new Cookies();
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const toast = (text, variant) => {
    enqueueSnackbar(text, {
      variant, autoHideDuration: 3000,
    });
  };

  const getNumPosts = () => {
    fetch(
      apiEndpoint('getNumPosts'),
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
        setNumPosts(res.data);
      });
  };

  const getPosts = () => {
    if (numPosts !== -1) {
      if (postCounter >= numPosts) {
	    console.log(`HAPPENING: o=${offset} n=${n} numposts=${numPosts}`);
        setLoadMoreText(`You've reached the bottom!`); return;
      }
    }
	let tempN = n;
    if (n + offset > numPosts && numPosts > offset) {
		tempN = numPosts - offset;
	}
    fetch(
      apiEndpoint(`getnPostsOffset/${tempN}/${offset}`),
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
        if (err || res.data == null) { toast(`err: ${err} Error!`, 'error'); return; }

        setGotPosts(true);
		setPostCounter(postCounter + res.data.length);
        setOffset(offset + n);
        setPosts(posts.concat(res.data));
		console.log(`len: ${res.data.length} pc=${postCounter}`);
      });
  };

  const loadMorePosts = (event) => { event.preventDefault(); getPosts(); };

  const renderLoading = () => {
    if (!gotPosts) {
      return (
        <div className="loading">
          <CircularProgress />
        </div>
      );
    }
    return <span />;
  };

  const renderLoadMore = () => {
    if (gotPosts) {
      return (
        <Typography className={classes.loadMore}>
          {
            loadMoreText === 'Load More' ? (
              <Button onClick={loadMorePosts}>{loadMoreText}</Button>
            ) : loadMoreText
          }
        </Typography>
      );
    }
    return <span />;
  };

  const renderPosts = () => {
    if (posts == null) return <p>No Posts</p>;
    return Object.values(posts).map((post) => <Post postData={post} key={post.id} />);
  };

  useEffect(getNumPosts, []);
  useEffect(getPosts, []);

  return (
    <div>
      <TopBar />
      <div className="main-content">
        <Box className="header">Feed</Box>
        { renderLoading() }
        { renderPosts() }
        { renderLoadMore() }
      </div>
      { console.log(`OFFSET: ${offset}`)  }
      { console.log(`     N: ${n}`)  }
      <BottomBar defaultValue="feed" />
    </div>
  );
};

export default Feed;
