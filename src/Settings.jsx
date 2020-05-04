import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import {
  TextField, Button, Container,
  Typography, Grid, Select, FormControl,
  InputLabel, makeStyles,
} from '@material-ui/core';
import TopBar, { BottomBar } from './Bar';
import {
  apiEndpoint, gradeIntToString, gradeStringToInt,
} from './utils';

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
  main: {
    'background-color': 'white',
  },
}));

const Settings = () => {
  const classes = useStyles();
  const cookies = new Cookies();

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
          console.log(res);
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
        body: JSON.stringify({
          ...state,
        }),
      },
    ).then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          console.log(res);
        }

        console.log('Changes were saved');
      });
  };

  const variant = 'outlined';

  const genSeniorWill = () => {
    if (state.grade === 3) {
      return (
        <TextField
          label="Senior Will"
          className={classes.wide}
          multiline
          rowsMax={4}
          value={state.will}
          onChange={(e) => { setState({ ...state, will: e.target.value }); }}
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
              variant={variant}
              value={state.nickname}
              onChange={(e) => { setState({ ...state, nickname: e.target.value }); }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl variant={variant} className={classes.fill}>
              <InputLabel htmlFor="outlined-grade-native-simple">Grade</InputLabel>
              <Select
                native
                value={gradeIntToString(state.grade)}
                onChange={(e) => {
                  setState({ ...state, grade: gradeStringToInt(e.target.value) });
                }}
                label="Grade"
                inputProps={{
                  id: 'outlined-grade-native-simple',
                  name: 'grade',
                }}
              >
                <option aria-label="none" value="" />
                <option value="freshman">Freshman</option>
                <option value="sophomore">Sophomore</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
              </Select>
            </FormControl>

          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Bio"
              className={classes.wide}
              multiline
              variant={variant}
              value={state.bio}
              onChange={(e) => { setState({ ...state, bio: e.target.value }); }}
            />
          </Grid>
          <Grid item xs={12}>
            {genSeniorWill()}
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={save}
          >
            Save Changes
          </Button>

        </Grid>

      </Container>

      <BottomBar />
    </div>
  );
};

export default Settings;
