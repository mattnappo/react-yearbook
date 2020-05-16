import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { authEndpoint, parseURL, handleError } from './utils';

const OAuth = () => {
  const { enqueueSnackbar } = useSnackbar();
  const toast = (text, variant) => {
    enqueueSnackbar(text, {
      variant, autoHideDuration: 3000,
    });
  };

  const authorize = () => {
    const url = parseURL();

    fetch(
      authEndpoint('authorize'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: url.code,
          state: url.state,
        }),
      },
    ).then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          window.location.replace('/?err=invalidEmail');
          return;
        }

        window.location.replace('/feed');
      });
  };

  useEffect(authorize, []);

  return (
    <div className="loading">
      <CircularProgress />
    </div>
  );
};

export default OAuth;
