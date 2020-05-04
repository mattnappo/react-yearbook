import React, { useState, useEffect } from 'react';
import TopBar, { BottomBar } from './Bar';
import { apiEndpoint } from './utils';

const Activity = () => {
  const [activity, setActivity] = useState([]);

  const getActivity = () => {
    fetch(
      apiEndpoint(`getActivity/${username}`),
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
          // eslint-disable-next-line no-console
          console.log(res);
          // window.location.href = '/';
        }

        setActivity(res.data);
      });
  };

  useEffect(getActivity, []);

  return (
    <div>
      <TopBar loginText="Logout" />
      <div className="main-content">
        {/* A map (just like in feed) that will map to a list object */}
      </div>
      <BottomBar />
    </div>
  );
};


export default Activity;
