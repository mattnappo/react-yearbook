import React from 'react';
import Cookies from 'universal-cookie';
import { useSnackbar } from 'notistack';
import { Typography, AppBar, makeStyles } from '@material-ui/core';
import { ClearBar } from './Bar';
import { parseURL, errors } from './utils';

const headerStyles = {
  font: '"Merriweather", serif',
  color: '#fff',
};

const smWidth = 864;

const useStyles = makeStyles(() => ({
  container: {
    '--divider-height': '5rem',
    position: 'relative',
    top: 'calc( var(--divider-height)/2 * -1 )',
    height: 'var(--divider-height)',
    width: '100%',
    float: 'left',
    'z-index': 1,
  },
  path: {
    stroke: 'none',
    fill: '#8321fd',
  },
  rect: {
    stroke: 'none',
    fill: '#fafafa',
  },
  svg: {
    width: '100%',
    height: '100%',
  },
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  topSection: {
    backgroundColor: '#8321fd',
    // backgroundImage: 'linear-gradient(117deg, #8321fd 0%, #B721FF 100%)',
    minHeight: '64%',
    width: '100%',
    padding: 12,
    'box-shadow': '5px 10px 18px #888888',
  },
  bottomSection: {
    maxWidth: 600,
    padding: 48,
    margin: 'auto',
  },
  header: {
    color: headerStyles.color,
    fontWeight: 500,
    fontFamily: headerStyles.font,
    textAlign: 'center',
    wordWrap: 'break-word',
    fontSize: window.innerWidth > smWidth ? 56 : 38,
  },
  subheader: {
    color: headerStyles.color,
    fontFamily: headerStyles.font,
    textAlign: 'center',
    marginTop: '12px',
    fontSize: window.innerWidth > smWidth ? 34 : 22,
  },
  textPadding: {
    padding: '16px',
    maxWidth: 850,
    margin: '0 auto',
  },
  stickToBottom: {
    textAlign: 'center',
    width: '100%',
    position: 'fixed',
    top: 'auto',
    bottom: 0,
    padding: 8,
    boxShadow: 0,
    backgroundColor: '#fafafa',
  },
  bigger: {
    fontSize: 16,
  },
  small: {
    fontSize: 12,
  },
}));

// Home is the landing page.
const Home = () => {
  const classes = useStyles();
  const cookies = new Cookies();

  const { enqueueSnackbar } = useSnackbar();
  const toast = (text, variant) => {
    enqueueSnackbar(text, {
      variant,
      autoHideDuration: 3000,
    });
  };

  const renderErrors = () => {
    const { err } = parseURL();
    cookies.remove('token');
    cookies.remove('username');
    cookies.remove('state');
    cookies.remove('go_session');
    cookies.remove('grade');

    if (errors[err]) {
      toast(errors[err].message, errors[err].type);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.topSection}>
        <ClearBar />
        <div className={classes.textPadding}>
          <Typography className={classes.header}>
            Congratulations Masters Class of 2020!
          </Typography>
          <Typography className={classes.subheader}>
            A Dedication to Our Seniors
          </Typography>
        </div>
      </div>

      <div className={classes.container}>
        <svg viewBox="0 70 500 60" preserveAspectRatio="none" className={classes.svg}>
          <rect x="0" y="0" width="500" height="500" className={classes.rect} />
          <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" className={classes.path} />
        </svg>
      </div>

      <div className={classes.bottomSection}>
        <Typography className={classes.bigger}>
          Congratulations to the class of 2020! Log in with your Masters account to
          post a message or photo congratulating a senior (or a group of seniors)!
        </Typography>
      </div>

      { renderErrors() }

      <div position="fixed" color="black" className={classes.stickToBottom}>
        <Typography className={classes.small}>Created by Matt Nappo</Typography>
        <Typography className={classes.small}>Report any issues to mattnappo@gmail.com</Typography>
      </div>

    </div>
  );
};

export default Home;
