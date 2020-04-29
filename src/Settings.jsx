import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import {
  TextField, Button, Select, MenuItem, makeStyles,
  NativeSelect, Container, Typography, Grid,
} from '@material-ui/core';
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

const Settings = () => {
  const classes = useStyles();
  const cookies = new Cookies();

  // Just to display data initially
  const [state, setState] = useState({
    username: '',
    grade: '',
    bio: '',
    will: '',
    profile_pic: '',
    nickname: '',
  });

  const getUserData = () => {
    const username = cookies.get('username');
    fetch(
      apiEndpoint(`getUserWithAuthentication/${username}`),
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
          // eslint-disable-next-line no-console
          console.log(res);
          // window.location.href = '/';
        }

        setState(res.data);
      });
  };

  const save = () => {
    fetch(
      apiEndpoint('updateUser'),
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${cookies.get('token')}`,
        },
        body: {
          username: state.username,
          grade: state.grade,
          bio: state.bio,
          will: state.will,
          profile_pic: state.profile_pic,
          nickname: state.nickname,
        },
      }, // State seems to not be working here
    ).then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          // eslint-disable-next-line no-console
          console.log(res);
          // window.location.href = '/';
        }

        console.log('Changes were saved');
      });
  };

  const genSeniorWill = () => {
    if (state.grade === 'senior') {
      return (
        <TextField
          label="Senior Will"
          className={classes.wide}
          multiline
          rowsMax={4}
          value={state.will}
          onChange={(e) => { setState({ will: e.target.value }); }}
        />
      );
    }
    return <span />;
  };

  useEffect(getUserData, []);

  return (
    <div>
      <TopBar loginText="Logout" />

      <Container className="main-content" maxWidth="sm">
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Typography className={classes.centered}>Edit Account Settings</Typography>
          </Grid>

          <Grid item xs={6}>
            <TextField
              className={classes.wide}
              label="Nickname"
              value={state.nickname}
              onChange={(e) => { setState({ nickname: e.target.value }); }}
            />
          </Grid>
          <Grid item xs={6}>
            <NativeSelect
              className={classes.fill}
              variant="standard"
              value={state.grade}
              onChange={(e) => { setState({ grade: e.target.value }); }}
            >
              <option aria-label="none" value="">Grade</option>
              <option value="freshman">Freshman</option>
              <option value="sophomore">Sophomore</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
            </NativeSelect>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Bio"
              className={classes.wide}
              multiline
              value={state.bio}
              onChange={(e) => { setState({ bio: e.target.value }); }}
            />
          </Grid>
          <Grid item xs={12}>
            {genSeniorWill()}
          </Grid>

        </Grid>

      </Container>

      <BottomBar />
    </div>
  );
};

export default Settings;
