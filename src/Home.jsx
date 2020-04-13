import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button,
} from '@material-ui/core/';

import MenuIcon from '@material-ui/icons/Menu';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import { authEndpoint } from './net';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  fill: {
    width: '100%',
  },
  title: {
    flexGrow: 1,
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
}));

// Home is the landing page.
const Home = () => {
  const classes = useStyles();
  const [loginURL, setLoginURL] = useState('');

  // componentDidMount
  useEffect(() => {
    fetch(
      authEndpoint('login'),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log(res);
          return;
        }

        setLoginURL(res);
      });
  }, []);

  return (
    <div>
      <AppBar className={classes.fill} position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Grad20
          </Typography>
          <Button
            color="inherit"
            href={loginURL}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Typography>{loginURL}</Typography>

      <BottomNavigation className={classes.stickToBottom}>
        <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
      </BottomNavigation>

    </div>
  );
};

export default Home;
