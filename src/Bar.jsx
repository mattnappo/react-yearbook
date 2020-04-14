import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, IconButton, Typography, Button,
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';

import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FolderIcon from '@material-ui/icons/Folder';
import { authEndpoint } from './utils';

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

const TopBar = ({ loginText }) => {
  const classes = useStyles();
  const [loginURL, setLoginURL] = useState('');

  const getLoginURL = () => {
    if (loginText === 'Logout') {
      return;
    }

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
        if (res.errors) {
          console.log(res);
          return;
        }

        setLoginURL(res);
      });
  };

  useEffect(getLoginURL, []);

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Yearbook
        </Typography>
        <Button
          color="inherit"
          href={loginURL}
        >
          {loginText}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  loginText: PropTypes.string.isRequired,
};

export default TopBar;

export const BottomBar = () => {
  const classes = useStyles();

  return (
    <BottomNavigation className={classes.stickToBottom}>
      <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
      <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
    </BottomNavigation>
  );
};
