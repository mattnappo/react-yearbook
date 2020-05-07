import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import {
  Tabs, Tab, TabPanel, List, ListItem,
  ListItemAvatar, Avatar, ListItemText,

} from '@material-ui/core';
import { apiEndpoint, formatTime } from './utils';

const PostsTabs = () => {
  const cookies = new Cookies();
  const [value, setValue] = useState(0);
  const [posts, setPosts] = useState({
    inbound: [],
    outbound: [],
  });

  const handleChange = (e, v) => { setValue(v); };

  const getPosts = () => {
    fetch(
      apiEndpoint(`getToAndFrom/${cookies.username}`),
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
          // toast(error(res.errors[0]), 'info');
          console.log(res.errors);
          return;
        }

        setPosts(res.data);
      });
  };

  const renderPosts = () => {
    if (posts.outbound.length === 0) {
      return <CTypography>No Posts</CTypography>;
    }

    return (

      Object.values(posts.outbound).map((post) => (
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

  useEffect(getPosts, []);

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Posts" />
        <Tab label="Congrats" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <List component="nav" aria-label="posts">
          {renderPosts()}
        </List>
      </TabPanel>

    </div>
  );
};

export default PostsTabs;
