import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import {
  TextField, Button, Container, Box,
  Typography, Grid, makeStyles,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TopBar, { BottomBar } from './Bar';
import AddImagePopup from './AddImagePopup';
import { apiEndpoint, handleError } from './utils';

const useStyles = makeStyles(() => ({
  centered: {
    'text-align': 'center',
  },
  wide: {
    width: '100%',
  },
  fill: {
    width: '100%',
    height: '100%',
  },
}));

const NewPost = () => {
  const [state, setState] = useState({
    sender: '',
    recipients: [],
    message: '',
    images: [],
  });

  const [invalidRecipients, setInvalidRecipiants] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState(false);

  const [seniors, setSeniors] = useState([]);
  const [showImageButton, setShowImageButton] = useState(true);

  const classes = useStyles();
  const cookies = new Cookies();

  const { enqueueSnackbar } = useSnackbar();
  const toast = (text, variant, time) => {
    enqueueSnackbar(text, {
      variant, autoHideDuration: time,
    });
  };

  const getUsers = () => {
    fetch(
      apiEndpoint('getSeniors'),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${cookies.get('token')}`,
        },
      },
    ).then((res) => res.json())
      .then((res) => {
        const err = handleError(res.errors);
        if (err) { toast(err, 'error'); return; }

        if (res.data != null) {
          const tempSeniors = [];
          for (let i = 0; i < res.data.length; i++) {
            tempSeniors.push(res.data[i]);
          }
          setSeniors(tempSeniors);
        }
      });
  };

  const validate = () => {
    let validRecipients = false;
    let validMessage = false;

    // If the recipients box is empty
    if (state.recipients.length === 0) {
      setInvalidRecipiants(true);
    } else {
      setInvalidRecipiants(false);
      validRecipients = true;
    }

    // If the message box is empty
    if (state.message === '') {
      setInvalidMessage(true);
    } else {
      setInvalidMessage(false);
      validMessage = true;
    }

    return validRecipients && validMessage;
  };

  const post = () => {
    if (!validate()) return;

    fetch(
      apiEndpoint('createPost'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${cookies.get('token')}`,
        },
        body: JSON.stringify({
          ...state,
          sender: cookies.get('username'),
        }),
      },
    ).then((res) => res.json())
      .then((res) => {
        const err = handleError(res.errors);
        if (err) { toast(err, 'error', 3000); return; }

        window.location.replace('/feed');
        toast('Posted!', 'success', 1000);
      });
  };

  const handleImage = (newImage) => {
    setState({
      ...state,
      images: [newImage],
    });
  };

  const submitImageAction = () => {
    setShowImageButton(false);
    toast('Added image!', 'success');
  };

  const cancelImageAction = () => {
    setState({
      ...state,
      images: [],
    });
  };

  useEffect(getUsers, []);

  return (
    <div>
      <TopBar />
      <Container className="main-content" maxWidth="sm">
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Box className="header">Make New Post</Box>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={seniors}
              getOptionLabel={(option) => option}
              onChange={(e, val) => setState({
                ...state,
                recipients: val,
              })}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={invalidRecipients}
                  variant="outlined"
                  label="Recipients"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Message"
              className={classes.wide}
              multiline
              value={state.message}
              error={invalidMessage}
              variant="outlined"
              onChange={(e) => { setState({ ...state, message: e.target.value }); }}
            />
          </Grid>

          <Grid item xs={12}>
            {
              showImageButton ? (
                <AddImagePopup
                  childHandleImage={handleImage}
                  handleSubmit={submitImageAction}
                  handleCancel={cancelImageAction}
                />
              ) : <Typography>Added Image</Typography>
            }
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={post}
            >
              Post
            </Button>
          </Grid>

        </Grid>

      </Container>
      <BottomBar defaultValue="post" />
    </div>
  );
};

export default NewPost;
