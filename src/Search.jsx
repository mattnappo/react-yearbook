import React from 'react';
import TopBar, { BottomBar } from './Bar';

const Search = () => (
  <div>
    <TopBar loginText="Logout" />
    <div className="main-content">
      Search
    </div>
    <BottomBar />
  </div>
);

export default Search;
