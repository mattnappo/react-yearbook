import React, { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button,
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
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

const TopBar = ({loginText}) => {
  const classes = useStyles();
  const [loginURL, setLoginURL] = useState('');

  const getLoginURL = () => {
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
  };

  // componentDidMount
  useEffect(getLoginURL, []);

  return (
    <AppBar className={classes.root} position="static">
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
          {loginText}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
