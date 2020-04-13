import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { authEndpoint, apiEndpoint, parseURL } from './utils';
import TopBar, { BottomBar } from './Bar';

// MainApp is the main window.
const MainApp = () => {
  const [posts, setPosts] = useState({});
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

  const getPosts = () => {
    fetch(
      apiEndpoint('getPosts'),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${cookies.get('token')}`,
        },
      },
    ).then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log(res);

          setPosts(res.data);
        }
      });
  };

  useEffect(authorize, []);
  useEffect(getPosts, []);

  return (
    <div>
      <TopBar loginText="Logout" />

      {JSON.stringify(cookies.get('token'))}
      <hr />
      {JSON.stringify(cookies.get('state'))}
      <hr />
      <hr />
      {JSON.stringify(posts)}

      <BottomBar />
    </div>
  );
};

export default MainApp;
