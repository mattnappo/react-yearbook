import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { authEndpoint, parseURL } from './utils';

const OAuth = () => {
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
          console.log(res);
        }

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
