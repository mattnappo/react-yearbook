import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { authEndpoint } from './net';

// parseURL parses a url
function parseURL() {
  const url = window.location.href;
  const question = url.indexOf('?');
  let hash = url.indexOf('#');
  if (hash === -1 && question === -1) return {};
  if (hash === -1) hash = url.length;
  const query = question === -1 || hash === question + 1 ? url.substring(hash)
    : url.substring(question + 1, hash);
  const result = {};
  query.split('&').forEach((parts) => {
    if (!parts) return;
    const part = parts.split('+').join(' '); // replace every + with space, regexp-free version
    const eq = part.indexOf('=');
    let key = eq > -1 ? part.substr(0, eq) : part;
    const val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : '';
    const from = key.indexOf('[');
    if (from === -1) result[decodeURIComponent(key)] = val;
    else {
      const to = key.indexOf(']', from);
      const index = decodeURIComponent(key.substring(from + 1, to));
      key = decodeURIComponent(key.substring(0, from));
      if (!result[key]) result[key] = [];
      if (!index) result[key].push(val);
      else result[key][index] = val;
    }
  });
  return result;
}

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

        cookies.set('token', res, { path: '/' });
      });
  };

  useEffect(authorize, []);

  return (
    <div>
      hi
    </div>
  );
};

export default MainApp;
