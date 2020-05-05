import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';

const PostsTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="fullWidth"
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      <Tab label="Posts" />
      <Tab label="Congrats" />
    </Tabs>
  );
};

export default PostsTabs;
