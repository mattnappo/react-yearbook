import React, { useState, useEffect } from 'react';
import Redirect from 'react-router-dom/Redirect';
import Cookies from 'universal-cookie';
import {
  Container, makeStyles, Typography, Grid,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TopBar, { BottomBar } from './Bar';
import { apiEndpoint } from './utils';

const useStyles = makeStyles(() => ({
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

const Search = () => {
  const cookies = new Cookies();
  const classes = useStyles();
  const [usernames, setUsernames] = useState([]);

  const getUsernames = () => {
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
          // eslint-disable-next-line no-console
          console.log(res);
          // window.location.href = '/';
        }
        console.log(res.data);
        setUsernames(res.data);
      });
  };

  useEffect(getUsernames, []);

  return (
    <div>
      <TopBar loginText="Logout" />
      <Container className="main-content" maxWidth="sm">

        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Typography className={classes.centered}>Search</Typography>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              options={usernames}
              getOptionLabel={(username) => username}
              renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
              onChange={(e, val) => { window.location.href = `/accounts/${val}`; }}
              // onChange={(e, val) => (<Redirect to={`/accounts/${val}`} />)}
            />
          </Grid>

        </Grid>
      </Container>
      <BottomBar />
    </div>
  );
};

export default Search;
