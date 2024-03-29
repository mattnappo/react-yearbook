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

// Very bad profile pic solution (fast temporary)
const ActivityItem = ({ post }) => {
  const classes = useStyles();
  const cookies = new Cookies();
  const [profilePic, setProfilePic] = useState('');

  const getSenderProfilePic = () => {
    fetch(
      apiEndpoint(`getUserProfilePic/${post.sender}`),
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
        if (err) { console.log(err); return; } // I don;t want to put toast here AGAIN in this file

        setProfilePic(res.data);
      });
  };

  useEffect(getSenderProfilePic, []);

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
        <ListItemAvatar><Avatar src={profilePic} /></ListItemAvatar>
        <ListItemText
          primary={`@${post.sender} congratulated ${formatRecipients(post.recipients)}!`}
          secondary={formatTime(post.timestamp)}
        />
      </ListItem>
    </Link>
  );
};

const PostsTabs = ({ username }) => {
  const cookies = new Cookies();
  const [value, setValue] = useState(0);
  const [grade, setGrade] = useState();
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
      apiEndpoint(`getUserPosts/${username}`),
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
        // if (err) { toast(err, 'error'); return; }
        if (err) { console.log(err); }

        setPosts(res.data);
      });
  };

  const renderPosts = () => {
    if (posts.outbound == null) return <CTypography>No posts yet</CTypography>;

    const reversedPosts = Object.values(posts.outbound).slice(0).reverse();
    return reversedPosts.map((post) => <ActivityItem post={post} />);
  };

  const renderCongrats = () => {
    if (grade !== 3) return <CTypography>Only seniors can be congratulated</CTypography>;
    if (posts.inbound == null) return <CTypography>No congrats yet</CTypography>;

    const reversedCongrats = Object.values(posts.inbound).slice(0).reverse();
    return reversedCongrats.map((post) => <ActivityItem post={post} />);
  };

  const getGrade = () => {
    fetch(
      apiEndpoint(`getUserGrade/${username}`),
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

  useEffect(getPosts, [username]);
  useEffect(getGrade, []);

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
        { username === cookies.get('username') ? <Tab label="My Posts" /> : <Tab label="Posts" /> }
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
