import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import {
  List, ListItem, ListItemAvatar, ListItemText,
  Avatar, Container,
} from '@material-ui/core';
import TopBar, { BottomBar } from './Bar';
import { apiEndpoint } from './utils';

const Activity = () => {
  const cookies = new Cookies();
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
          // eslint-disable-next-line no-console
          console.log(res);
          // window.location.href = '/';
        }

        setActivity(res.data);
      });
  };

  useEffect(getActivity, []);

  return (
    <div>
      <TopBar loginText="Logout" />
      <Container className="main-content" maxWidth="sm">
        <List component="nav" aria-label="contacts">

          <ListItem button>
            <ListItemAvatar><Avatar /></ListItemAvatar>
            <ListItemText primary="Chelsea Otakan" />
          </ListItem>

          <ListItem button>
            <ListItemAvatar><Avatar /></ListItemAvatar>
            <ListItemText primary="Chelsea Otakan" />
          </ListItem>

        </List>

        {activity.map((post) => <SomeComponent data={item} />)}

        {JSON.stringify(activity)}
        
      </Container>
      <BottomBar />
    </div>
  );
};


export default Activity;
