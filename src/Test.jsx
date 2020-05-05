import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

const Test = () => {
  const { enqueueSnackbar } = useSnackbar();

  const newItem = () => {
    const message = 'Your notification here';
    enqueueSnackbar(message, {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
      className: 'snackbar',
    });
  };

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
      }}
      className="snackbar"
    >
      <p>EPIC</p>
      <button onClick={newItem}>click me</button>
    </SnackbarProvider>
  );
};
export default Test;
