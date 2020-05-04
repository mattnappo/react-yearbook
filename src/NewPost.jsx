import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import {
  TextField, Button, Container,
  Typography, Grid, makeStyles,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TopBar, { BottomBar } from './Bar';
import AddImagePopup from './AddImagePopup';
import Toast from './Toast';
import { apiEndpoint } from './utils';

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

  const [seniors, setSeniors] = useState([]);
  const [showImageButton, setShowImageButton] = useState(true);
  const [toastPosted, setToastPoasted] = useState(false);

  const classes = useStyles();
  const cookies = new Cookies();

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
          console.log(res);
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

  const post = () => {
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
        if (res.errors) {
          console.log(res);
        }
        setToastPoasted(true);
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

        <Toast type="success" text="Posted!" open={toastPosted} />

      </Container>
      <BottomBar />
    </div>
  );
};

export default NewPost;
