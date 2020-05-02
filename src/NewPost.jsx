import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import {
  TextField, Button, Container, Chip,
  Typography, Grid, Avatar, Autocomplete, makeStyles,
} from '@material-ui/core';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import TopBar, { BottomBar } from './Bar';
import SelectRecipients from './SelectRecipients';
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

const animatedComponents = makeAnimated();

const NewPost = () => {
  const [state, setState] = useState({
    sender: '',
    recipients: [],
    message: '',
    images: [],
  });

  const [users, setUsers] = useState([]);

  const classes = useStyles();
  const cookies = new Cookies();

  const handleDelete = () => {
    console.log('you deleted something');
  };

  const getUsers = () => {
    fetch(
      apiEndpoint('getUsernames'),
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

        const tempUsers = [];
        for (let i = 0; i < res.data.length; i++) {
          tempUsers.push({
            label: res.data[i],
            value: res.data[i],
          });
        }
        setUsers(tempUsers);
      });
  };

  const post = () => {
    return;
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
            {/* <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={users}
            /> */}
            <SelectRecipients />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Message"
              className={classes.wide}
              multiline
              value={state.message}
              onChange={(e) => { setState({ ...state, message: e.target.value }); }}
            />
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

      <BottomBar />
    </div>
  );
};

export default NewPost;
