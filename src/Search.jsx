import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useSnackbar } from 'notistack';
import {
  Container, makeStyles, Typography, Grid,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TopBar, { BottomBar } from './Bar';
import { apiEndpoint, handleError } from './utils';

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

  const { enqueueSnackbar } = useSnackbar();
  const toast = (text, variant) => {
    enqueueSnackbar(text, {
      variant, autoHideDuration: 3000,
    });
  };

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
        const err = handleError(res.errors);
        if (err) { toast(err, 'error'); return; }

        setUsernames(res.data);
      });
  };

  useEffect(getUsernames, []);

  return (
    <div>
      <TopBar />
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
              onChange={(e, val) => { window.location.replace(`/accounts/${val}`); }}
            />
          </Grid>

        </Grid>
      </Container>
      <BottomBar defaultValue="search" />
    </div>
  );
};

export default Search;
