import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useSnackbar } from 'notistack';
import {
  Tabs, Tab, List, ListItem, Box, makeStyles,
  Typography, ListItemAvatar, Avatar, ListItemText,

} from '@material-ui/core';
import CTypography from './CTypography';
import {
  apiEndpoint, formatTime, formatRecipients, handleError,
} from './utils';

const useStyles = makeStyles(() => ({
  centered: {
    'text-align': 'center',
  },
  listItem: {
    width: '100%',
    // padding: '8px 0px 8px 0px',
  },
}));

const TabPanel = (props) => {
  const {
    children, value, index, ...other
  } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

const ActivityItem = ({ post }) => {
  const classes = useStyles();

  return (
    <Link
      key={post.id}
      className="link"
      to={{
        pathname: '/viewPost/',
        state: { post },
      }}
    >
      <ListItem button className={classes.listItem}>
        <ListItemAvatar><Avatar src="" /></ListItemAvatar>
        <ListItemText
          primary={`@${post.sender} congratulated ${formatRecipients(post.recipients)}!`}
          secondary={formatTime(post.timestamp)}
        />
      </ListItem>
    </Link>
  );
};

const PostsTabs = () => {
  const cookies = new Cookies();
  const [value, setValue] = useState(0);
  const [posts, setPosts] = useState({
    inbound: [],
    outbound: [],
  });

  const { enqueueSnackbar } = useSnackbar();
  const toast = (text, variant) => {
    enqueueSnackbar(text, {
      variant, autoHideDuration: 3000,
    });
  };

  const handleChange = (e, v) => { setValue(v); };

  const getPosts = () => {
    fetch(
      apiEndpoint(`getUserPosts/${cookies.get('username')}`),
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

        setPosts(res.data);
      });
  };

  const renderPosts = () => {
    if (posts.outbound == null) return <CTypography>No posts yet</CTypography>;

    const reversedPosts = Object.values(posts.outbound).slice(0).reverse();
    return reversedPosts.map((post) => <ActivityItem post={post} />);
  };

  const renderCongrats = () => {
    if (cookies.get('grade') !== '3') return <CTypography>Only seniors can be congratulated</CTypography>;
    if (posts.inbound == null) return <CTypography>No congrats yet</CTypography>;

    const reversedCongrats = Object.values(posts.inbound).slice(0).reverse();
    return reversedCongrats.map((post) => <ActivityItem post={post} />);
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

      <TabPanel value={value} index={1}>
        <List component="nav" aria-label="congrats">
          {renderCongrats()}
        </List>
      </TabPanel>
    </div>
  );
};

export default PostsTabs;
