import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import {
  TextField, Button, Container, Chip,
  Typography, Grid, Avatar, makeStyles,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TopBar, { BottomBar } from './Bar';
import ImageCropper from './ImageCropper';
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

  const classes = useStyles();
  const cookies = new Cookies();

  const handleDelete = () => {
    console.log('you deleted something');
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
          console.log(res);
        }

        const tempSeniors = [];
        for (let i = 0; i < res.data.length; i++) {
          tempSeniors.push(res.data[i]);
        }
        setSeniors(tempSeniors);
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
      });
  };

  const handleImage = (newImage) => {
    const { images } = state;
    images.push(newImage);
    setState({
      ...state,
      images,
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
                  // eslint-disable-next-line react/jsx-props-no-spreading
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
            <ImageCropper handleImageCallback={handleImage} />
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={post}
          >
            Post
          </Button>

        </Grid>

      </Container>
      {console.log(state.images)}
      <BottomBar />
    </div>
  );
};

export default NewPost;
