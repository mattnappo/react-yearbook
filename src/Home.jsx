import React from 'react';
import { useSnackbar } from 'notistack';
import { Typography, makeStyles } from '@material-ui/core';
import { ClearBar } from './Bar';
import { parseURL, errors } from './utils';

const headerStyles = {
  font: '"Merriweather", serif',
  // font: '"Pacifico", cursive';
  color: '#fff',
};

const useStyles = makeStyles(() => ({
  container: {
    '--divider-height': '5rem',

    position: 'relative',
    top: 'calc( var(--divider-height)/2 * -1 )',

    height: 'var(--divider-height)',
    width: '100%',
    float: 'left',
    'z-index': 1,

  /*   outline: 1px solid red; */
  },
  path: {
    stroke: 'none',
    fill: '#8321fd',
  },
  rect: {
    stroke: 'none',
    fill: '#fafafa',
    // backgroundColor: '#8321fd',
    // fill: 'linear-gradient(117deg, #8321fd 0%, #B721FF 100%)',
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
    'box-shadow': '5px 10px 18px #888888',
  },
  header: {
    color: headerStyles.color,
    fontWeight: 500,
    fontFamily: headerStyles.font,
    textAlign: 'center',
    wordBreak: 'break-all',
  },
  subheader: {
    color: headerStyles.color,
    fontFamily: headerStyles.font,
    textAlign: 'center',
    marginTop: '12px',
  },
  textPadding: {
    padding: '24px',
  },
}));

// Home is the landing page.
const Home = () => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const toast = (text, variant) => {
    enqueueSnackbar(text, {
      variant,
      autoHideDuration: 3000,
    });
  };

  const renderErrors = () => {
    const { err } = parseURL();
    if (err != null) {
      if (errors[err]) {
        toast(errors[err].message, errors[err].type);
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.topSection}>
        <ClearBar />
        <div className={classes.textPadding}>
          <Typography variant="h3" className={classes.header}>
            Congratulations Masters Class of 2020!
          </Typography>
          <Typography variant="h4" className={classes.subheader}>
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
        <Typography>
          Some nice text
        </Typography>
      </div>

      { renderErrors() }

    </div>
  );
};

export default Home;
