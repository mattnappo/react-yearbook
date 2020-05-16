import React from 'react';
import { useSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
import TopBar from './Bar';
import { parseURL, errors } from './utils';

// Home is the landing page.
const Home = () => {
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
    <div>
      <TopBar loginText="Login" />
      <div className="main-content">
        <Typography>Welcome!</Typography>
        { renderErrors() }
      </div>
    </div>
  );
};

export default Home;
