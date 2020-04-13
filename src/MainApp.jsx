import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { authEndpoint, parseURL } from './utils';

// App is the main app containing all of the routes.
const MainApp = () => {
  const cookies = new Cookies();

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
        if (res.error) {
          console.log(res);
        }

        cookies.set(
          'token',
          JSON.stringify(res), {
            path: '/',
            maxAge: 30 * 60, // 30 minutes
          },
        );
      });
  };

  useEffect(authorize, []);

  return (
    <div>
      {JSON.stringify(cookies.get('token'))}
    </div>
  );
};

export default MainApp;
