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
import { useSnackbar } from 'notistack';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import AccountIcon from '@material-ui/icons/AccountCircle';
import InboxIcon from '@material-ui/icons/Inbox';
import Test from './Test';
import { authEndpoint, handleError, capitalize } from './utils';

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
  const cookies = new Cookies();
  const [loginURL, setLoginURL] = useState('');

  const { enqueueSnackbar } = useSnackbar();
  const toast = (text, variant) => {
    enqueueSnackbar(text, {
      variant, autoHideDuration: 3000,
    });
  };

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
        const err = handleError(res.errors);
        if (err) { toast(err, 'error'); return; }

        setLoginURL(res);
      });
  };

  const handleClick = () => {
    if (loginText === 'Logout') {
      cookies.remove('token');
      cookies.remove('username');
      cookies.remove('state');
      cookies.remove('go_session');
      window.location.replace('/?err=logout');
    }
  };

  useEffect(getLoginURL, []);

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Masters Seniors 2020
        </Typography>
        <Button
          color="inherit"
          href={loginURL}
          onClick={handleClick}
        >
          {loginText}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  loginText: PropTypes.oneOf(['Login', 'Logout']).isRequired,
};

export default TopBar;

const BottomBarLink = ({
  to, icon, val,
}) => (
  <BottomNavigationAction
    component={Link}
    to={to}
    label={capitalize(val)}
    value={val}
    icon={icon}
  />
);
BottomBarLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export const BottomBar = ({ defaultValue }) => {
  const classes = useStyles();
  const cookies = new Cookies();
  const username = cookies.get('username');

  const [value, setValue] = useState(defaultValue);

  return (
    <BottomNavigation
      className={classes.stickToBottom}
      value={value}
      onChange={(e, v) => { setValue(v); }}
    >
      {/* <BottomBarLink to="/feed" value="feed" icon={<HomeIcon />} />
      <BottomBarLink to="/search" value="search" icon={<SearchIcon />} />
      <BottomBarLink to="/post" value="post" icon={<AddIcon />} />
      <BottomBarLink to="/activity" value="activity" icon={<InboxIcon />} />
      <BottomBarLink to={`/accounts/${username}`} value="me" icon={<AccountIcon />} /> */}

      <BottomNavigationAction
        component={Link}
        to="/feed"
        label={capitalize('feed')}
        value="feed"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/search"
        label={capitalize('search')}
        value="search"
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/post"
        label={capitalize('post')}
        value="post"
        icon={<AddIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/activity"
        label={capitalize('activity')}
        value="activity"
        icon={<InboxIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={`/accounts/${username}`}
        label={capitalize('Me')}
        value="me"
        icon={<AccountIcon />}
      />

    </BottomNavigation>
  );
};
