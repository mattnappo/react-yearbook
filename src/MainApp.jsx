import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { authEndpoint, parseURL } from './utils';
import TopBar, { BottomBar } from './Bar';

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
      });
  };

  useEffect(authorize, []);

  return (
    <div>
      <TopBar loginText="Logout" />

      {JSON.stringify(cookies.get('token'))}
      <hr />
      {JSON.stringify(cookies.get('state'))}

      <BottomBar />
    </div>
  );
};

export default MainApp;
