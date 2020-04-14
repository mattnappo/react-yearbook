import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { apiEndpoint } from './utils';

const User = (props) => {
  const cookies = new Cookies();
  const [userData, setUserData] = useState('');
  const username = props.match.params.username;

  const getUserData = () => {
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

        setUserData(res.data);
      });
  };

  useEffect(getUserData, []);

  return (
    <div />
  );
};

// User.proptypes = {
//   username: PropTypes.string.isRequired,
// }

export default User;
