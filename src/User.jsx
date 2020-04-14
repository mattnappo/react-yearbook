import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import { apiEndpoint } from './utils';

const User = (props) => {
  const cookies = new Cookies();
  const [userData, setUserData] = useState('');

  const username = props.match.params.username;
  console.log(`username: ${username}`);

  fetch(
    apiEndpoint(`getUser/${username}`),
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
      }
      console.log(JSON.stringify(res));
      setUserData(JSON.stringify(res));
    });

  return (
    <div>
      {/* { JSON.stringify(props) } */}
      { JSON.stringify(userData) }
    </div>

  );
};

// User.proptypes = {
//   username: PropTypes.string.isRequired,
// }

export default User;
