import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ImageCropper from './ImageCropper';
// import classes from '*.module.css';

const useStyles = makeStyles(() => ({
  upper: {
    marginBottom: 48,
  },
}));

const AddImagePopup = ({ childHandleImage, handleSubmit, handleCancel }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const custom_classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelDialog = () => {
    handleClose();
    handleCancel();
  };

  const handleSubmitDialog = () => {
    handleClose();
    handleSubmit();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Image
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Add an Image</DialogTitle>
        <DialogContent>
          <ImageCropper handleImageCallback={childHandleImage} />
        </DialogContent>
        <DialogActions className={custom_classes.upper}>
          <Button autoFocus onClick={handleCancelDialog} color="primary">
            Cancel
          </Button>
          <Button autoFocus onClick={handleSubmitDialog} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
AddImagePopup.propTypes = {
  childHandleImage: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default AddImagePopup;
