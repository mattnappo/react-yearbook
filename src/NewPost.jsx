import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import {
  TextField, Button, Container,
  Typography, Grid, makeStyles,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TopBar, { BottomBar } from './Bar';
import AddImagePopup from './AddImagePopup';
import { apiEndpoint, error } from './utils';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
    width: 1000,
    border: '1px solid red',
  },
  border: {
    border: '1px solid red',
  },
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
  const [invalid, setInvalid] = useState({
    message: false,
    recipients: false,
  });

  const [seniors, setSeniors] = useState([]);
  const [showImageButton, setShowImageButton] = useState(true);

  const classes = useStyles();
  const cookies = new Cookies();

  const { enqueueSnackbar } = useSnackbar();
  const toast = (text, variant) => {
    enqueueSnackbar(text, {
      variant, autoHideDuration: 6000,
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
        if (res.errors) {
          toast(error(res.errors[0]), 'info');
          return;
        }

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

    // If the message box is empty
    if (state.message === '') {
      setInvalid({
        ...invalid,
        message: true,
      });
    } else {
      setInvalid({
        ...invalid,
        message: false,
      });
      validMessage = true;
    }

    // If the recipients box is empty
    if (state.recipients.length === 0) {
      console.log("imvalid")
      setInvalid({
        ...invalid,
        recipients: true,
      });
    } else {
      console.log("THIS IS HAPPENING")
      setInvalid({
        ...invalid,
        recipients: false,
      });
      validRecipients = true;
    }

    return validRecipients && validMessage;
  };

  const post = () => {
    if (!validate()) {
      return;
    }

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
        if (res.errors != null) {
          console.log(res.errors);
          toast(error(res.errors[0]), 'error');
          return;
        }

        toast('Posted!', 'success');
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
      <TopBar loginText="Logout" />
      <Container className="main-content" maxWidth="sm">
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Typography className={classes.centered}>Make New Post</Typography>
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
                  error={invalid.recipients}
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
              error={invalid.message}
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
        {JSON.stringify(state)}
      </Container>
      <BottomBar />
    </div>
  );
};

export default NewPost;
