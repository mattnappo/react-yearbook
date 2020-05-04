import React from 'react';
import PropTypes from 'prop-types';
import TopBar, { BottomBar } from './Bar';

const Content = ({ bottomBar, children }) => {
  const renderTopBar = () => {
    if (bottomBar) {
      return <TopBar loginText="Logout" />;
    }
    return <TopBar loginText="Login" />;
  };
  const renderBottomBar = () => {
    if (bottomBar) {
      return <BottomBar />;
    }
    return <span />;
  };

  return (
    <div>
      {renderTopBar()}
      <div className="main-content">{ children }</div>
      {renderBottomBar()}
    </div>
  );
};

Content.propTypes = {
  bottomBar: PropTypes.bool,
  children: PropTypes.object.isRequired,
};
Content.defaultProps = {
  bottomBar: true,
};

export default Content;
