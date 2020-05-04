import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
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
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    show ? (
      <Snackbar
        className={classes.root}
        open={open}
      >
        <Alert severity={type} action={<CloseIcon onClick={handleClose} />}>
          {text}
        </Alert>
      </Snackbar>
    ) : <div />
  );
};
Toast.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'info', 'error', 'warning']).isRequired,
  open: PropTypes.bool.isRequired,
};

export default Toast;
