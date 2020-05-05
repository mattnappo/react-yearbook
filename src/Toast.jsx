/* == UNSTABLE COMPONENT == */

import React from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

const Toast = ({ text, variant }) => {
  const { enqueueSnackbar } = useSnackbar();
  enqueueSnackbar(text, {
    variant, autoHideDuration: 6000,
  });

  return <span />;
};
Toast.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf('success', 'error', 'info', 'warning').isRequired,
};

export default Toast;
