import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  List, ListItem, ListItemAvatar, ListItemText,
  Avatar, Container, Typography, CircularProgress,
  makeStyles,
} from '@material-ui/core';
import CTypography from './CTypography';
import TopBar, { BottomBar } from './Bar';
import {
  apiEndpoint, formatTime, handleError,
} from './utils';

const useStyles = makeStyles(() => ({
  centered: {
    'text-align': 'center',
  },
}));

const Activity = () => {
  const cookies = new Cookies();
  const classes = useStyles();
  const [activity, setActivity] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const toast = (text, variant) => {
    enqueueSnackbar(text, {
      variant, autoHideDuration: 3000,
    });
  };

  const getActivity = () => {
    fetch(
      apiEndpoint(`getActivity/${cookies.get('username')}`),
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

        setActivity(res.data);
      });
  };

  const renderLoading = () => {
    if (Object.values(activity).length === 0) {
      return (
        <div className="loading">
          <CircularProgress />
        </div>
      );
    }
    return <span />;
  };

  const renderActivity = () => {
    if (activity == null) {
      return <CTypography>No new activity</CTypography>;
    }

    const reversedActivity = Object.values(activity).slice(0).reverse();
    return (
      reversedActivity.map((post) => (
        <Link
          key={post.id}
          className="link"
          to={{
            pathname: '/viewPost/',
            state: { post },
          }}
        >
          <ListItem button>
            <ListItemAvatar><Avatar src="" /></ListItemAvatar>
            <ListItemText
              primary={`@${post.sender} congratulated you!`}
              secondary={formatTime(post.timestamp)}
            />
          </ListItem>
        </Link>
      ))
    );
  };

  useEffect(getActivity, []);

  return (
    <div>
      <TopBar />
      <Container className="main-content" maxWidth="sm">
        <Typography className="pageHeader">Activity</Typography>

        <List component="nav" aria-label="activity">
          { renderLoading() }
          { renderActivity() }
        </List>

      </Container>
      <BottomBar defaultValue="activity" />
    </div>
  );
};


export default Activity;
