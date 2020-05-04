import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {
  AppBar, Toolbar, IconButton, Typography, Button,
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import AccountIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import { authEndpoint } from './utils';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    top: 0,
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

const BottomBarLink = ({ to, label, icon }) => (
  <Link to={to}>
    <BottomNavigationAction label={label} value={to} icon={icon} />
  </Link>
);
BottomBarLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export const BottomBar = () => {
  const classes = useStyles();
  const cookies = new Cookies();
  const username = cookies.get('username');

  const [value, setValue] = useState(1);

  return (
    <BottomNavigation
      className={classes.stickToBottom}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomBarLink to="/feed" label="Feed" icon={<HomeIcon />} />
      <BottomBarLink to="/search" label="Search" icon={<SearchIcon />} />
      <BottomBarLink to="/post" label="Post" icon={<AddIcon />} />
      <BottomBarLink to={`/accounts/${username}`} label="Me" icon={<AccountIcon />} />
      <BottomBarLink to="/settings" label="Settings" icon={<SettingsIcon />} />

    </BottomNavigation>
  );
};
