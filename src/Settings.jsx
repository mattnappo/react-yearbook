import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { TextField, makeStyles } from '@material-ui/core';
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

  // Mutables
  const [bio, setBio] = useState('');
  const [will, setWill] = useState('');
  const [nickname, setNickname] = useState('');
  const [profilePic, setProfilePic] = useState('');

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

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField id="standard-basic" label="Nickname" />
        <TextField id="standard-basic" label="Grade" />
      </div>

      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Bio"
          multiline
          rowsMax={4}
          value={bio}
          onChange={(e) => { setBio(e.target.value); }}
          variant="outlined"
        />
      </div>

      <div>
        <TextField id="standard-basic" label="Standard" />
      </div>
    </form>
  );
};

export default Settings;
