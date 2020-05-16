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
        const err = handleError(res.errors);
        if (err) { toast(err); }

        window.location.href = '/feed';
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
