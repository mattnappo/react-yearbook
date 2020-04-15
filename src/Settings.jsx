import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { apiEndpoint } from './utils';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Settings = (props) => {
  const classes = useStyles();
  const cookies = new Cookies();

  // Just to display data initially
  const [userData, setUserData] = useState('');
  const updateUserData = (e, field) => {
    const newUserData = userData;
    newUserData[field] = e.target.value;
    setUserData(newUserData);
  };

  const getUserData = () => {
    const { username } = props.match.params;
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

        setUserData(res.data);
      });
  };

  const save = () => {
    fetch(
      apiEndpoint('updateUser'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${cookies.get('token')}`,
        },
        body: {
          username: userData.username,
          grade: userData.grade,
          bio: userData.bio,
          will: userData.will,
          profile_pic: userData.profile_pic,
          nickname: userData.nickname,
        },
      },
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
    if (userData.grade === 'senior') {
      return (
        <TextField
          id="outlined-multiline-flexible"
          label="Senior Will"
          multiline
          rowsMax={4}
          value={userData.will}
          onChange={(e) => { updateUserData(e, 'will'); }}
          variant="outlined"
        />
      );
    }
    return <span />;
  };

  useEffect(getUserData, []);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="standard-basic"
        label="Nickname"
        value={userData.nickname}
        onChange={(e) => { updateUserData(e, 'nickname'); }}
      />
      <TextField
        id="standard-basic"
        label="Grade"
        value={userData.grade}
        onChange={(e) => { updateUserData(e, 'grade'); }}
      />

      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Senior Will"
          multiline
          rowsMax={4}
          value={userData.will}
          onChange={(e) => { updateUserData(e, 'will'); }}
          variant="outlined"
        />

        {genSeniorWill()}
      </div>

      <div>
        <TextField id="standard-basic" label="Standard" />
      </div>

      <Button variant="contained" color="primary">
        Primary
      </Button>

    </form>
  );
};

export default Settings;
