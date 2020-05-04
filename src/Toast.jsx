import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, makeStyles } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => (
  <MuiAlert elevation={24} variant="filled" {...props} />
);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    'margin-bottom': theme.spacing(6),
  },
}));

const Toast = ({ text, type, open }) => {
  const classes = useStyles();

  return (
    <Snackbar className={classes.root} open={open} autoHideDuration={3000}>
      <Alert severity={type}>
        {text}
      </Alert>
    </Snackbar>
  );
};
Toast.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'info', 'error', 'warning']).isRequired,
  open: PropTypes.bool.isRequired,
};

export default Toast;
