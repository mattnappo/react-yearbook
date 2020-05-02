import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import {
  TextField, Button, Container, Chip,
  Typography, Grid, Avatar, makeStyles,
} from '@material-ui/core';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import TopBar, { BottomBar } from './Bar';
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

  useEffect(getUsers, []);

  return (
    <div>
      <TopBar loginText="Logout" />

      <Container className="main-content" maxWidth="sm">
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Typography className={classes.centered}>Make New Post</Typography>
          </Grid>

          <Grid item xs={6}>
            <TextField
              className={classes.wide}
              label="Nickname"
              value={state.nickname}
              onChange={(e) => { setState({ ...state, nickname: e.target.value }); }}
            />
          </Grid>
          <Grid item xs={6}>
            <Chip
              avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
              label="Deletable"
              onDelete={handleDelete}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={users}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Bio"
              className={classes.wide}
              multiline
              value={state.bio}
              onChange={(e) => { setState({ ...state, bio: e.target.value }); }}
            />
          </Grid>

          <Button
            variant="contained"
            color="primary"
            // onClick={}
          >
            Save Changes
          </Button>

        </Grid>

      </Container>
      {JSON.stringify(users)}
      {typeof [1, 2, 3]}

      <BottomBar />
    </div>
  );
};

export default NewPost;
