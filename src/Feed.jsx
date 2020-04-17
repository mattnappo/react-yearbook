import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { authEndpoint, apiEndpoint, parseURL } from './utils';
import Post from './Post';
import Content from './Content';

// Feed is the main window containing the post feed.
const Feed = () => {
  const [posts, setPosts] = useState({});
  const cookies = new Cookies();

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
        if (res.errors) {
          console.log(res);
          console.log('ERRORSRRR');
          // window.location.href = '/';
          // window.location.href = `/errors=${res.errors}`;
        }

        setPosts(res.data);
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
          console.log(res);
        }
      });

    // getPosts(); // This or useEffect
  };

  useEffect(authorize, []);
  useEffect(getPosts, []);

  return (
    <Content>
      { Object.values(posts).map((post) => <Post postData={post} key={post.id} />) }
    </Content>
  );
};

export default Feed;