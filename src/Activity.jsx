import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  List, ListItem, ListItemAvatar, ListItemText,
  Avatar, Container, Box, CircularProgress, Typography,
} from '@material-ui/core';
import CTypography from './CTypography';
import TopBar, { BottomBar } from './Bar';
import {
  apiEndpoint, formatTime, handleError,
} from './utils';

const Activity = () => {
  const cookies = new Cookies();
  const [activity, setActivity] = useState([]);
  const [profilePics, setProfilePics] = useState([]);
  const [grade, setGrade] = useState();

  const { enqueueSnackbar } = useSnackbar();
  const toast = (text, variant) => {
    enqueueSnackbar(text, {
      variant, autoHideDuration: 3000,
    });
  };

  const getGrade = () => {
    fetch(
      apiEndpoint(`getUserGrade/${cookies.get('username')}`),
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

        setGrade(res.data);
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

        setActivity(res.activity);
        setProfilePics(res.profile_pics);
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
    if (activity == null) return <CTypography>No new activity</CTypography>;
    renderLoading();

    const reversedActivity = Object.values(activity).slice(0).reverse();
    return (
      reversedActivity.map((post, index) => (
        <Link
          key={post.id}
          className="link"
          to={{
            pathname: '/viewPost/',
            state: { post },
          }}
        >
          <ListItem button>
            <ListItemAvatar><Avatar src={profilePics[index]} /></ListItemAvatar>
            <ListItemText
              primary={`@${post.sender} congratulated you!`}
              secondary={formatTime(post.timestamp)}
            />
          </ListItem>
        </Link>
      ))
    );
  };

  useEffect(getGrade, []);
  useEffect(getActivity, []);

  return (
    <div>
      <TopBar />
      <Container className="main-content" maxWidth="sm">
        <Box className="header">Activity</Box>

        <List component="nav" aria-label="activity">
          { grade === 3 ? renderActivity() : <Typography className="centered">Only Seniors have access to this page</Typography> }
        </List>

      </Container>
      <BottomBar defaultValue="activity" />
    </div>
  );
};

export default Activity;
