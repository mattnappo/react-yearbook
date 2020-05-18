import React from 'react';
import { useSnackbar } from 'notistack';
import { Typography, makeStyles } from '@material-ui/core';
import ClearBar from './Bar';
import CTypography from './CTypography';
import { parseURL, errors } from './utils';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    'background-color': '#8321fd',
    'background-image': 'linear-gradient(117deg, #8321fd 0%, #B721FF 100%)',
    'min-height': '100%',
  },
  white: {
    color: 'white',
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
      <div className={classes.container}>
        <ClearBar />
        <CTypography className={classes.white}>
          Congratulations Masters Class of 2020!
        </CTypography>

        { renderErrors() }
      </div>
    </div>
  );
};

export default Home;
