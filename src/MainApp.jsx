import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { authEndpoint, parseURL } from './utils';
import TopBar, { BottomBar } from './Bar';

// App is the main app containing all of the routes.
const MainApp = () => {
  const cookies = new Cookies();

  const authorize = () => {
    const url = parseURL();

    const cookieConf = {
      path: '/',
      maxAge: 30 * 60, // 30 minutes
    };

    // If this is the redirect directly from google, store url data
    // in cookies. (do later to make the URL look cleaner.
    if (!cookies.get('token')) {
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

          // Put the token in a cookie
          cookies.set(
            'token',
            JSON.stringify(res),
            cookieConf,
          );
          cookies.set(
            'state',
            url.state,
            cookieConf,
          );
        });
    }
  };

  useEffect(authorize, []);

  return (
    <div>
      <TopBar loginText="Logout" />

      {JSON.stringify(cookies.get('token'))}

      <BottomBar />
    </div>
  );
};

export default MainApp;
