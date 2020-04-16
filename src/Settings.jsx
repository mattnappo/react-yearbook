import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import {
  TextField, Button, NativeSelect, makeStyles,
} from '@material-ui/core';
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
  const [state, setState] = useState({
    username: '',
    grade: '',
    bio: '',
    will: '',
    profile_pic: '',
    nickname: '',
  });

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

        setState(res.data);
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
          username: state.username,
          grade: state.grade,
          bio: state.bio,
          will: state.will,
          profile_pic: state.profile_pic,
          nickname: state.nickname,
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
    if (state.grade === 'senior') {
      return (
        <TextField
          id="outlined-multiline-flexible"
          label="Senior Will"
          multiline
          rowsMax={4}
          value={state.will}
          onChange={(e) => { setState({ will: e.target.value }); }}
          variant="outlined"
        />
      );
    }
    return <span />;
  };

  const handleChange = (event) => {
    const grade = event.target.name;
    state.grade = grade;
    setState({ grade });
  };

  useEffect(getUserData, []);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="standard-basic"
        label="Nickname"
        value={state.nickname}
        onChange={(e) => { setState({ nickname: e.target.value }); }}
      />

      <NativeSelect
        value={state.grade}
        onChange={handleChange}
        inputProps={{
          name: 'grade',
          id: 'grade-native-simple',
        }}
      >
        <option aria-label="None" value="" />
        <option value="freshman">Freshman</option>
        <option value="sophomore">Sophomore</option>
        <option value="junior">Junior</option>
        <option value="senior">Senior</option>
      </NativeSelect>

      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Senior Will"
          multiline
          rowsMax={4}
          value={state.will}
          onChange={(e) => { setState({ will: e.target.value }); }}
          variant="outlined"
        />

        {genSeniorWill()}
      </div>

      <div>
        <TextField id="standard-basic" label="Standard" />
      </div>

      <Button variant="contained" color="primary">
        Save
      </Button>

    </form>
  );
};

export default Settings;
