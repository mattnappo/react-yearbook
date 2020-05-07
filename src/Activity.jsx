import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import {
  List, ListItem, ListItemAvatar, ListItemText,
  Avatar, Container, Typography, makeStyles,
} from '@material-ui/core';
import CTypography from './CTypography';
import TopBar, { BottomBar } from './Bar';
import { apiEndpoint, formatTime } from './utils';

const useStyles = makeStyles(() => ({
  centered: {
    'text-align': 'center',
  },
}));

const Activity = () => {
  const cookies = new Cookies();
  const classes = useStyles();
  const [activity, setActivity] = useState([]);

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
        if (res.errors) {
          console.log(res);
        }

        setActivity(res.data);
      });
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
      <TopBar loginText="Logout" />
      <Container className="main-content" maxWidth="sm">
        <Typography className={classes.centered}>Activity</Typography>

        <List component="nav" aria-label="activity">
          {renderActivity()}
        </List>

      </Container>
      <BottomBar />
    </div>
  );
};


export default Activity;
