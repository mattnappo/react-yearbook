import React, { useState, useEffect } from 'react';
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

  const genSeniorWill = () => {
    if (userData.grade === 'senior') {
      return (
        <TextField
          id="outlined-multiline-flexible"
          label="Senior Will"
          multiline
          rowsMax={4}
          value={userData.will}
          onChange={(e) => {
            const newUserData = userData;
            newUserData.will = e.target.value;
            console.log(`NEW USER DATA ${JSON.stringify(newUserData)}`);
            setUserData(newUserData);
          }}
          variant="outlined"
        />
      );
    }
    return <span />;
  };

  useEffect(getUserData, []);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Nickname" />
      <TextField id="standard-basic" label="Grade" />

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

        {genSeniorWill()}
      </div>

      <div>
        <TextField id="standard-basic" label="Standard" />
      </div>
    </form>
  );
};

export default Settings;
