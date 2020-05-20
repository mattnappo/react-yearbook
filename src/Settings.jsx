import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import {
  TextField, Button, Container, Card, Box,
  Grid, Select, FormControl,
  InputLabel, makeStyles,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import TopBar, { BottomBar } from './Bar';
import {
  apiEndpoint, gradeIntToString, gradeStringToInt, handleError,
} from './utils';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    padding: '28px',
    'margin-top': '24px',
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

  const { enqueueSnackbar } = useSnackbar();
  const toast = (text, variant) => {
    enqueueSnackbar(text, {
      variant, autoHideDuration: 6000,
    });
  };

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
        const err = handleError(res.errors);
        if (err) { toast(err, 'error'); return; }

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
        const err = handleError(res.errors);
        if (err) { toast(err, 'error'); return; }

        cookies.set('grade', parseInt(state.grade, 10));
        toast('Saved changes!', 'success');
        window.location.replace(`/accounts/${state.username}`);
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
          variant={variant}
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
      <TopBar />

      <Container className="main-content" maxWidth="sm">
        {/* <Card className={classes.root}> */}
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Box className="header">Edit Account Settings</Box>
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

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={save}
            >
              Save Changes
            </Button>
          </Grid>

        </Grid>
        {/* </Card> */}

        {JSON.stringify(state)}
      </Container>
      <BottomBar defaultValue="me" />
    </div>
  );
};

export default Settings;
